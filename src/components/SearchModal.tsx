import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Folder } from 'lucide-react';
import { TOOLS } from '../data/toolsData';
import { ToolItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string, param?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, navigate }) => {
  const [query, setQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<ToolItem[]>(TOOLS.slice(0, 8));

  useEffect(() => {
    if (!query.trim()) {
      setFilteredTools(TOOLS.slice(0, 8));
    } else {
      const q = query.toLowerCase();
      const results = TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
      setFilteredTools(results);
    }
  }, [query]);

  if (!isOpen) return null;

  const handleSelectTool = (toolId: string) => {
    onClose();
    navigate('tool', toolId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div 
        className="bg-[#171717] text-white w-full max-w-2xl rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-6 py-4 border-b border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-[#F36B21]" />
          <input
            type="text"
            placeholder="Search for any tool (e.g. background remover, PDF merger, QR code)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 py-1 font-heading">
            {query.trim() ? `Matching Tools (${filteredTools.length})` : 'Popular Quick Tools'}
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <Sparkles className="w-8 h-8 text-[#F36B21] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-medium">No tools found matching "{query}"</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for image, text, PDF, or developer utilities.</p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleSelectTool(tool.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 hover:bg-[#F36B21]/10 border border-neutral-800 hover:border-[#F36B21]/50 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-[#F36B21] group-hover:bg-[#F36B21] group-hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-[#F36B21]">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-1">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-700">
                    {tool.categoryName}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#F36B21] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-900/80 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Press ESC to close</span>
          <span className="text-[#F36B21] font-medium">PixelTools Search Engine</span>
        </div>
      </div>
    </div>
  );
};
