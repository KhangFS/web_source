import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://unthreatening-hendrix-lilied.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Sống còn: Giúp Next.js mang theo Cookie session!
});

export default axiosClient;