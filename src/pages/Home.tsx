import React, { useState } from 'react';
import { Sparkles, ArrowRight, Search, CheckCircle, ShieldCheck, Zap, Smartphone, Layers, Scissors, FilePlus, RefreshCw, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES, TOOLS } from '../data/toolsData';

interface HomeProps {
  navigate: (route: string, param?: string) => void;
  openSearch: () => void;
}

export const Home: React.FC<HomeProps> = ({ navigate, openSearch }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate('explore', heroSearch);
    }
  };

  const popularTools = TOOLS.filter(t => t.popular).slice(0, 8);

  // Category specific illustrations or mock images
  const categoryImages: Record<string, string> = {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    text: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    pdf: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    ai: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    developer: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    productivity: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  };

  return (
    <div className="space-y-24 pb-24 bg-[#F4EDE4]">
      {/* Section 1: Hero */}
      <section className="relative overflow-hidden bg-[#F4EDE4] pt-16 pb-24 border-b border-[#E5D9CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] text-xs font-semibold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Online Tools Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#222222] font-heading leading-[1.1]">
              Create. Edit. <span className="text-[#F36B21]">Convert.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#666666] max-w-2xl leading-relaxed">
              Everything you need to create, transform and simplify your digital work. Powerful online tools, all in one lightning-fast platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate('explore')}
                className="px-8 py-4 rounded-2xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-base shadow-xl shadow-[#F36B21]/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore All Tools</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('signup')}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-[#FFF9F2] text-[#222222] font-semibold text-base border border-[#E5D9CC] flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Get Started Free</span>
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-[#E5D9CC] text-sm text-[#666666]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F36B21]" />
                <span>60+ Professional Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F36B21]" />
                <span>100% Secure Browser Processing</span>
              </div>
            </div>
          </motion.div>

          {/* Right Tech 3D Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-[#FFF9F2] to-white p-8 shadow-2xl border border-[#E5D9CC] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F36B21]/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs font-mono text-[#666666]">pixeltools.engine</span>
              </div>

              <div className="space-y-4 z-10 my-auto">
                <div className="p-4 bg-white/90 rounded-2xl border border-[#E5D9CC] backdrop-blur shadow-sm flex items-center justify-between transform hover:scale-102 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F36B21] flex items-center justify-center text-white font-bold shadow-md">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#222222]">Background Remover</h4>
                      <p className="text-xs text-[#666666]">AI Edge Detection • Instant</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#F36B21]/15 text-[#F36B21] px-2.5 py-1 rounded-full font-semibold">Ready</span>
                </div>

                <div className="p-4 bg-white/90 rounded-2xl border border-[#E5D9CC] backdrop-blur shadow-sm flex items-center justify-between transform hover:scale-102 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF9F2] border border-[#E5D9CC] flex items-center justify-center text-[#F36B21] font-bold">
                      <FilePlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#222222]">PDF Merger & Splitter</h4>
                      <p className="text-xs text-[#666666]">Secure Client-Side Join</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/15 text-green-700 px-2.5 py-1 rounded-full font-semibold">Active</span>
                </div>
              </div>

              <div className="z-10 flex items-center justify-between pt-4 border-t border-[#E5D9CC] text-xs text-[#666666]">
                <span>⚡ High Performance</span>
                <span className="text-[#F36B21] font-semibold">v3.5 Warm Cream</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Search Tools Bar */}
      <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSearchSubmit}
          className="bg-white p-4 rounded-2xl shadow-xl border border-[#E5D9CC] flex items-center gap-3"
        >
          <Search className="w-6 h-6 text-[#F36B21] ml-2" />
          <input
            type="text"
            placeholder="Search for any tool (e.g. background remover, JSON formatter, PDF merger)..."
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
            className="w-full bg-transparent text-[#222222] placeholder-[#666666] text-base focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shrink-0 shadow-md shadow-[#F36B21]/20"
          >
            Search Tool
          </button>
        </motion.form>
      </section>

      {/* Section 3: Popular Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Most Demanded</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#222222] font-heading mt-1">
              Popular Tools
            </h2>
          </div>
          <button 
            onClick={() => navigate('explore')}
            className="text-sm font-semibold text-[#F36B21] hover:underline flex items-center gap-1"
          >
            View All 60+ Tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate('tool', tool.id)}
              className="bg-white p-6 rounded-3xl border border-[#E5D9CC] hover:border-[#F36B21] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] text-[#F36B21] border border-[#E5D9CC] flex items-center justify-center group-hover:bg-[#F36B21] group-hover:text-white group-hover:border-[#F36B21] transition-all">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#666666]">{tool.categoryName}</span>
                  <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#F36B21] transition-colors font-heading mt-0.5">
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
      </section>

      {/* Section 4: Explore Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Organized Workspaces</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] font-heading mt-1">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
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
      </section>

      {/* Section 5: Why PixelTools? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-[#FFF9F2] py-20 rounded-3xl border border-[#E5D9CC] shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Unmatched Advantages</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] font-heading">
            Why Choose PixelTools?
          </h2>
          <p className="text-sm text-[#666666]">
            Engineered for speed, privacy, and flawless usability across all devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Easy to Use', desc: 'Intuitive drag-and-drop interfaces designed for beginners and pros alike.', icon: Sparkles },
            { title: 'Fast Processing', desc: 'Lightning-fast local browser execution powered by modern WebAssembly and Canvas.', icon: Zap },
            { title: 'Secure File Handling', desc: 'Your private files never leave your device unless specified for AI processing.', icon: ShieldCheck },
            { title: 'Multiple Tools in One', desc: 'Over 60+ essential utilities spanning images, text, PDFs, and developers.', icon: Layers },
            { title: 'Mobile Friendly', desc: 'Fully responsive layouts optimized for smartphones, tablets, and desktops.', icon: Smartphone },
            { title: 'Simple User Experience', desc: 'Clean, distraction-free workspaces without annoying ads or clutter.', icon: CheckCircle },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-[#E5D9CC] space-y-4 shadow-sm hover:border-[#F36B21]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#222222] font-heading">{item.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Simple 3-Step Process</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] font-heading">
            How PixelTools Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose a Tool', desc: 'Browse our extensive catalog and pick the exact utility you need.' },
            { step: '02', title: 'Upload or Enter Information', desc: 'Drop your files or paste your text securely into the workspace.' },
            { step: '03', title: 'Get Your Result', desc: 'Process instantly and download your pristine results in one click.' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-[#E5D9CC] space-y-4 relative shadow-sm"
            >
              <span className="text-4xl font-bold text-[#F36B21]/30 font-heading block">{item.step}</span>
              <h3 className="text-xl font-bold text-[#222222] font-heading">{item.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#171717] to-black text-white p-12 sm:p-16 rounded-3xl border border-neutral-800 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F36B21]/20 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            Everything You Need. One Platform.
          </h2>
          <p className="text-neutral-300 max-w-xl mx-auto text-base">
            Make your daily digital tasks easier with PixelTools. Fast, secure, and always accessible on warm cream.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('explore')}
              className="px-8 py-4 rounded-2xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-base shadow-xl shadow-[#F36B21]/30 inline-flex items-center gap-3 transform hover:scale-105 transition-transform"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
