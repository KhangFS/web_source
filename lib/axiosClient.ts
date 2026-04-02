import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Sống còn: Giúp Next.js mang theo Cookie session!
});

export default axiosClient;