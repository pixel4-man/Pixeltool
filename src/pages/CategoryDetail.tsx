import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES, TOOLS } from '../data/toolsData';
import { CategoryId } from '../types';

interface CategoryDetailProps {
  categoryId: CategoryId;
  navigate: (route: string, param?: string) => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({ categoryId, navigate }) => {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const categoryTools = TOOLS.filter(t => t.categoryId === categoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#F4EDE4]">
      <button
        onClick={() => navigate('categories')}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#F36B21] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </button>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">{category.toolCount} Available Tools</span>
        <h1 className="text-4xl font-bold tracking-tight text-[#222222] font-heading">
          {category.name}
        </h1>
        <p className="text-[#666666] text-base max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => navigate('tool', tool.id)}
            className="bg-white p-6 rounded-3xl border border-[#E5D9CC] hover:border-[#F36B21] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center group-hover:bg-[#F36B21] group-hover:text-white transition-all">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#F36B21] transition-colors font-heading">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#666666] mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#F36B21]">
              <span>Open Tool</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
