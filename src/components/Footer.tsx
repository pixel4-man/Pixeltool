import React from 'react';
import { Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';

interface FooterProps {
  navigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#171717] text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F36B21] to-[#E95516] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight font-heading text-white">
                Pixel<span className="text-[#F36B21]">Tools</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              Every Tool. One Powerful Platform. Create, transform, and simplify your digital work with high-performance online tools.
            </p>
            <div className="text-xs text-neutral-500 pt-2">
              © {new Date().getFullYear()} PixelTools Inc. All rights reserved.
            </div>
          </div>

          {/* Explore Tools */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 font-heading">Explore Tools</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => navigate('explore')} className="hover:text-[#F36B21] transition-colors">
                  All 60+ Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('tool', 'bg-remover')} className="hover:text-[#F36B21] transition-colors">
                  Background Remover
                </button>
              </li>
              <li>
                <button onClick={() => navigate('tool', 'pdf-merger')} className="hover:text-[#F36B21] transition-colors">
                  PDF Merger
                </button>
              </li>
              <li>
                <button onClick={() => navigate('tool', 'ai-image-generator')} className="hover:text-[#F36B21] transition-colors">
                  AI Image Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('tool', 'qr-code-generator')} className="hover:text-[#F36B21] transition-colors">
                  QR Code Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 font-heading">Categories</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => navigate('category', cat.id)} className="hover:text-[#F36B21] transition-colors">
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 font-heading">Platform</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => navigate('pricing')} className="hover:text-[#F36B21] transition-colors">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#F36B21] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#F36B21] transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <span className="text-neutral-600 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-neutral-600 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-1">
            <span>Built with precision & speed on warm cream canvas.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F36B21] cursor-pointer" onClick={() => navigate('about')}>Privacy</span>
            <span className="hover:text-[#F36B21] cursor-pointer" onClick={() => navigate('about')}>Terms</span>
            <span className="hover:text-[#F36B21] cursor-pointer" onClick={() => navigate('contact')}>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
