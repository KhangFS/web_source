'use client';

import { useState, useEffect } from 'react';
import { LogOut, Settings, FileText, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axiosClient from '../lib/axiosClient';

export function ProfileView() {
  const [profile, setProfile] = useState<any>(null);
  const [majors, setMajors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [meRes, majorsRes] = await Promise.all([
          axiosClient.get('/auth/me'),
          axiosClient.get('/roadmap/majors')
        ]);
        setProfile(meRes.data);
        setMajors(majorsRes.data);
      } catch (error) {
        console.error('Lỗi tải Profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosClient.post('/auth/logout');
      window.location.reload(); 
    } catch (error) {
      alert('Lỗi đăng xuất');
    }
  };

  // Ánh xạ ID Ngành ra Tên Ngành
  const getMajorName = (majorId: number) => {
    const major = majors.find(m => m.id === majorId);
    return major ? major.name : 'Chưa cập nhật ngành học';
  };

  if (isLoading) return <div className="min-h-screen bg-[#fafafa] p-8 text-center animate-pulse text-gray-500">Đang tải hồ sơ...</div>;
  if (!profile) return <div className="min-h-screen bg-[#fafafa] p-8 text-center text-red-500">Không thể tải thông tin người dùng.</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Hồ sơ - Tối giản & Tập trung */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
          <div className="px-8 pb-8">
            <div className="flex justify-between items-end -mt-12 mb-6">
              <Avatar className="w-24 h-24 border-4 border-white bg-white shadow-md">
                <AvatarImage src={`https://robohash.org/${profile.username}?set=set4&bgset=bg1`} />
                <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex gap-3">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.username}</h1>
              <p className="text-teal-600 font-medium mt-1">{getMajorName(profile.major_id)}</p>
            </div>

            <div className="mt-6 flex gap-6 border-t border-gray-100 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{profile.docCount || 0}</span>
                <span className="text-sm text-gray-500 font-medium">Tài liệu đã chia sẻ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách Tài liệu đã đóng góp */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Kho tài liệu của tôi
          </h2>
          
          {profile.documents && profile.documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.documents.map((doc: any) => (
                <div key={doc.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors group flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4 bg-gray-50 inline-block px-2.5 py-1 rounded-md">
                      Môn học ID: {doc.subject_id}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(doc.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <a 
                      href={doc.drive_link || doc.drive_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-teal-600 hover:text-teal-800"
                    >
                      Mở link Drive →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chưa có tài liệu nào</h3>
              <p className="text-gray-500">Bạn chưa chia sẻ tài liệu nào lên Knowledge Hub. Hãy đóng góp ngay nhé!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}