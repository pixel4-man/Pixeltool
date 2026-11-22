import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  navigate: (route: string, param?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#F4EDE4]">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Flexible Plans</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#222222] font-heading">
          Simple, Transparent Pricing
        </h1>
        <p className="text-[#666666] text-base">
          Start for free with access to all core tools, or upgrade to Pro for advanced AI capabilities and batch processing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5D9CC] shadow-sm space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#666666] uppercase">Starter</span>
              <h3 className="text-2xl font-bold text-[#222222] font-heading mt-1">Free Plan</h3>
              <p className="text-sm text-[#666666] mt-2">Perfect for everyday personal tasks and quick conversions.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-heading text-[#222222]">$0</span>
              <span className="text-sm text-[#666666]">/ forever</span>
            </div>
            <ul className="space-y-3 text-sm text-[#666666]">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Access to all 60+ core tools</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Secure browser-local processing</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Standard processing speed</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Community support</li>
            </ul>
          </div>
          <button
            onClick={() => navigate('signup')}
            className="w-full py-3.5 rounded-xl bg-[#FFF9F2] hover:bg-[#E5D9CC]/50 text-[#222222] font-semibold text-sm border border-[#E5D9CC]"
          >
            Get Started Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-8 sm:p-10 rounded-3xl border border-[#F36B21]/50 shadow-2xl space-y-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#F36B21] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase">
            Most Popular
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#F36B21] uppercase">Professional</span>
              <h3 className="text-2xl font-bold font-heading mt-1 text-white">Pro Plan</h3>
              <p className="text-sm text-neutral-400 mt-2">Designed for power users, creators, and developers.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-heading text-white">$12</span>
              <span className="text-sm text-neutral-400">/ month</span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Everything in Free Plan</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Unlimited AI tool generation</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Batch file processing</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> Priority cloud rendering</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#F36B21]" /> 24/7 Priority support</li>
            </ul>
          </div>
          <button
            onClick={() => navigate('signup')}
            className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/30 flex items-center justify-center gap-2"
          >
            <span>Upgrade to Pro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
