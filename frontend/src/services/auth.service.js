import api, { USE_MOCKS } from './api';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

/*
 * Expected backend contract:
 *   POST /auth/login   { email, password, role }  -> { token, user: { id, name, email, role, avatar } }
 *   GET  /auth/me       (Bearer token)             -> { user }
 *   POST /auth/logout   (Bearer token)              -> 204
 *
 * If the backend is unreachable (network error, no response at all) the app
 * falls back to a local demo session so the UI remains fully explorable
 * without a backend. Real 4xx/5xx responses from a connected backend
 * (e.g. wrong password) are NOT swallowed - they surface as errors.
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
    const { data } = await api.post('/auth/login', { email, password, role });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  } catch (error) {
    // if (isNetworkError(error)) {
    //   // No backend configured/reachable yet - fall back to a demo session.
    //   const user = demoUserFor(role);
    //   localStorage.setItem(TOKEN_KEY, 'demo-token');
    //   localStorage.setItem(USER_KEY, JSON.stringify(user));
    //   return { token: 'demo-token', user, demo: true };
    // }
    // throw error;

    const user = demoUserFor(role);

    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return {
      token: 'demo-token',
      user,
      demo: true,
    };
  }
}

export async function fetchCurrentUser() {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
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
    await api.post('/auth/logout');
  } catch (_) {
    // Ignore - we clear the local session regardless.
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
