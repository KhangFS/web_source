'use client';

import { useState, useEffect } from 'react';
import axiosClient from '../lib/axiosClient';

import { TopNavigation } from './top-navigation';
import { FilterSidebar } from './filter-sidebar';
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
  
  const [materials, setMaterials] = useState<any[]>([]); 
  const [majors, setMajors] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'a-z' | 'z-a'>('newest');
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi thẳng API, KHÔNG DÙNG Mock Data nữa. Sập là phải báo lỗi để sửa!
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
        // Có thể thêm 1 state error ở đây để hiển thị thông báo ra màn hình nếu muốn
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedSubjects = selectedMajor 
    ? subjects.filter(sub => sub.major_id === selectedMajor) 
    : subjects;

  useEffect(() => {
    if (selectedSubject && !displayedSubjects.find(s => s.subject_id === selectedSubject)) {
      setSelectedSubject(null);
    }
  }, [selectedMajor, selectedSubject, displayedSubjects]);

  const processedMaterials = materials
    .filter((mat) => {
      const matchSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = selectedSubject ? mat.subject_id === selectedSubject : true;
      const matchMajor = selectedMajor ? mat.major_id === selectedMajor : true;
      return matchSearch && matchSubject && matchMajor;
    })
    .sort((a, b) => {
      if (sortOrder === 'a-z') return a.title.localeCompare(b.title);
      if (sortOrder === 'z-a') return b.title.localeCompare(a.title);
      return b.id - a.id; 
    });

  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
    setCurrentView('reading');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'explore':
        return (
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-start gap-8">
            <FilterSidebar 
              majors={majors}
              subjects={displayedSubjects}
              selectedMajor={selectedMajor}
              onSelectMajor={setSelectedMajor}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
            />
            
            <main className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                  {processedMaterials.length} Kết quả
                  {searchQuery && <span> cho "{searchQuery}"</span>}
                </h1>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 font-medium">Sắp xếp:</label>
                  <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-teal-500 bg-white shadow-sm"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="a-z">Tên (A-Z)</option>
                    <option value="z-a">Tên (Z-A)</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-gray-500 animate-pulse bg-white p-6 rounded-xl border border-gray-100 shadow-sm">Đang đồng bộ dữ liệu với máy chủ...</div>
              ) : processedMaterials.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 font-medium">Không có tài liệu nào phù hợp với bộ lọc này.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {processedMaterials.map((mat) => (
                    <div 
                      key={mat.id} 
                      onClick={() => handleDocumentClick(mat)} 
                      className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-teal-100 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">{mat.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 bg-gray-50 inline-block px-2 py-1 rounded-md">Môn học ID: {mat.subject_id}</p>
                      </div>
                      <a 
                        href={mat.drive_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-teal-50 text-teal-700 text-sm font-semibold rounded-lg hover:bg-teal-100 hover:shadow-sm transition-all inline-block text-center mt-auto"
                        onClick={(e) => e.stopPropagation()} 
                      >
                        Mở tab Drive mới
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </main>
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
        // ĐÃ SỬA: Bỏ các props thừa thãi do LearningProgressView mới đã tự lo
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
      {renderCurrentView()}
    </div>
  );
}