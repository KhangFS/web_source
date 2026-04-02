import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// ĐÃ SỬA: Xóa bỏ "Create Next App" và thiết lập nhận diện thương hiệu xịn xò
export const metadata: Metadata = {
  title: 'Knowledge Hub | Nền tảng tri thức UIT',
  description: 'Hệ thống chia sẻ tài liệu và lộ trình học tập dành cho sinh viên UIT, hướng tới mục tiêu GPA 9+',
  icons: {
    // Nếu bạn có file logo, hãy vứt vào thư mục public và đổi tên thành favicon.ico
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}