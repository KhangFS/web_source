'use client';

import { useState, useEffect } from "react"
import { BookOpen, GraduationCap, Calculator, Info } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import axiosClient from "../lib/axiosClient"

interface SubjectData {
  id: number;
  code: string;
  title: string;
  credits: number;
  is_completed: boolean;
  score: string | number;
}

interface ProgressData {
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  subjects: SubjectData[];
}

// Component con: Hiển thị dòng Môn học
function SubjectRow({ item, onUpdate }: { item: SubjectData, onUpdate: (id: number, isComp: boolean, score: any) => void }) {
  const [isCompleted, setIsCompleted] = useState(item.is_completed);
  const [score, setScore] = useState<string | number>(item.score);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsCompleted(checked);
    if (!checked) setScore(''); 
    onUpdate(item.id, checked, checked ? score : '');
  };

  const handleBlur = () => {
    // Chỉ cập nhật khi đã hoàn thành môn học và có sự thay đổi về điểm
    if (isCompleted && score !== item.score) {
      onUpdate(item.id, isCompleted, score);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl border-2 transition-all duration-300 ${isCompleted ? 'bg-teal-50/40 border-teal-200' : 'bg-white border-gray-100 hover:border-teal-100'} shadow-sm gap-4`}>
      <div className="flex items-start gap-4 flex-1">
        <div className="relative flex items-center">
          <input 
            type="checkbox" 
            checked={isCompleted}
            onChange={handleCheck}
            className="w-6 h-6 text-teal-600 rounded-lg border-gray-300 focus:ring-teal-500 cursor-pointer transition-all"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            {item.code} <span className="text-gray-300 font-light">|</span> {item.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
              {item.credits} Tín chỉ
            </span>
            {isCompleted && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-600 border border-teal-100">
                Đã hoàn thành
              </span>
            )}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="flex items-center gap-3 pl-10 sm:pl-0 animate-in fade-in slide-in-from-right-2">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Điểm:</label>
          <input
            type="number"
            min="0" max="10" step="0.1"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            onBlur={handleBlur}
            placeholder="0.0"
            className="w-20 px-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-black focus:outline-none focus:border-teal-500 text-center shadow-inner transition-all"
          />
        </div>
      )}
    </div>
  )
}

export function LearningProgressView() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgressData = async () => {
    try {
      const res = await axiosClient.get('/roadmap/progress');
      setData(res.data);
    } catch (error) {
      console.error("Lỗi tải tiến trình:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  const handleUpdateRecord = async (subjectId: number, isCompleted: boolean, score: any) => {
    try {
      await axiosClient.post('/roadmap/grade', {
        subject_id: subjectId,
        is_completed: isCompleted,
        score: score
      });
      fetchProgressData(); // Tải lại để cập nhật CGPA và biểu đồ
    } catch (error) {
      alert("Lỗi hệ thống: Không thể lưu điểm số!");
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#fafafa] p-8 text-center animate-pulse text-gray-400 font-medium">Đang đồng bộ học bạ điện tử...</div>;
  if (!data) return <div className="min-h-screen bg-[#fafafa] p-8 text-center text-red-500 font-bold">Lỗi: Không thể kết nối cơ sở dữ liệu!</div>;

  const percentage = data.totalCredits > 0 ? Math.round((data.completedCredits / data.totalCredits) * 100) : 0;
  const chartData = [
    { name: "Đã hoàn thành", value: data.completedCredits, fill: "#0d9488" }, 
    { name: "Còn lại", value: Math.max(0, data.totalCredits - data.completedCredits), fill: "#f1f5f9" } 
  ];

  // Mobile Summary Component
  const MobileSummary = () => (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex items-center justify-between gap-4">
        {/* CGPA Display */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">CGPA</span>
          <span className="text-2xl font-black text-teal-600">{data.cgpa}</span>
        </div>
        
        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>
        
        {/* Progress Display */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tiến độ</span>
          <span className="text-2xl font-black text-teal-600">{percentage}%</span>
        </div>
        
        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>
        
        {/* Credits Display */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">TC</span>
          <span className="text-2xl font-black text-teal-600">{data.completedCredits}/{data.totalCredits}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32 md:pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 md:pt-10 pb-8 md:pb-16 mb-6 md:mb-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm">
            <GraduationCap className="w-8 md:w-10 h-8 md:h-10 text-teal-600" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight">Học bạ Điện tử</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium max-w-lg mx-auto px-2">Quản lý lộ trình tốt nghiệp, điểm số tích lũy và theo dõi tiến độ đào tạo theo ngành học.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Cột trái - Danh sách môn học */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
              <h2 className="text-xl md:text-2xl font-black text-gray-800">Lộ trình Đào tạo</h2>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 md:px-3 py-1 rounded-lg">
              {data.subjects.length} Môn
            </div>
          </div>
          
          {data.subjects.length === 0 ? (
            <div className="bg-white p-12 md:p-16 rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <div className="text-4xl md:text-5xl mb-4">📚</div>
              <p className="text-gray-500 font-bold text-sm md:text-base">Ngành học của bạn chưa có dữ liệu môn học.</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Vui lòng liên hệ quản trị viên hoặc kiểm tra lại file seed.</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {data.subjects.map(subject => (
                <SubjectRow key={subject.id} item={subject} onUpdate={handleUpdateRecord} />
              ))}
            </div>
          )}
        </div>

        {/* Cột phải - Thống kê (Hidden on mobile, visible on lg+) */}
        <div className="hidden lg:block space-y-8">
          {/* Card Điểm trung bình (CGPA) */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                <Calculator className="w-6 h-6 text-teal-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 tracking-wide">Điểm Tích lũy</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">
                {data.cgpa}
              </span>
              <span className="text-teal-400 font-bold">/ 10.0</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Info className="w-3 h-3" />
              Tính theo trọng số tín chỉ
            </div>
          </div>

          {/* Card Tiến độ */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-8 text-center">Tiến độ Tốt nghiệp</h3>
            <div className="flex justify-center mb-8 relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie 
                    data={chartData} 
                    cx="50%" cy="50%" 
                    innerRadius={70} outerRadius={95} 
                    paddingAngle={5} 
                    dataKey="value" 
                    stroke="none"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-gray-900">{percentage}%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">Hoàn thành</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-teal-50 rounded-2xl p-4 flex justify-between items-center border border-teal-100">
                <span className="text-sm font-bold text-teal-800">Đã tích lũy</span>
                <span className="text-lg font-black text-teal-700">
                  {data.completedCredits} <span className="text-xs font-bold text-teal-600/60 uppercase">TC</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100">
                <span className="text-sm font-bold text-gray-500">Tổng yêu cầu</span>
                <span className="text-lg font-black text-gray-700">
                  {data.totalCredits} <span className="text-xs font-bold text-gray-400 uppercase">TC</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Summary Bar */}
      <MobileSummary />
    </div>
  );
}
  };

  if (isLoading) return <div className="min-h-screen bg-[#fafafa] p-8 text-center animate-pulse text-gray-400 font-medium">Đang đồng bộ học bạ điện tử...</div>;
  if (!data) return <div className="min-h-screen bg-[#fafafa] p-8 text-center text-red-500 font-bold">Lỗi: Không thể kết nối cơ sở dữ liệu!</div>;

  const percentage = data.totalCredits > 0 ? Math.round((data.completedCredits / data.totalCredits) * 100) : 0;
  const chartData = [
    { name: "Đã hoàn thành", value: data.completedCredits, fill: "#0d9488" }, 
    { name: "Còn lại", value: Math.max(0, data.totalCredits - data.completedCredits), fill: "#f1f5f9" } 
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-16 mb-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <GraduationCap className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Học bạ Điện tử</h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Quản lý lộ trình tốt nghiệp, điểm số tích lũy và theo dõi tiến độ đào tạo theo ngành học.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cột trái - Danh sách môn học */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-black text-gray-800">Lộ trình Đào tạo</h2>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-lg">
              {data.subjects.length} Môn học
            </div>
          </div>
          
          {data.subjects.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-500 font-bold">Ngành học của bạn chưa có dữ liệu môn học.</p>
              <p className="text-sm text-gray-400 mt-1">Vui lòng liên hệ quản trị viên hoặc kiểm tra lại file seed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.subjects.map(subject => (
                <SubjectRow key={subject.id} item={subject} onUpdate={handleUpdateRecord} />
              ))}
            </div>
          )}
        </div>

        {/* Cột phải - Thống kê */}
        <div className="space-y-8">
          {/* Card Điểm trung bình (CGPA) */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                <Calculator className="w-6 h-6 text-teal-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 tracking-wide">Điểm Tích lũy</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">
                {data.cgpa}
              </span>
              <span className="text-teal-400 font-bold">/ 10.0</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Info className="w-3 h-3" />
              Tính theo trọng số tín chỉ
            </div>
          </div>

          {/* Card Tiến độ */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-8 text-center">Tiến độ Tốt nghiệp</h3>
            <div className="flex justify-center mb-8 relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie 
                    data={chartData} 
                    cx="50%" cy="50%" 
                    innerRadius={70} outerRadius={95} 
                    paddingAngle={5} 
                    dataKey="value" 
                    stroke="none"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-gray-900">{percentage}%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">Hoàn thành</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-teal-50 rounded-2xl p-4 flex justify-between items-center border border-teal-100">
                <span className="text-sm font-bold text-teal-800">Đã tích lũy</span>
                <span className="text-lg font-black text-teal-700">
                  {data.completedCredits} <span className="text-xs font-bold text-teal-600/60 uppercase">TC</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100">
                <span className="text-sm font-bold text-gray-500">Tổng yêu cầu</span>
                <span className="text-lg font-black text-gray-700">
                  {data.totalCredits} <span className="text-xs font-bold text-gray-400 uppercase">TC</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
