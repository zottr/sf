// src/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  // baseURL: 'http://api.zottr.com/server-api',
  baseURL: 'https://api.zottr.com/server-api',
  // baseURL: 'http://localhost:3004',
  // baseURL: 'http://172.18.121.156:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
