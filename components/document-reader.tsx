'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Folder, ExternalLink } from 'lucide-react';
import axiosClient from '../lib/axiosClient';

interface DocumentReaderProps {
  onBack: () => void;
  document: any;
}

export function DocumentReader({ onBack, document }: DocumentReaderProps) {
  const [relatedDocs, setRelatedDocs] = useState<any[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);

  useEffect(() => {
    if (!document?.id) return;

    const fetchRelated = async () => {
      try {
        const res = await axiosClient.get(`/materials/${document.id}/related`);
        setRelatedDocs(res.data);
      } catch (error) {
        console.error("Lỗi lấy tài liệu liên quan:", error);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [document?.id]);

  if (!document) return null;

  // ĐÃ NÂNG CẤP: Bắt mọi thể loại link Drive (cả view lẫn edit) để chuyển thành preview
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace(/\/(view|edit).*$/, '/preview');
    }
    return url;
  };

  const embedUrl = getEmbedUrl(document.drive_url);

  return (
    <div className="flex-1 p-6 animate-in fade-in duration-300 bg-[#fafafa]">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-6 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">Quay lại Khám phá</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Cột trái - Trình xem PDF (Đã thoát kiếp 0px) */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col h-[85vh]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="text-sm text-gray-900 font-bold line-clamp-1" title={document.title}>
                {document.title}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-[10px] text-gray-400 font-medium uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                Không preview được? Xem trực tuyến
              </div>
              <a
                href={document.drive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-600 transition-colors"
                title="Mở trong tab mới"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="w-full bg-gray-100 flex-1 relative">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay"
                title={document.title}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 p-8 text-center bg-white">
                <div className="max-w-md">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-red-400" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-800 mb-3">{document.title}</h1>
                  <p className="text-sm leading-relaxed">Rất tiếc! Không thể hiển thị nội dung do đường dẫn tài liệu không hợp lệ.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ĐÃ VÁ LỖI CSS: Chuyển lg:w-85 thành lg:w-[340px] để không bóp chết cột Iframe */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 flex-shrink-0">

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              Thông tin chi tiết
            </h3>
            <div className="space-y-5">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tên tài liệu</p>
                <p className="text-sm font-bold text-gray-900 leading-relaxed">{document.title}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Môn học</p>
                <p className="text-sm font-bold text-teal-700">
                  {/* ĐÃ VÁ LỖI LOGIC: Ưu tiên in tên môn học thật trước khi in ID */}
                  {document.subject_name || document.subject?.name || (document.subject_id ? `MÔN HỌC #${document.subject_id}` : 'Chưa phân loại')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Folder className="w-4 h-4 text-orange-500" />
              </div>
              Tài liệu liên quan
            </h3>
            {isLoadingRelated ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400 font-medium">Đang tìm tài liệu cùng môn...</p>
              </div>
            ) : relatedDocs.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                Chưa có tài liệu nào khác cùng môn học này.
              </div>
            ) : (
              <div className="space-y-3">
                {relatedDocs.map((doc, index) => {
                  const colors = ['bg-orange-400', 'bg-pink-500', 'bg-teal-500', 'bg-blue-400'];
                  const color = colors[index % colors.length];

                  return (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group border border-transparent hover:border-gray-100"
                    >
                      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-teal-700 transition-colors line-clamp-2" title={doc.title}>
                        {doc.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}