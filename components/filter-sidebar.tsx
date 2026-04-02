'use client';

import { LayoutGrid, BookOpen, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface FilterSidebarProps {
  majors: any[];
  subjects: any[];
  selectedMajor: number | null;
  onSelectMajor: (id: number | null) => void;
  selectedSubject: number | null;
  onSelectSubject: (id: number | null) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FilterContent = ({ majors, subjects, selectedMajor, onSelectMajor, selectedSubject, onSelectSubject }: any) => (
  <>
    <div className="space-y-6 md:space-y-8">
      {/* Filter Title */}
      <div className="hidden lg:flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <Filter className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900">Bộ lọc</h2>
      </div>

      {/* MAJORS SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <LayoutGrid className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest">Ngành học</h3>
        </div>
        
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
          <button
            onClick={() => onSelectMajor(null)}
            className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center whitespace-nowrap ${
              selectedMajor === null
                ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Tất cả ngành
          </button>
          
          {majors.map((major) => {
            const majorId = major.id || major.major_id;
            const majorName = major.name || major.major_name;

            return (
              <button
                key={`major-${majorId}`}
                onClick={() => onSelectMajor(majorId)}
                className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center whitespace-nowrap ${
                  selectedMajor === majorId
                    ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                    : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {majorName}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBJECTS SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest">Môn học</h3>
        </div>

        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
          <button
            onClick={() => onSelectSubject(null)}
            className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center whitespace-nowrap ${
              selectedSubject === null
                ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Tất cả môn học
          </button>
          
          {subjects.length > 0 ? (
            subjects.map((sub) => {
              const subjectId = sub.subject_id || sub.id;
              const subjectName = sub.subject_name || sub.name;

              return (
                <button
                  key={`subject-${subjectId}`}
                  onClick={() => onSelectSubject(subjectId)}
                  className={`px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm rounded-xl md:rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 min-h-[44px] flex items-center whitespace-nowrap ${
                    selectedSubject === subjectId
                      ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                      : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {subjectName}
                </button>
              );
            })
          ) : (
            <p className="text-xs text-gray-500 italic px-3 md:px-4 py-2">
              Hãy chọn một ngành để xem danh sách môn học.
            </p>
          )}
        </div>
      </div>
    </div>
  </>
);

export function FilterSidebar({
  majors,
  subjects,
  selectedMajor,
  onSelectMajor,
  selectedSubject,
  onSelectSubject,
  isOpen = false,
  onOpenChange,
}: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar - Sticky, only visible on lg+ screens */}
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-[68px] h-[calc(100vh-68px)] overflow-y-auto border-r border-gray-100 bg-white pr-2">
        <div className="p-6">
          <FilterContent
            majors={majors}
            subjects={subjects}
            selectedMajor={selectedMajor}
            onSelectMajor={onSelectMajor}
            selectedSubject={selectedSubject}
            onSelectSubject={onSelectSubject}
          />
        </div>
      </aside>

      {/* Mobile Drawer - Only visible on md:hidden screens */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-full sm:w-3/4 max-w-xs md:hidden">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-gray-900">Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
            <FilterContent
              majors={majors}
              subjects={subjects}
              selectedMajor={selectedMajor}
              onSelectMajor={onSelectMajor}
              selectedSubject={selectedSubject}
              onSelectSubject={onSelectSubject}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
