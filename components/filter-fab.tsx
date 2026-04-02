'use client';

import { Filter } from 'lucide-react';
import { ReactNode } from 'react';

interface FilterFABProps {
  onClick: () => void;
  isOpen?: boolean;
}

export function FilterFAB({ onClick, isOpen = false }: FilterFABProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-teal-600/30 transition-all z-30"
      title="Open filters"
      aria-label="Open filters"
    >
      <Filter className="w-6 h-6" />
    </button>
  );
}
