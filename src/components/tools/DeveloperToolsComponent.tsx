import React, { useState } from 'react';
import { Code, Copy, Check, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeveloperToolsComponentProps {
  toolId: string;
}

export const DeveloperToolsComponent: React.FC<DeveloperToolsComponentProps> = ({ toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    setError('');
    setOutput('');
    try {
      if (toolId === 'json-formatter' || toolId === 'json-validator') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (toolId === 'base64-encoder') {
        setOutput(btoa(input));
      } else if (toolId === 'base64-decoder') {
        setOutput(atob(input));
      } else if (toolId === 'url-encoder') {
        setOutput(encodeURIComponent(input));
      } else if (toolId === 'url-decoder') {
        setOutput(decodeURIComponent(input));
      } else if (toolId === 'uuid-generator') {
        const uuids = Array.from({ length: 5 }, () => crypto.randomUUID()).join('\n');
        setOutput(uuids);
      } else {
        // Generic beautify fallback
        setOutput(input.trim());
      }
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    } catch (err: any) {
      setError(`Execution error: ${err.message || 'Invalid syntax'}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Input Payload
            </span>
            <button
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="text-xs text-neutral-500 hover:text-red-500"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={10}
            placeholder={toolId === 'uuid-generator' ? 'Click process to generate UUIDs...' : 'Enter data here...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Formatted Output
              </span>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#F36B21] font-semibold flex items-center gap-1 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              rows={10}
              readOnly
              placeholder="Output will appear here..."
              value={output}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 font-mono text-xs focus:outline-none"
            />
          </div>

          <button
            onClick={handleProcess}
            className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Process & Format</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2 font-mono">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
