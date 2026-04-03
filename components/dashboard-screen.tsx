'use client';

import { useState } from 'react';
import { BookOpen, Filter, Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

// Type definitions for filter items
type SubjectItem = {
  subject_id?: string | number;
  id?: string | number;
  subject_name?: string;
  name?: string;
  major_ids?: number[];
  [key: string]: any;
};

interface FilterContentProps {
  subjects: SubjectItem[];
  selectedSubject: number | null;
  onSelectSubject: (id: number | null) => void;
}

interface FilterSidebarProps extends FilterContentProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FilterContent = ({ subjects, selectedSubject, onSelectSubject }: FilterContentProps) => {
  // State quản lý thanh tìm kiếm môn học
  const [subjectQuery, setSubjectQuery] = useState('');

  // 1. Lọc trùng lặp dữ liệu (Deduplicate)
  const deduplicatedSubjects = Array.from(
    new Map(
      subjects.map(sub => {
        const subjectId = sub.subject_id || sub.id;
        return [subjectId, sub];
      })
    ).values()
  );

  // 2. Lọc theo từ khóa tìm kiếm (Local Search)
  const filteredSubjects = deduplicatedSubjects.filter(sub => {
    if (!subjectQuery.trim()) return true;
    const subjectName = (sub.subject_name || sub.name || '').toLowerCase();
    return subjectName.includes(subjectQuery.toLowerCase());
  });

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        {/* Filter Title */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Filter className="w-4 h-4 text-teal-600" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Bộ lọc</h2>
        </div>

        {/* SUBJECTS SECTION */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest">Môn học</h3>
          </div>

          {/* THANH TÌM KIẾM MÔN HỌC */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm tên môn học..."
              value={subjectQuery}
              onChange={(e) => setSubjectQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 md:py-2.5 border border-gray-200 rounded-xl md:rounded-2xl text-xs md:text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-white focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 pb-4">
            <button
              onClick={() => onSelectSubject(null)}
              className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center ${selectedSubject === null
                  ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                  : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              Tất cả môn học
            </button>

            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((sub: SubjectItem) => {
                const subjectId = sub.subject_id || sub.id;
                const subjectName = sub.subject_name || sub.name;

                if (!subjectId) return null;

                return (
                  <button
                    key={`subject-${subjectId}`}
                    onClick={() => onSelectSubject(subjectId as number)}
                    className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center ${selectedSubject === subjectId
                        ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                        : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    {subjectName}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-6 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-2">
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  Không tìm thấy môn học nào.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export function FilterSidebar({
  subjects,
  selectedSubject,
  onSelectSubject,
  isOpen = false,
  onOpenChange,
}: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-[68px] h-[calc(100vh-68px)] overflow-y-auto border-r border-gray-100 bg-white pr-2">
        <div className="p-6 h-full">
          <FilterContent
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSelectSubject={onSelectSubject}
          />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-full sm:w-3/4 max-w-xs md:hidden flex flex-col">
          <SheetHeader className="mb-4 flex-shrink-0">
            <SheetTitle className="text-gray-900">Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-hidden flex-1 h-full pr-1">
            <FilterContent
              subjects={subjects}
              selectedSubject={selectedSubject}
              onSelectSubject={onSelectSubject}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}