import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string, param?: string) => void;
  user: UserProfile | null;
  openSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  user,
  openSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#E5D9CC] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNav('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F36B21] to-[#E95516] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight font-heading text-[#222222]">
            Pixel<span className="text-[#F36B21]">Tools</span>
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => handleNav('home')} 
            className={`hover:text-[#F36B21] transition-colors ${currentRoute === 'home' ? 'text-[#F36B21] font-semibold' : 'text-[#222222]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('explore')} 
            className={`hover:text-[#F36B21] transition-colors ${currentRoute === 'explore' ? 'text-[#F36B21] font-semibold' : 'text-[#222222]'}`}
          >
            Explore Tools
          </button>
          <button 
            onClick={() => handleNav('categories')} 
            className={`hover:text-[#F36B21] transition-colors ${currentRoute === 'categories' ? 'text-[#F36B21] font-semibold' : 'text-[#222222]'}`}
          >
            Categories
          </button>
          <button 
            onClick={() => handleNav('pricing')} 
            className={`hover:text-[#F36B21] transition-colors ${currentRoute === 'pricing' ? 'text-[#F36B21] font-semibold' : 'text-[#222222]'}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`hover:text-[#F36B21] transition-colors ${currentRoute === 'about' ? 'text-[#F36B21] font-semibold' : 'text-[#222222]'}`}
          >
            About
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={openSearch}
            aria-label="Search tools"
            className="p-2.5 rounded-full bg-[#F4EDE4] text-[#666666] hover:text-[#222222] hover:bg-[#E5D9CC]/50 transition-colors flex items-center gap-2 px-4 text-xs font-medium border border-[#E5D9CC]"
          >
            <Search className="w-4 h-4 text-[#F36B21]" />
            <span>Search tools...</span>
            <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] text-[#666666] border border-[#E5D9CC]">⌘K</kbd>
          </button>

          {user ? (
            <button
              onClick={() => handleNav('dashboard')}
              className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white hover:bg-[#F4EDE4] border border-[#E5D9CC] text-sm font-medium"
            >
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-[#F36B21]" />
              <span className="max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="text-sm font-medium text-[#222222] hover:text-[#F36B21] px-3 py-2"
            >
              Login
            </button>
          )}

          <button
            onClick={() => handleNav(user ? 'dashboard' : 'signup')}
            className="bg-[#F36B21] hover:bg-[#E95516] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#F36B21]/20 flex items-center gap-2 active:scale-95 transition-all"
          >
            <span>{user ? 'Dashboard' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={openSearch}
            aria-label="Search tools"
            className="p-2 rounded-lg bg-white border border-[#E5D9CC] text-[#222222]"
          >
            <Search className="w-5 h-5 text-[#F36B21]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-lg bg-white border border-[#E5D9CC] text-[#222222]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-out drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F2] border-b border-[#E5D9CC] px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <button 
              onClick={() => handleNav('home')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('explore')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              Explore Tools
            </button>
            <button 
              onClick={() => handleNav('categories')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              Categories
            </button>
            <button 
              onClick={() => handleNav('pricing')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNav('about')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              About
            </button>
            <button 
              onClick={() => handleNav('contact')} 
              className="text-left py-2 text-[#222222] hover:text-[#F36B21]"
            >
              Contact
            </button>
          </nav>
          <div className="pt-4 border-t border-[#E5D9CC] flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full py-3 bg-white border border-[#E5D9CC] rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#F36B21]" />
                <span>My Dashboard</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="flex-1 py-3 bg-white border border-[#E5D9CC] rounded-xl font-medium text-center text-[#222222]"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="flex-1 py-3 bg-[#F36B21] rounded-xl font-medium text-center text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
