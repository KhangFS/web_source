'use client';

import { useState, useEffect } from 'react';
import axiosClient from '../lib/axiosClient';
import { ContactView } from './contact-view';

export function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [majors, setMajors] = useState<any[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await axiosClient.get('/roadmap/majors');
        setMajors(res.data);
        if (res.data.length > 0) {
          const firstId = res.data[0].id || res.data[0].major_id;
          setSelectedMajor(firstId.toString());
        }
      } catch (error) {
        const mockMajors = [
          { id: 1, name: 'Khoa học Máy tính' },
          { id: 2, name: 'Hệ thống Thông tin' },
          { id: 3, name: 'Kỹ thuật Phần mềm' }
        ];
        setMajors(mockMajors);
        setSelectedMajor(mockMajors[0].id.toString());
      }
    };
    fetchMajors();
  }, []);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isLogin) {
        await axiosClient.post('/auth/login', { username, password });
        onLoginSuccess();
      } else {
        if (!selectedMajor) {
          alert('Vui lòng chọn Ngành học của bạn!');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          alert('Mật khẩu quá ngắn!');
          setIsLoading(false);
          return;
        }
        await axiosClient.post('/auth/register', {
          username, password, major_id: parseInt(selectedMajor)
        });
        alert('Đăng ký thành công! Mời bạn đăng nhập.');
        setIsLogin(true);
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Thao tác thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  if (showContact) {
    return (
      <div className="min-h-screen bg-[#fafafa] relative animate-in fade-in duration-300 font-sans">
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => setShowContact(false)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-bold"
          >
            ← Quay lại Đăng nhập
          </button>
        </div>
        <div className="pt-20 pb-12"><ContactView /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden font-sans antialiased text-gray-900">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 text-stone-200 text-6xl">📚</div>
        <div className="absolute bottom-20 right-20 text-teal-100 text-7xl">🎯</div>
      </div>

      <header className="relative z-10 bg-white border-b border-gray-100">
        {/* ĐÃ FIX: Chuyển grid thành flex justify-between để tối ưu không gian */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* Khu vực Logo: Cho phép chiếm tối đa 70% màn hình mobile, bỏ truncate */}
          <div className="flex items-center gap-2 font-bold text-teal-600 max-w-[70%] sm:max-w-none">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-teal-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-sm md:text-base">U</span>
            </div>
            {/* Chữ sẽ tự động thu nhỏ trên mobile (text-sm) và tự động xuống dòng đẹp mắt nếu màn hình quá hẹp */}
            <span className="text-sm sm:text-base md:text-xl leading-tight text-wrap">
              Learning Hub & Tracker
            </span>
          </div>

          {/* Nút Liên hệ trên PC (Đặt ra giữa bằng absolute) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => setShowContact(true)}
              className="text-gray-500 hover:text-[#0d9488] font-black transition-all text-xs uppercase tracking-[0.2em]"
            >
              Liên hệ
            </button>
          </nav>

          {/* Khu vực nút bên phải */}
          <div className="flex justify-end items-center shrink-0">
            <button
              onClick={() => setShowContact(true)}
              className="md:hidden text-gray-500 hover:text-[#0d9488] font-black transition-all text-[10px] uppercase tracking-widest"
            >
              Liên hệ
            </button>
            <span className="hidden md:inline-block text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Nơi học tập & chia sẻ</span>
          </div>

        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden max-w-4xl w-full border border-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="hidden md:flex bg-[#fcfcfc] p-12 flex-col items-center justify-center border-r border-gray-50">
              <div className="text-center">
                <div className="text-8xl mb-8 animate-pulse drop-shadow-xl">🚀</div>
                <h3 className="text-gray-900 font-black text-2xl mb-2 tracking-tight">Hành trình GPA 9+</h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em]">Nền tảng tri thức sinh viên UIT</p>
              </div>
            </div>

            <div className="p-8 sm:p-10 md:p-14 bg-white flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                    {isLogin ? 'Chào mừng trở lại' : 'Gia nhập Hub'}
                  </h2>
                  <p className="text-gray-400 text-sm font-bold tracking-tight">
                    {isLogin ? 'Đăng nhập để tiếp tục học tập và chia sẻ.' : 'Bắt đầu xây dựng lộ trình học tập của bạn.'}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] ml-1">Tên đăng nhập</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên đăng nhập..."
                      className="w-full px-5 py-4 text-sm bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0d9488] focus:bg-white transition-all outline-none font-bold placeholder:font-medium placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] ml-1">Mật khẩu</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-5 py-4 text-sm bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0d9488] focus:bg-white transition-all outline-none font-bold"
                    />
                    {!isLogin && password.length > 0 && password.length < 6 && (
                      <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 animate-pulse">
                        Mật khẩu phải có ít nhất 6 ký tự
                      </p>
                    )}
                  </div>
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] ml-1">Ngành học</label>
                      <select
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        className="w-full px-5 py-4 text-sm bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0d9488] focus:bg-white transition-all outline-none font-bold appearance-none cursor-pointer"
                      >
                        {majors.map(m => <option key={m.id || m.major_id} value={m.id || m.major_id}>{m.name || m.major_name}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAuth}
                  disabled={isLoading || !username || !password || (!isLogin && password.length < 6)}
                  className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_-5px_rgba(13,148,136,0.3)] flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-xs active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (isLogin ? 'Đăng nhập' : 'Tạo tài khoản')}
                </button>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setPassword('');
                    }}
                    className="text-[10px] font-black text-gray-400 hover:text-[#0d9488] transition-colors uppercase tracking-widest"
                  >
                    {isLogin ? 'Bạn chưa có tài khoản? Tạo mới' : 'Đã có tài khoản? Đăng nhập ngay'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}