import axios from 'axios';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://planify-backend-o8py.onrender.com";

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// 1. Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 2. Attach Request Interceptor (Inject Auth Bearer Token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Attach Response Interceptor (Handle Unwrapping & Status Codes)
axiosInstance.interceptors.response.use(
  (response) => response.data, // Unwraps response.data directly
  (error) => {
    // Check for 401 Unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new CustomEvent('planify:unauthorized'));
    }

    // Standardize error message while PRESERVING error.response
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Attach extracted message onto the original error object instead of instantiating new Error()
    error.customMessage = message;

    return Promise.reject(error);
  }
);

// 4. Export API Service Methods
export const api = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
  me: () => axiosInstance.get('/auth/me'),
  
  // Generic helper methods for future routes
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
};

export default api;