import axios from 'axios';

const axiosClient = axios.create({
  // ĐÃ SỬA: Không hardcode localhost nữa. Ưu tiên biến môi trường của nền tảng Deploy (Vercel/Netlify)
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true, // BẮT BUỘC để giữ Session/Cookie đăng nhập
  headers: {
    'Content-Type': 'application/json',
    // ĐÃ THÊM LÁ CHẮN NGROK: Báo cho Ngrok biết đây là API Call, hãy bỏ qua trang cảnh báo HTML
    'ngrok-skip-browser-warning': 'true'
  }
});

export default axiosClient;