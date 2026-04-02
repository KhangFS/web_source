'use client';

import { LayoutGrid, BookOpen, Filter } from 'lucide-react';

interface FilterSidebarProps {
  majors: any[];
  subjects: any[];
  selectedMajor: number | null;
  onSelectMajor: (id: number | null) => void;
  selectedSubject: number | null;
  onSelectSubject: (id: number | null) => void;
}

export function FilterSidebar({
  majors,
  subjects,
  selectedMajor,
  onSelectMajor,
  selectedSubject,
  onSelectSubject
}: FilterSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
          <Filter className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Bộ lọc</h2>
      </div>

      <div className="space-y-8">
        {/* ======================================= */}
        {/* PHẦN 1: NGÀNH HỌC (CATEGORY)            */}
        {/* ======================================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Ngành học</h3>
          </div>
          
          {/* ĐÃ TỐI ƯU UX: Thêm max-h-[250px], overflow-y-auto và custom-scrollbar */}
          <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            <button
              onClick={() => onSelectMajor(null)}
              className={`px-4 py-3 text-left text-sm rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 ${
                selectedMajor === null
                  ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                  : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
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
                  className={`px-4 py-3 text-left text-sm rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 ${
                    selectedMajor === majorId
                      ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                      : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {majorName}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================= */}
        {/* PHẦN 2: MÔN HỌC (SUBJECT)               */}
        {/* ======================================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Môn học</h3>
          </div>

          {/* ĐÃ ĐIỀU CHỈNH: Chiều cao tối đa 300px để cân đối với phần Ngành học */}
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <button
              onClick={() => onSelectSubject(null)}
              className={`px-4 py-3 text-left text-sm rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 ${
                selectedSubject === null
                  ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                  : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
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
                    className={`px-4 py-3 text-left text-sm rounded-2xl font-bold transition-all duration-200 border-2 flex-shrink-0 ${
                      selectedSubject === subjectId
                        ? 'border-teal-500 text-teal-700 bg-teal-50 shadow-sm'
                        : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {subjectName}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 italic px-4 py-2">
                Hãy chọn một ngành để xem danh sách môn học.
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}