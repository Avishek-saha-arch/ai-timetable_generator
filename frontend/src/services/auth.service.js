import api, { USE_MOCKS } from './api';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

/*
 * Expected backend contract:
 * POST /api/auth/register { name, email, password, role } -> { token/access_token, user: { id, name, email, role } }
 * POST /api/auth/login    { email, password, role }       -> { token/access_token, user: { id, name, email, role } }
 * GET  /api/auth/me       (Bearer token)                 -> { user }
 * POST /api/auth/logout   (Bearer token)                 -> 204 / { success: true }
 */

// Demo users for fallback when backend is offline or USE_MOCKS is enabled
function demoUserFor(role, overrides = {}) {
  const defaultRole = role || 'student';
  const users = {
    admin: { id: 'admin-1', name: 'Admin User', role: 'admin', email: 'admin@planify.edu', avatar: 'A' },
    student: { id: 'student-1', name: 'Prerana', role: 'student', email: 'prerana@student.edu', avatar: 'P' },
    teacher: { id: 'teacher-1', name: 'Dr. Alan Turing', role: 'teacher', email: 'alan.turing@planify.edu', avatar: 'AT' },
  };

  const baseUser = users[defaultRole] || users.student;
  return { ...baseUser, ...overrides };
}

// Detects total server unreachability (e.g. server offline, CORS preflight blocked)
function isNetworkError(error) {
  return !error?.response;
}

// Internal helper to normalize extracting user & token from varied API structures
function extractSessionData(responseData, fallbackUser = {}) {
  // Axios unwrapping safety check
  const data = responseData?.data || responseData || {};

  const token = data.token || data.access_token || data.jwt || null;
  
  // Extract user across all standard backend response shapes
  let user = data.user || data.student || data.data?.user || null;

  // If user object wasn't wrapped, but user properties exist at top-level
  if (!user && data.id && (data.email || data.name)) {
    user = { id: data.id, name: data.name, email: data.email, role: data.role };
  }

  // If user payload is missing entirely from backend, reconstruct from input
  if (!user && (fallbackUser.email || fallbackUser.name)) {
    user = {
      id: fallbackUser.id || 'user-' + Date.now(),
      name: fallbackUser.name || fallbackUser.email?.split('@')[0] || 'User',
      email: fallbackUser.email || '',
      role: fallbackUser.role || 'student'
    };
  }

  return { token, user };
}

// Internal helper to cache session credentials in LocalStorage
function cacheSession(token, user) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (user && typeof user === 'object') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    console.warn('[Auth Cache Warning] Attempted to cache invalid user:', user);
  }
}

/**
 * Register a new user
 */
export async function register({ name, email, password, role }) {
  if (USE_MOCKS) {
    const user = demoUserFor(role, { name, email });
    const mockToken = 'demo-token';
    cacheSession(mockToken, user);
    return { token: mockToken, user };
  }

  try {
    const rawResponse = await api.register({ name, email, password, role });
    const { token, user } = extractSessionData(rawResponse, { name, email, role });

    cacheSession(token, user);

    return { token, user, raw: rawResponse };
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn('[Auth Register] Backend unreachable. Falling back to demo registration.');
      const user = demoUserFor(role, { name, email });
      const mockToken = 'demo-token';
      cacheSession(mockToken, user);
      return { token: mockToken, user, demo: true };
    }

    throw error;
  }
}

/**
 * Login existing user
 */
export async function login({ email, password, role }) {
  if (USE_MOCKS) {
    const user = demoUserFor(role, { email });
    const mockToken = 'demo-token';
    cacheSession(mockToken, user);
    return { token: mockToken, user };
  }

  try {
    const rawResponse = await api.login({ email, password, role });
    const { token, user } = extractSessionData(rawResponse, { email, role });

    cacheSession(token, user);

    return { token, user, raw: rawResponse };
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn('[Auth Login] Backend unreachable. Falling back to demo mode.');
      const user = demoUserFor(role, { email });
      const mockToken = 'demo-token';
      cacheSession(mockToken, user);
      return { token: mockToken, user, demo: true };
    }

    throw error;
  }
}

/**
 * Retrieve current user with cache-first strategy
 */
export async function fetchCurrentUser() {
  const cachedUser = getCachedUser();

  try {
    const responseData = await api.me();
    const { user: freshUser } = extractSessionData(responseData);

    if (freshUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      return freshUser;
    }

    return cachedUser;
  } catch (error) {
    if (isNetworkError(error) && cachedUser) {
      console.warn('[Auth] Operating in offline mode with cached user profile.');
      return cachedUser;
    }

    if (error?.response?.status === 401) {
      clearSessionCache();
      return null;
    }

    return cachedUser || null;
  }
}

/**
 * Read cached user profile from LocalStorage safely
 */
export function getCachedUser() {
  try {
    const cached = localStorage.getItem(USER_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    console.error('Failed to parse cached user:', err);
    return null;
  }
}

/**
 * Read cached JWT token
 */
export function getCachedToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

/**
 * Helper to wipe storage cache
 */
export function clearSessionCache() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Logout session
 */
export async function logout() {
  try {
    await api.logout();
  } catch (_) {
    // Ignore backend logout errors to ensure client cache is always cleared
  } finally {
    clearSessionCache();
  }
}