import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// 1. Create a true Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 2. Attach Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 3. Attach Response Interceptor (Handle Errors & 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('planify_user');
      window.dispatchEvent(new CustomEvent('planify:unauthorized'));
    }

    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// 4. Export API Service Methods using the Axios instance
export const api = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
  me: () => axiosInstance.get('/auth/me'),
};

export default api;