'use client';

import { Search, User } from 'lucide-react';

export function TopNavigation({ currentView, onNavigate, searchQuery, onSearchChange, showSearch }: any) {
  
  // ĐÃ THÊM: Object 'progress' vào mảng định tuyến ở vị trí thứ 2
  const navItems = [
    { id: 'explore', label: 'Tài liệu' },
    { id: 'progress', label: 'Tiến trình' }, // <-- NÚT TIẾN TRÌNH Ở ĐÂY NÀY!
    { id: 'community', label: 'Cộng đồng' },                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    { id: 'upload', label: 'Đăng tài liệu' },
    { id: 'contact', label: 'Liên hệ' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-teal-600">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white">K</span>
          </div>
          Knowledge Hub
        </div>

        {/* Menu Tabs */}
        <div className="flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-semibold transition-colors ${
                currentView === item.id || (currentView === 'reading' && item.id === 'explore')
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search & Profile */}
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search documents..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all w-64"
              />
            </div>
          )}
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}