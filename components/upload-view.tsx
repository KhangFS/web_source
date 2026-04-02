'use client';

import { useState, useEffect, useMemo } from 'react';
import { Upload, Link as LinkIcon, FileText, CheckCircle } from 'lucide-react';
import axiosClient from '../lib/axiosClient';

interface UploadViewProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  onUploadSuccess: (newDocument: any) => void;
  majors: any[];
  subjects: any[];
}

export function UploadView({ 
  showSuccessModal, 
  setShowSuccessModal, 
  onUploadSuccess,
  majors,
  subjects 
}: UploadViewProps) {
  // 1. KHOẢNG KHÔNG GIAN STATE (Trạng thái)
  const [title, setTitle] = useState('');
  const [driveUrl, setDriveUrl] = useState(''); 
  const [majorId, setMajorId] = useState<string>(''); 
  const [subjectId, setSubjectId] = useState<string>(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. KHOẢNG KHÔNG GIAN DỮ LIỆU PHÁI SINH (Derived State)
  // ĐÃ TỐI ƯU: Dùng useMemo để React KHÔNG tạo ra mảng mới sau mỗi lần gõ phím, diệt tận gốc lỗi "Ghost Click"
  const displayedSubjects = useMemo(() => {
    if (!majorId) return subjects;
    return subjects.filter((s: any) => s.major_id === parseInt(majorId));
  }, [majorId, subjects]);

  // 3. KHOẢNG KHÔNG GIAN HIỆU ỨNG PHỤ (Side Effects)
  // Effect 1: Tự động chọn Ngành học đầu tiên khi dữ liệu majors vừa tải về
  useEffect(() => {
    if (majors && majors.length > 0 && !majorId) {
      const firstMajorId = majors[0].id || majors[0].major_id; 
      if (firstMajorId) setMajorId(firstMajorId.toString());
    }
  }, [majors, majorId]);

  // Effect 2: Tự động chọn Môn học đầu tiên MỖI KHI đổi Ngành (displayedSubjects thay đổi)
  useEffect(() => {
    if (displayedSubjects && displayedSubjects.length > 0) {
      const firstSubjectId = displayedSubjects[0].subject_id || displayedSubjects[0].id;
      if (firstSubjectId) setSubjectId(firstSubjectId.toString());
    } else {
      setSubjectId(''); 
    }
  }, [displayedSubjects]);

  // 4. KHOẢNG KHÔNG GIAN XỬ LÝ SỰ KIỆN (Event Handlers)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!majorId || !subjectId) {
      alert('Vui lòng chọn đầy đủ Ngành và Môn học!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosClient.post('/materials', {
        title: title,
        drive_url: driveUrl, 
        major_id: parseInt(majorId),
        subject_id: parseInt(subjectId)
      });
      
      onUploadSuccess(response.data);
      setShowSuccessModal(true);
      
      // Reset form
      setTitle('');
      setDriveUrl('');
      
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error: any) {
      console.error('Lỗi upload API:', error);
      alert(error.response?.data?.error || 'Có lỗi xảy ra khi lưu vào Database!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. KHOẢNG KHÔNG GIAN RENDER GIAO DIỆN
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
        {/* Trang trí Background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Chia sẻ Tài liệu</h1>
            <p className="text-gray-500">Đóng góp kiến thức của bạn để xây dựng cộng đồng UIT vững mạnh</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Tên Tài liệu */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên tài liệu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Slide bài giảng C++ OOP Tuần 1"
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Link Google Drive */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Link Google Drive <span className="text-red-500">*</span>
              </label>
              <p className="mt-2 text-[11px] text-orange-500 font-medium">
  ⚠️ Lưu ý: Hãy đảm bảo file đã được chuyển sang chế độ "Bất kỳ ai có đường liên kết đều có thể xem" để tránh lỗi hiển thị.
</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  required
                  disabled={isSubmitting}
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Chọn Ngành & Môn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ngành học</label>
                <select
                  disabled={isSubmitting || majors.length === 0}
                  value={majorId}
                  onChange={(e) => setMajorId(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-60"
                >
                  {majors.map(m => (
                    <option key={`major-${m.id || m.major_id}`} value={m.id || m.major_id}>
                      {m.name || m.major_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Môn học</label>
                <select
                  disabled={isSubmitting || displayedSubjects.length === 0}
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-60"
                >
                  {displayedSubjects.map((s: any) => (
                    <option key={`subject-${s.subject_id || s.id}`} value={s.subject_id || s.id}>
                      {s.subject_name || s.name}
                    </option>
                  ))}
                  {displayedSubjects.length === 0 && (
                    <option value="">(Không có môn học)</option>
                  )}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang lưu vào Database...
                  </div>
                ) : (
                  'Chia sẻ Tài liệu'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Thành công */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tuyệt vời!</h3>
            <p className="text-gray-500 mb-6">Tài liệu đã được ghi vào cơ sở dữ liệu vĩnh viễn.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </main>
  );
}