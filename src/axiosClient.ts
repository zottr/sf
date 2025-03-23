// src/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  // baseURL: 'http://api.zottr.com/server-api',
  baseURL: 'https://api.zottr.com/server-api',
  // baseURL: 'http://localhost:3004',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
