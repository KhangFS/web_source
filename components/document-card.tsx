'use client';

import { FileText } from "lucide-react"

interface DocumentCardProps {
  title: string      // Tên tài liệu
  subtitle: string   // Tên môn học hoặc thông tin phụ
  gradient: string   // Lớp CSS gradient (VD: bg-gradient-to-br from-blue-400 to-indigo-500)
  onClick?: () => void
}

export function DocumentCard({ title, subtitle, gradient, onClick }: DocumentCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-7 h-52 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-lg border border-white/20 ${gradient} group`}
    >
      {/* Lớp phủ Watermark biểu tượng tài liệu - Tạo chiều sâu cho thẻ */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <div className="flex flex-wrap gap-2 p-4 justify-end">
          {[...Array(12)].map((_, i) => (
            <FileText key={i} className="w-8 h-10 text-white" />
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-2">
          {/* Badge nhỏ góc trên */}
          <div className="inline-flex items-center px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
            Tài liệu mới
          </div>
          <h3 className="text-2xl font-black text-white leading-tight drop-shadow-sm line-clamp-2">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-white/90 bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm">
            {subtitle}
          </p>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
            <span className="text-white text-lg">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}