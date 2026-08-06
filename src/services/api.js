import axios from 'axios';

// Base URL resolution:
// 1. VITE_API_BASE_URL from .env (points straight at your backend, e.g. https://api.myschool.com/api)
// 2. Falls back to "/api" which the Vite dev server proxies to VITE_DEV_PROXY_TARGET (see vite.config.js),
//    and which your production host should reverse-proxy to the backend as well.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('planify_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Central 401 handling: clear session and let the app redirect to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('planify_token');
      localStorage.removeItem('planify_user');
      window.dispatchEvent(new CustomEvent('planify:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
