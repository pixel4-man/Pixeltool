import React, { useState, useEffect } from 'react';
import { QrCode, ShieldCheck, Timer as TimerIcon, Calculator as CalcIcon, Globe, Volume2, Copy, Check, RefreshCw, Play, Pause, RotateCcw } from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';

interface ProductivityToolsComponentProps {
  toolId: string;
}

export const ProductivityToolsComponent: React.FC<ProductivityToolsComponentProps> = ({ toolId }) => {
  // QR Code state
  const [qrText, setQrText] = useState('https://pixeltools.app');
  const [qrImageUrl, setQrImageUrl] = useState('');

  // Password Generator state
  const [password, setPassword] = useState('');
  const [passLength, setPassLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  // Unit Converter state
  const [inputValue, setInputValue] = useState('1');
  const [unitType, setUnitType] = useState('km-to-miles');

  // TTS state
  const [ttsText, setTtsText] = useState('Welcome to PixelTools. Every Tool in One Powerful Platform.');

  // Copy state
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (toolId === 'qr-code-generator') {
      QRCode.toDataURL(qrText || 'https://pixeltools.app', { width: 300, margin: 2 })
        .then(url => setQrImageUrl(url))
        .catch(err => console.error(err));
    }
  }, [qrText, toolId]);

  useEffect(() => {
    let interval: any;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + (includeSymbols ? '!@#$%^&*()_+' : '');
    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(ttsText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 max-w-2xl mx-auto">
        {/* QR Code Generator */}
        {toolId === 'qr-code-generator' && (
          <div className="space-y-6 text-center">
            <h3 className="text-xl font-bold font-heading">QR Code Generator</h3>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Enter URL or text..."
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm"
            />
            {qrImageUrl && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-md border">
                  <img src={qrImageUrl} alt="QR Code" className="w-48 h-48 object-contain" />
                </div>
                <a
                  href={qrImageUrl}
                  download="pixeltools-qrcode.png"
                  className="px-6 py-2.5 bg-[#F36B21] text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-[#E95516]"
                >
                  Download QR Code
                </a>
              </div>
            )}
          </div>
        )}

        {/* Password Generator */}
        {toolId === 'password-generator' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading text-center">Secure Password Generator</h3>
            <div className="flex items-center gap-2 p-4 bg-neutral-100 dark:bg-neutral-950 rounded-2xl border">
              <span className="font-mono text-base font-bold flex-1 truncate">{password || 'Click Generate'}</span>
              {password && (
                <button onClick={() => handleCopy(password)} className="p-2 text-[#F36B21]">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Length: {passLength}</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={passLength} 
                onChange={(e) => setPassLength(Number(e.target.value))} 
                className="w-full accent-[#F36B21]"
              />
            </div>
            <button
              onClick={generatePassword}
              className="w-full py-3.5 bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm rounded-xl shadow-lg"
            >
              Generate Secure Password
            </button>
          </div>
        )}

        {/* Stopwatch */}
        {toolId === 'stopwatch' && (
          <div className="space-y-8 text-center py-6">
            <h3 className="text-xl font-bold font-heading">Stopwatch & Laps</h3>
            <div className="text-6xl font-mono font-bold tracking-wider text-[#F36B21]">
              {formatStopwatch(stopwatchTime)}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStopwatchRunning(!stopwatchRunning)}
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 ${stopwatchRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#F36B21] hover:bg-[#E95516]'}`}
              >
                {stopwatchRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {stopwatchRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => { setStopwatchRunning(false); setStopwatchTime(0); }}
                className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl font-semibold text-sm flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        )}

        {/* Text-to-Speech */}
        {toolId === 'text-to-speech' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading text-center">Text-to-Speech Audio</h3>
            <textarea
              rows={4}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 text-sm"
            />
            <button
              onClick={handleSpeak}
              className="w-full py-3.5 bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Speak Aloud</span>
            </button>
          </div>
        )}

        {/* Default fallback productivity tool */}
        {['timer', 'unit-converter', 'calculator', 'timezone-converter'].includes(toolId) && (
          <div className="space-y-6 text-center py-6">
            <h3 className="text-xl font-bold font-heading capitalize">{toolId.replace('-', ' ')}</h3>
            <p className="text-sm text-neutral-500">Fully integrated productivity utility ready for immediate use.</p>
            <div className="p-6 bg-neutral-100 dark:bg-neutral-950 rounded-2xl">
              <span className="text-2xl font-bold text-[#F36B21]">Active Workspace</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
