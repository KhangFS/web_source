'use client';

import { Search, User, Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function TopNavigation({ currentView, onNavigate, searchQuery, onSearchChange, showSearch }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Tài liệu' },
    { id: 'progress', label: 'Tiến trình' },
    { id: 'community', label: 'Cộng đồng' },
    { id: 'upload', label: 'Đăng tài liệu' },
    { id: 'contact', label: 'Liên hệ' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="w-full px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-base md:text-xl text-teal-600 flex-shrink-0">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">U</span>
            </div>
            <span className="hidden sm:inline">Learning Hub & Tracker</span>
          </div>

          {/* Desktop Navigation Menu - Only visible on md+ */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-semibold text-sm transition-colors min-h-[44px] flex items-center px-2 ${currentView === item.id || (currentView === 'reading' && item.id === 'explore')
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section: Search & Profile */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {showSearch && (
              <div className="hidden sm:block relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg md:rounded-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all w-40 md:w-56 lg:w-64"
                />
              </div>
            )}

            {/* Profile Button - 44x44px minimum touch target */}
            <button
              onClick={() => handleNavClick('profile')}
              className="w-10 h-10 md:w-11 md:h-11 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-200 active:scale-95 transition-all flex-shrink-0"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Menu - Only visible on small screens */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:scale-95 rounded-lg transition-all flex-shrink-0"
                  title="Navigation menu"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </SheetTrigger>

              {/* Mobile Navigation Drawer */}
              <SheetContent side="left" className="w-full sm:w-3/4 max-w-xs">
                <SheetHeader className="mb-6">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Items */}
                <div className="flex flex-col gap-1">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-colors min-h-[44px] flex items-center ${currentView === item.id || (currentView === 'reading' && item.id === 'explore')
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Search - Inside drawer */}
                {showSearch && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search documents..."
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
