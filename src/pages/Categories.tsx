import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/toolsData';

interface CategoriesProps {
  navigate: (route: string, param?: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ navigate }) => {
  const categoryImages: Record<string, string> = {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    text: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    pdf: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    ai: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    developer: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    productivity: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#F4EDE4]">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Workspaces</span>
        <h1 className="text-4xl font-bold tracking-tight text-[#222222] font-heading">
          All Tool Categories
        </h1>
        <p className="text-[#666666] text-sm">
          Explore our specialized tool categories crafted for specific digital workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => navigate('category', cat.id)}
            className="bg-white rounded-3xl border border-[#E5D9CC] hover:border-[#F36B21] shadow-sm hover:shadow-xl transition-all cursor-pointer group overflow-hidden flex flex-col justify-between"
          >
            <div className="h-44 w-full overflow-hidden relative">
              <img 
                src={categoryImages[cat.id]} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <span className="text-xs font-bold bg-[#F36B21] px-3 py-1 rounded-full shadow-md">
                  {cat.toolCount} Tools
                </span>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#F36B21] transition-colors font-heading">
                  {cat.name}
                </h3>
                <p className="text-sm text-[#666666] mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5D9CC] flex items-center justify-between text-sm font-semibold text-[#F36B21]">
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
