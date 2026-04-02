'use client';

import { useState, useEffect } from 'react';
import axiosClient from '../lib/axiosClient';

// Import 2 mảnh ghép vừa tạo từ đúng thư mục components
import { LoginScreen } from '../components/login-screen';
import { DashboardScreen } from '../components/dashboard-screen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Kéo state Auth từ Cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        await axiosClient.get('/auth/me');
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Đang kiểm tra thẻ thông hành...</p>
      </div>
    );
  }

  // Nếu chưa có thẻ -> Render Component Đăng nhập
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Nếu có thẻ -> Render Component Dashboard
  return <DashboardScreen />;
}