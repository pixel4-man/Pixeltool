import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Helper to handle background removal logic with env bindings
async function handleBgRemove(reqBody: any, envBindings: { REMOVE_BG_API_KEY?: string; BRIA_API_TOKEN?: string }) {
  const { image, provider = 'remove.bg' } = reqBody;
  if (!image) {
    throw new Error('No image provided.');
  }

  const removeBgKey = envBindings.REMOVE_BG_API_KEY || process.env.REMOVE_BG_API_KEY;
  const briaToken = envBindings.BRIA_API_TOKEN || process.env.BRIA_API_TOKEN;

  const removeBgConfigured = Boolean(removeBgKey && removeBgKey !== 'MY_REMOVE_BG_KEY' && removeBgKey.trim().length > 0);
  const briaConfigured = Boolean(briaToken && briaToken !== 'MY_BRIA_TOKEN' && briaToken.trim().length > 0);

  let processedResult: string | null = null;
  let activeProvider = provider;
  let errorLog: string[] = [];

  const base64Data = image.replace(/^data:image\/[a-z]+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // 1. Try remove.bg API
  if ((provider === 'remove.bg' || provider === 'auto') && removeBgConfigured) {
    try {
      const formData = new FormData();
      const blob = new Blob([buffer], { type: 'image/png' });
      formData.append('image_file', blob, 'image.png');
      formData.append('size', 'auto');

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': removeBgKey!,
        },
        body: formData,
      });

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const resultBase64 = Buffer.from(arrayBuffer).toString('base64');
        processedResult = `data:image/png;base64,${resultBase64}`;
        activeProvider = 'remove.bg';
      } else {
        const errText = await response.text();
        errorLog.push(`remove.bg API error (${response.status}): ${errText}`);
      }
    } catch (err: any) {
      errorLog.push(`remove.bg exception: ${err.message}`);
    }
  }

  // 2. Try BRIA RMBG 3.0 API
  if (!processedResult && (provider === 'bria' || provider === 'auto' || errorLog.length > 0) && briaConfigured) {
    try {
      const response = await fetch('https://engine.prod.bria-api.com/v1/background/remove', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${briaToken!}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_base64: base64Data,
          file_name: 'image.png'
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.result_url) {
          const imgRes = await fetch(json.result_url);
          const imgBuf = await imgRes.arrayBuffer();
          processedResult = `data:image/png;base64,${Buffer.from(imgBuf).toString('base64')}`;
          activeProvider = 'bria';
        } else if (json.image_base64) {
          processedResult = `data:image/png;base64,${json.image_base64}`;
          activeProvider = 'bria';
        }
      } else {
        const errText = await response.text();
        errorLog.push(`BRIA API error (${response.status}): ${errText}`);
      }
    } catch (err: any) {
      errorLog.push(`BRIA exception: ${err.message}`);
    }
  }

  if (!processedResult && (removeBgConfigured || briaConfigured)) {
    throw new Error(`Background removal failed across configured providers. Diagnostics: ${errorLog.join(' | ')}`);
  }

  if (!processedResult) {
    throw new Error('Background removal API keys are not configured in Cloudflare environment bindings (REMOVE_BG_API_KEY and BRIA_API_TOKEN).');
  }

  return {
    success: true,
    provider: activeProvider,
    result: processedResult,
    message: `Successfully processed background removal using ${activeProvider}`
  };
}

// Express App setup for development
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/api/bg-remove/diagnostics', (req: any, res: any) => {
  const envBindings = req.cloudflareEnv || process.env;
  const removeBgKey = envBindings.REMOVE_BG_API_KEY;
  const briaToken = envBindings.BRIA_API_TOKEN;

  const removeBgConfigured = Boolean(removeBgKey && removeBgKey !== 'MY_REMOVE_BG_KEY' && removeBgKey.trim().length > 0);
  const briaConfigured = Boolean(briaToken && briaToken !== 'MY_BRIA_TOKEN' && briaToken.trim().length > 0);

  return res.json({
    removeBgConfigured,
    briaConfigured,
    status: removeBgConfigured || briaConfigured ? 'API Providers Configured' : 'API Keys Missing'
  });
});

app.post('/api/bg-remove', async (req: any, res: any) => {
  try {
    const envBindings = req.cloudflareEnv || process.env;
    const result = await handleBgRemove(req.body, envBindings);
    return res.json(result);
  } catch (err: any) {
    console.error('Background removal error:', err);
    res.status(500).json({ error: err.message || 'Background removal failed' });
  }
});

// Cloudflare Worker export for production deployment
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/bg-remove/diagnostics' && request.method === 'GET') {
      const removeBgKey = env?.REMOVE_BG_API_KEY;
      const briaToken = env?.BRIA_API_TOKEN;
      const removeBgConfigured = Boolean(removeBgKey && removeBgKey !== 'MY_REMOVE_BG_KEY' && removeBgKey.trim().length > 0);
      const briaConfigured = Boolean(briaToken && briaToken !== 'MY_BRIA_TOKEN' && briaToken.trim().length > 0);

      return new Response(JSON.stringify({
        removeBgConfigured,
        briaConfigured,
        status: removeBgConfigured || briaConfigured ? 'API Providers Configured' : 'API Keys Missing'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/api/bg-remove' && request.method === 'POST') {
      try {
        const body = await request.json();
        const result = await handleBgRemove(body, env || {});
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('PixelTools Cloudflare Worker Active', { status: 200 });
  }
};

// Local development server startup
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' && !(globalThis as any).WebSocketPair) {
  const PORT = Number(process.env.PORT) || 3000;
  createViteServer({ server: { middlewareMode: true }, appType: 'spa' }).then(async (vite) => {
    app.use(vite.middlewares);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`PixelTools local dev server running on http://0.0.0.0:${PORT}`);
    });
  });
}
