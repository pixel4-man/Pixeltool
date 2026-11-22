import React from 'react';
import { UserProfile } from '../types';
import { TOOLS } from '../data/toolsData';
import { Heart, Clock, LogOut } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  navigate: (route: string, param?: string) => void;
  logout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, navigate, logout }) => {
  const favouriteTools = TOOLS.filter(t => user.favouriteToolIds.includes(t.id));
  const recentTools = TOOLS.filter(t => user.recentToolIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#F4EDE4]">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-3xl border border-[#E5D9CC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#F36B21]" />
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-heading text-[#222222]">{user.name}</h1>
              <span className="text-xs font-semibold bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] px-3 py-1 rounded-full">
                {user.plan} Plan
              </span>
            </div>
            <p className="text-sm text-[#666666]">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('pricing')}
            className="px-5 py-2.5 bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm rounded-xl shadow-lg"
          >
            Upgrade to Pro
          </button>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-[#FFF9F2] hover:bg-[#E5D9CC]/50 text-[#222222] border border-[#E5D9CC] font-semibold text-sm rounded-xl flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5D9CC] space-y-1 shadow-sm">
          <span className="text-xs text-[#666666] uppercase font-semibold">Total Tools Used</span>
          <p className="text-3xl font-bold text-[#F36B21] font-heading">{user.usageCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E5D9CC] space-y-1 shadow-sm">
          <span className="text-xs text-[#666666] uppercase font-semibold">Active Plan</span>
          <p className="text-3xl font-bold text-[#222222] font-heading">{user.plan}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E5D9CC] space-y-1 shadow-sm">
          <span className="text-xs text-[#666666] uppercase font-semibold">Security Status</span>
          <p className="text-3xl font-bold text-green-600 font-heading">Secure</p>
        </div>
      </div>

      {/* Favourite Tools */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#F36B21]" />
          <h2 className="text-xl font-bold font-heading text-[#222222]">Favourite Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {favouriteTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => navigate('tool', tool.id)}
              className="bg-white p-6 rounded-2xl border border-[#E5D9CC] hover:border-[#F36B21] cursor-pointer group space-y-3 shadow-sm"
            >
              <h3 className="font-bold text-base text-[#222222] group-hover:text-[#F36B21] transition-colors">{tool.name}</h3>
              <p className="text-xs text-[#666666] line-clamp-2">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Used Tools */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#F36B21]" />
          <h2 className="text-xl font-bold font-heading text-[#222222]">Recently Used Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => navigate('tool', tool.id)}
              className="bg-white p-6 rounded-2xl border border-[#E5D9CC] hover:border-[#F36B21] cursor-pointer group space-y-3 shadow-sm"
            >
              <h3 className="font-bold text-base text-[#222222] group-hover:text-[#F36B21] transition-colors">{tool.name}</h3>
              <p className="text-xs text-[#666666] line-clamp-2">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
