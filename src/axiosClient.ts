// src/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://server-api.zottr.com/',
  // baseURL: 'http://localhost:3004',
  // baseURL: 'http://172.18.121.156:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
