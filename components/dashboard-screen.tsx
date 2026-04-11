'use client';

import { useState, useEffect } from 'react';
import axiosClient from '../lib/axiosClient';

import { TopNavigation } from './top-navigation';
import { FilterSidebar } from './filter-sidebar';
import { FilterFAB } from './filter-fab';
import { DocumentReader } from './document-reader';
import { CommunityView } from './community-view';
import { UploadView } from './upload-view';
import { ContactView } from './contact-view';
import { ProfileView } from './profile-view';
import { LearningProgressView } from './learning-progress-view';

export function DashboardScreen() {
  type ViewState = 'explore' | 'reading' | 'community' | 'upload' | 'contact' | 'profile' | 'progress';

  const [currentView, setCurrentView] = useState<ViewState>('explore');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Trạng thái mở menu lọc trên mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // DATA STATES
  const [materials, setMaterials] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  // KHÔI PHỤC: Cần giữ majors lại để truyền cho UploadView (form đăng tài liệu)
  const [majors, setMajors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FILTER STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'a-z' | 'z-a'>('newest');
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matRes, majRes, subRes] = await Promise.all([
          axiosClient.get('/materials'),
          axiosClient.get('/roadmap/majors'),
          axiosClient.get('/roadmap/subjects')
        ]);

        setMaterials(matRes.data);
        setMajors(majRes.data);
        setSubjects(subRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hệ thống:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // XỬ LÝ LỌC TÀI LIỆU
  const processedMaterials = materials
    .filter((mat) => {
      const matchSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = selectedSubject ? mat.subject_id === selectedSubject : true;
      return matchSearch && matchSubject;
    })
    .sort((a, b) => {
      if (sortOrder === 'a-z') return a.title.localeCompare(b.title);
      if (sortOrder === 'z-a') return b.title.localeCompare(a.title);
      return b.id - a.id;
    });

  // HÀM FALLBACK: Dò tìm tên môn học từ ID (Đã bổ sung logic thông minh)
  const getFallbackSubjectName = (subjectId: any) => {
    if (!subjectId) return 'Tài liệu chung';
    const subject = subjects.find(s => String(s.subject_id || s.id) === String(subjectId));
    return subject ? (subject.subject_name || subject.name) : 'Chưa cập nhật';
  };

  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
    setCurrentView('reading');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'explore':
        return (
          <div className="w-full px-4 md:px-6 lg:px-0 py-4 md:py-6 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">

              {/* Desktop & Mobile Sidebar */}
              <FilterSidebar
                subjects={subjects}
                selectedSubject={selectedSubject}
                onSelectSubject={setSelectedSubject}
                isOpen={isFilterOpen}
                onOpenChange={setIsFilterOpen}
              />

              {/* Main Content */}
              <main className="w-full flex-1 min-w-0">
                {/* Header with Results Count and Sort */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    {processedMaterials.length} Kết quả
                    {searchQuery && <span className="text-base md:text-lg"> cho "{searchQuery}"</span>}
                  </h1>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label className="text-xs md:text-sm text-gray-600 font-medium whitespace-nowrap">Sắp xếp:</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as any)}
                      className="flex-1 sm:flex-none border border-gray-200 rounded-lg px-3 py-2 text-xs md:text-sm text-gray-800 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white transition-all min-h-[44px]"
                    >
                      <option value="newest">Mới nhất</option>
                      <option value="a-z">Tên (A-Z)</option>
                      <option value="z-a">Tên (Z-A)</option>
                    </select>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                  <div className="text-center py-8 md:py-12 bg-white p-6 rounded-lg md:rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                    <div className="text-gray-500 text-sm md:text-base">Đang đồng bộ dữ liệu với máy chủ...</div>
                  </div>
                ) : processedMaterials.length === 0 ? (
                  /* Empty State */
                  <div className="text-center py-8 md:py-12 bg-white rounded-lg md:rounded-2xl border border-dashed border-gray-300 shadow-sm">
                    <div className="text-3xl md:text-4xl mb-3">📭</div>
                    <p className="text-sm md:text-base text-gray-500 font-medium px-4">Không có tài liệu nào phù hợp với bộ lọc này.</p>
                  </div>
                ) : (
                  /* Document Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    {processedMaterials.map((mat) => {
                      // ĐÃ SỬA Ở ĐÂY: Logic dò tên và ghép tiền tố "Môn học:"
                      const rawSubjectName = mat.subject_name || mat.subject?.name || getFallbackSubjectName(mat.subject_id);
                      const finalSubtitle = rawSubjectName === 'Tài liệu chung'
                        ? 'Tài liệu chung'
                        : `Môn học: ${rawSubjectName}`;

                      return (
                        <div
                          key={mat.id}
                          onClick={() => handleDocumentClick(mat)}
                          className="p-4 md:p-5 bg-white rounded-lg md:rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-teal-100 hover:-translate-y-1 active:scale-95 transition-all duration-200 flex flex-col justify-between group min-h-[200px]"
                        >
                          <div className="min-w-0">
                            <h3 className="font-bold text-sm md:text-lg text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors">
                              {mat.title}
                            </h3>
                            {/* ĐÃ SỬA Ở ĐÂY: Hiển thị finalSubtitle thay vì ID thô */}
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 bg-gray-50 inline-block px-2 py-1 rounded-md">
                              {finalSubtitle}
                            </p>
                          </div>
                          <a
                            href={mat.drive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 md:py-2.5 bg-teal-50 text-teal-700 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl hover:bg-teal-100 hover:shadow-sm transition-all inline-block text-center mt-auto min-h-[44px] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Mở Link
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </main>
            </div>
          </div>
        );
      case 'reading':
        return <DocumentReader onBack={() => setCurrentView('explore')} document={selectedDocument} />;
      case 'community':
        return <CommunityView />;
      case 'upload':
        return (
          <UploadView
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            onUploadSuccess={(newDoc: any) => {
              setMaterials(prevMaterials => [newDoc, ...prevMaterials]);
              setCurrentView('explore');
            }}
            majors={majors}
            subjects={subjects}
          />
        );
      case 'contact':
        return <ContactView />;
      case 'profile':
        return <ProfileView />;
      case 'progress':
        return <LearningProgressView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopNavigation
        currentView={currentView}
        onNavigate={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={currentView === 'explore'}
      />

      {/* Mobile Filter FAB - Only shown on small screens during explore view */}
      {currentView === 'explore' && (
        <FilterFAB
          onClick={() => setIsFilterOpen(true)}
          isOpen={isFilterOpen}
        />
      )}

      {renderCurrentView()}
    </div>
  );
}