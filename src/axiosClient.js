// src/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  //baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
