import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface SignupProps {
  navigate: (route: string, param?: string) => void;
  setUser: (user: UserProfile) => void;
}

export const Signup: React.FC<SignupProps> = ({ navigate, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const newUser: UserProfile = {
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      plan: 'Free',
      favouriteToolIds: ['bg-remover', 'pdf-merger'],
      recentToolIds: ['word-counter', 'json-formatter'],
      usageCount: 1,
    };
    setUser(newUser);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
    navigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 bg-[#F4EDE4]">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5D9CC] shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F36B21] text-white flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-[#222222]">Create Account</h2>
          <p className="text-sm text-[#666666]">Get started with PixelTools for free</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#666666]">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
            />
          </div>

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
            <label className="text-xs font-semibold text-[#666666]">Password</label>
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
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#666666]">
          Already have an account?{' '}
          <button onClick={() => navigate('login')} className="text-[#F36B21] font-semibold hover:underline">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
