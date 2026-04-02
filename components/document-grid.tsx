'use client';

import { DocumentCard } from './document-card';

const PROFESSIONAL_GRADIENTS = [
  'bg-gradient-to-br from-blue-500 to-cyan-400',
  'bg-gradient-to-br from-purple-500 to-indigo-500',
  'bg-gradient-to-br from-teal-500 to-emerald-500',
  'bg-gradient-to-br from-orange-400 to-pink-500',
  'bg-gradient-to-br from-slate-700 to-slate-900',
  'bg-gradient-to-br from-rose-500 to-amber-500',
];

interface DocumentGridProps {
  materials: any[];     
  subjects: any[];      
  onDocumentClick: (doc: any) => void;
}

export function DocumentGrid({ materials, subjects, onDocumentClick }: DocumentGridProps) {
  
  // Hàm Fallback: Chặn đứng lỗi "ID: 114" bằng cách ép kiểu an toàn
  const getFallbackSubjectName = (subjectId: any) => {
    if (!subjectId) return 'Tài liệu chung';
    // Ép kiểu cả 2 về String để so sánh an toàn tuyệt đối
    const subject = subjects.find(s => String(s.subject_id || s.id) === String(subjectId));
    return subject ? (subject.subject_name || subject.name) : `Môn học #${subjectId}`;
  };

  // Màn hình trống
  if (!materials || materials.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm animate-in fade-in">
        <div className="text-5xl mb-4 opacity-70">🔍</div>
        <h3 className="text-xl font-bold text-gray-900">Không tìm thấy tài liệu</h3>
        <p className="text-gray-500 mt-2">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm bạn nhé!</p>
      </div>
    );
  }

  return (
    <div className="relative animate-in fade-in duration-500">
      {/* Trang trí Background */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-teal-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-6 w-16 h-16 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      {/* Lưới Tài liệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {materials.map((doc, index) => {
          // ƯU TIÊN 1: Lấy tên môn học Backend đã JOIN sẵn (doc.subject_name)
          // ƯU TIÊN 2: Lấy từ object lồng nhau (doc.subject.name)
          // DỰ PHÒNG: Tự đi dò tìm trong list subjects Frontend (getFallbackSubjectName)
          const displaySubjectName = doc.subject_name || doc.subject?.name || getFallbackSubjectName(doc.subject_id);

          return (
            <DocumentCard
              key={`doc-${doc.id}`}
              title={doc.title}
              subtitle={displaySubjectName}
              gradient={PROFESSIONAL_GRADIENTS[index % PROFESSIONAL_GRADIENTS.length]}
              onClick={() => onDocumentClick(doc)}
            />
          );
        })}
      </div>
    </div>
  );
}