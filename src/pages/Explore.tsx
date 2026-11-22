import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TOOLS, CATEGORIES } from '../data/toolsData';
import { CategoryId, ToolItem } from '../types';

interface ExploreProps {
  initialSearch?: string;
  navigate: (route: string, param?: string) => void;
}

export const Explore: React.FC<ExploreProps> = ({ initialSearch = '', navigate }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [filteredTools, setFilteredTools] = useState<ToolItem[]>(TOOLS);

  useEffect(() => {
    let result = TOOLS;
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.categoryId === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    setFilteredTools(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#F4EDE4]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Complete Toolkit</span>
        <h1 className="text-4xl font-bold tracking-tight text-[#222222] font-heading">
          Explore All Tools
        </h1>
        <p className="text-[#666666] text-sm">
          Browse all 59+ professional online tools across images, text, PDFs, AI, developers, and productivity.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#E5D9CC] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tools by name, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl pl-12 pr-4 py-2.5 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedCategory === 'all' ? 'bg-[#F36B21] text-white' : 'bg-[#FFF9F2] text-[#666666] border border-[#E5D9CC] hover:bg-[#E5D9CC]/30'}`}
          >
            All Tools ({TOOLS.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedCategory === cat.id ? 'bg-[#F36B21] text-white' : 'bg-[#FFF9F2] text-[#666666] border border-[#E5D9CC] hover:bg-[#E5D9CC]/30'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-20 text-center text-[#666666]">
          <Sparkles className="w-12 h-12 text-[#F36B21] mx-auto mb-3 opacity-60" />
          <p className="text-base font-bold text-[#222222]">No tools found matching your query</p>
          <p className="text-xs text-[#666666] mt-1">Try resetting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => navigate('tool', tool.id)}
              className="bg-white p-6 rounded-3xl border border-[#E5D9CC] hover:border-[#F36B21] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center group-hover:bg-[#F36B21] group-hover:text-white transition-all">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold bg-[#FFF9F2] text-[#666666] border border-[#E5D9CC] px-2.5 py-1 rounded-full">
                    {tool.categoryName}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#F36B21] transition-colors font-heading">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#F36B21]">
                <span>Open Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
