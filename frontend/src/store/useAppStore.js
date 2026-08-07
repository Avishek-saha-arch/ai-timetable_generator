import { create } from 'zustand';
import { api } from '../services/api';
import * as notificationsService from '../services/notifications.service';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

const cachedUser = (() => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialUser = cachedUser;

const useAppStore = create((set) => ({
  user: initialUser,
  currentUser: initialUser,
  isAuthenticated: Boolean(initialUser),
  userRole: initialUser?.role || null,
  authLoading: false,
  authError: null,

  register: async ({ name, email, password, role }) => {
    set({
      authLoading: true,
      authError: null,
    });

    try {
      const data = await api.register({
        name,
        email,
        password,
        role,
      });

      set({
        user: data.user,
        currentUser: data.user,
        isAuthenticated: true,
        userRole: data.user?.role || null,
        authLoading: false,
      });

      return data.user;
    } catch (error) {
      set({
        authLoading: false,
        authError: error.message,
      });

      throw error;
    }
  },

  login: async ({ email, password, role }) => {
    set({
      authLoading: true,
      authError: null,
    });

    try {
      const data = await api.login({
        email,
        password,
        role,
      });

      set({
        user: data.user,
        currentUser: data.user,
        isAuthenticated: true,
        userRole: data.user?.role || null,
        authLoading: false,
      });

      return data.user;
    } catch (error) {
      set({
        authLoading: false,
        authError: error.message,
      });

      throw error;
    }
  },

  logout: async () => {
    await api.logout();

    set({
      user: null,
      currentUser: null,
      isAuthenticated: false,
      userRole: null,
    });
  },
}));

export default useAppStore;