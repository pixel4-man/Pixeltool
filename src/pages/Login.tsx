import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface LoginProps {
  navigate: (route: string, param?: string) => void;
  setUser: (user: UserProfile) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const newUser: UserProfile = {
      name: email.split('@')[0] || 'User',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      plan: 'Free',
      favouriteToolIds: ['bg-remover', 'pdf-merger', 'qr-code-generator'],
      recentToolIds: ['word-counter', 'json-formatter', 'image-compressor'],
      usageCount: 14,
    };
    setUser(newUser);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    navigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 bg-[#F4EDE4]">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5D9CC] shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F36B21] text-white flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-[#222222]">Welcome Back</h2>
          <p className="text-sm text-[#666666]">Sign in to your PixelTools account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#666666]">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#666666]">Password</label>
              <span onClick={() => navigate('forgot')} className="text-xs text-[#F36B21] hover:underline cursor-pointer">Forgot?</span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#666666]">
          Don't have an account?{' '}
          <button onClick={() => navigate('signup')} className="text-[#F36B21] font-semibold hover:underline">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
