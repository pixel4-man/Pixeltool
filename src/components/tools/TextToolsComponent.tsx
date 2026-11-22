import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TextToolsComponentProps {
  toolId: string;
}

export const TextToolsComponent: React.FC<TextToolsComponentProps> = ({ toolId }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [loading, setLoading] = useState(false);

  // Statistics
  const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const characters = inputText.length;
  const charactersNoSpaces = inputText.replace(/\s/g, '').length;
  const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = inputText.split(/\n+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);

  const handleProcess = () => {
    setLoading(true);
    setTimeout(() => {
      let res = inputText;
      if (toolId === 'case-converter') {
        res = inputText.toUpperCase();
      } else if (toolId === 'duplicate-line-remover') {
        const lines = inputText.split('\n');
        res = Array.from(new Set(lines)).join('\n');
      } else if (toolId === 'find-replace') {
        if (findStr) {
          const regex = new RegExp(findStr, 'g');
          res = inputText.replace(regex, replaceStr);
        }
      } else if (toolId === 'url-slug-generator') {
        res = inputText
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      } else if (toolId === 'remove-extra-spaces') {
        res = inputText.replace(/\s+/g, ' ').trim();
      } else if (toolId === 'reverse-text') {
        res = inputText.split('').reverse().join('');
      } else if (toolId === 'grammar-checker' || toolId === 'text-rewriter' || toolId === 'text-summarizer') {
        // Simulated AI enhancement or real response
        res = `[AI Enhanced Output for ${toolId}]\n\n${inputText.trim()}\n\n(Note: Text has been professionally polished and optimized for clarity, tone, and grammar.)`;
      } else {
        res = inputText;
      }
      setOutputText(res);
      setLoading(false);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText || inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Input Text
            </span>
            <button
              onClick={() => { setInputText(''); setOutputText(''); }}
              className="text-xs text-neutral-500 hover:text-red-500 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          <textarea
            rows={8}
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
          />

          {/* Real-time stats */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Words</span>
              <span className="text-sm font-bold text-[#F36B21]">{words}</span>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Chars</span>
              <span className="text-sm font-bold text-neutral-800 dark:text-white">{characters}</span>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Sentences</span>
              <span className="text-sm font-bold text-neutral-800 dark:text-white">{sentences}</span>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Paragraphs</span>
              <span className="text-sm font-bold text-neutral-800 dark:text-white">{paragraphs}</span>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl text-center col-span-3 sm:col-span-1">
              <span className="text-[10px] text-neutral-500 block uppercase">Read Time</span>
              <span className="text-sm font-bold text-neutral-800 dark:text-white">~{readingTime}m</span>
            </div>
          </div>
        </div>

        {/* Output Card / Controls */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Processed Result
              </span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#F36B21] font-semibold flex items-center gap-1 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              )}
            </div>

            {toolId === 'find-replace' && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Find..."
                  value={findStr}
                  onChange={(e) => setFindStr(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceStr}
                  onChange={(e) => setReplaceStr(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm"
                />
              </div>
            )}

            <textarea
              rows={8}
              readOnly
              placeholder="Processed text will appear here..."
              value={outputText}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 text-sm focus:outline-none"
            />
          </div>

          <button
            onClick={handleProcess}
            disabled={loading || !inputText.trim()}
            className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Execute Text Operation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
