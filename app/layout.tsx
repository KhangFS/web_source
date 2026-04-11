import { Inter } from 'next/font/google';
import './globals.css';

// Khởi tạo font Inter với biến CSS toàn cục
const inter = Inter({
  subsets: ['latin', 'vietnamese'], // Hỗ trợ tiếng Việt đầy đủ
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Ép class font-sans toàn cục để mọi component bên trong đều tuân theo
    <html lang="vi" className={`${inter.variable} font-sans`}>
      <body className="bg-[#fafafa] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}