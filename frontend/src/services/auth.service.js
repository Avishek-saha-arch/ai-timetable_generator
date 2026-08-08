import api, { USE_MOCKS } from './api';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

/*
 * Expected backend contract:
 *   POST /api/auth/login   { email, password, role } -> { token, user: { id, name, email, role } }
 *   GET  /api/auth/me      (Bearer token)            -> { user }
 *   POST /api/auth/logout  (Bearer token)            -> 204
 */

function demoUserFor(role) {
  const users = {
    admin: { id: 'admin-1', name: 'Admin User', role: 'admin', email: 'admin@planify.edu', avatar: 'A' },
    student: { id: 'student-1', name: 'Prerana', role: 'student', email: 'prerana@student.edu', avatar: 'P' },
    teacher: { id: 'teacher-1', name: 'Dr. Alan Turing', role: 'teacher', email: 'alan.turing@planify.edu', avatar: 'AT' },
  };
  return users[role] || users.student;
}

function isNetworkError(error) {
  return !error?.response;
}

export async function login({ email, password, role }) {
  if (USE_MOCKS) {
    return { token: 'demo-token', user: demoUserFor(role) };
  }
  
  try {
    // FIX 1: Do NOT destructure { data } here, because api.js interceptor already returns response.data directly!
    const responseData = await api.login({ email, password, role });
    
    // Support both { token, user } and { access_token, user } formats from Flask
    const token = responseData.token || responseData.access_token;
    const user = responseData.user;

    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));

    return responseData;
  } catch (error) {
    // FIX 2: Only trigger fallback when the backend server is completely unreachable (Network Error).
    // Real 4xx/5xx errors (like wrong password or invalid input) will be re-thrown properly.
    if (isNetworkError(error)) {
      console.warn('[Auth] Backend unreachable. Falling back to demo mode.');
      const user = demoUserFor(role);
      localStorage.setItem(TOKEN_KEY, 'demo-token');
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { token: 'demo-token', user, demo: true };
    }
    
    // Re-throw 400 / 401 / 500 errors so the UI displays the error message
    throw error;
  }
}

export async function fetchCurrentUser() {
  try {
    // FIX 1: api.me() returns response.data directly
    const responseData = await api.me();
    return responseData.user || responseData;
  } catch (error) {
    if (isNetworkError(error)) {
      const cached = localStorage.getItem(USER_KEY);
      return cached ? JSON.parse(cached) : null;
    }
    throw error;
  }
}

export async function logout() {
  try {
    await api.logout();
  } catch (_) {
    // Ignore - clear local session regardless
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}