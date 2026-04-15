import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    // ĐÂY LÀ CHÌA KHÓA: Ép Ngrok bỏ qua trang interstitial
    'ngrok-skip-browser-warning': '69420',
  },
  withCredentials: true, // Quan trọng để gửi Session/Cookie
});

export default axiosClient;