import React from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#F4EDE4]">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Our Mission</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#222222] font-heading">
          Every Tool. One Powerful Platform.
        </h1>
        <p className="text-[#666666] text-base leading-relaxed">
          PixelTools was created with a single vision: to provide a lightning-fast, secure, and beautifully designed online toolkit where anyone can edit images, work with text, manage PDFs, leverage AI models, and complete everyday digital tasks without hassle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E5D9CC] space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#222222]">Lightning Fast</h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            Optimized for immediate browser-side execution with zero unnecessary server delays.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E5D9CC] space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#222222]">Privacy First</h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            Your files remain on your device. We respect your data confidentiality above all.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E5D9CC] space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#222222]">AI Empowered</h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            Integrated with state-of-the-art Google Gemini models for advanced text and media generation.
          </p>
        </div>
      </div>
    </div>
  );
};
