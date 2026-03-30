'use client';

import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type ViewState =
  | 'explore'
  | 'reading'
  | 'community'
  | 'upload'
  | 'contact'
  | 'profile';

interface NavLink {
  name: string;
  view: ViewState;
}

const navLinks: NavLink[] = [
  { name: 'Explore', view: 'explore' },
  { name: 'Community', view: 'community' },
  { name: 'Upload', view: 'upload' },
  { name: 'Contact Us', view: 'contact' },
];

interface TopNavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function TopNavigation({ currentView, onNavigate }: TopNavigationProps) {
  // Check if current view matches the nav link (reading view should highlight Explore)
  const isActive = (view: ViewState) => {
    if (view === 'explore' && currentView === 'reading') return true;
    return view === currentView;
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      {/* Logo */}
      <button
        onClick={() => onNavigate('explore')}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>
      </button>

      {/* Center Navigation */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => onNavigate(link.view)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              isActive(link.view)
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Animated Gradient Border Search */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-full opacity-75 blur-sm group-hover:opacity-100 animate-gradient-border" />
          <div className="relative flex items-center gap-2 bg-white px-4 py-2 rounded-full">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm outline-none w-24 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Avatar */}
        <button
          onClick={() => onNavigate('profile')}
          className="hover:ring-4 hover:ring-purple-100 rounded-full transition-all"
        >
          <Avatar className="w-9 h-9 ring-2 ring-gray-100">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
