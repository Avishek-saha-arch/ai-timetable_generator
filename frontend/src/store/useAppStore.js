import { create } from 'zustand';
import * as authService from '../services/auth.service';

// Safely parse initial user and token state from localStorage
const cachedUser = authService.getCachedUser();
const cachedToken = authService.getCachedToken();
const hasSession = Boolean(cachedUser && cachedToken);

const useAppStore = create((set, get) => ({
  // Authentication State
  user: cachedUser,
  currentUser: cachedUser,
  isAuthenticated: hasSession,
  userRole: cachedUser?.role || null,
  authLoading: false,
  authError: null,
  isInitializing: true, // Tracks whether the initial /me check on load has completed

  // Sidebar Layout State & Actions
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  /**
   * Called on app mount (in App.jsx) to verify session with backend
   */
  initializeSession: async () => {
    const token = authService.getCachedToken();

    if (!token) {
      set({
        user: null,
        currentUser: null,
        isAuthenticated: false,
        userRole: null,
        isInitializing: false,
      });
      return;
    }

    try {
      set({ authLoading: true });
      const freshUser = await authService.fetchCurrentUser();

      if (freshUser) {
        set({
          user: freshUser,
          currentUser: freshUser,
          isAuthenticated: true,
          userRole: freshUser.role || null,
          authLoading: false,
          isInitializing: false,
        });
      } else {
        // Token was invalid or expired
        set({
          user: null,
          currentUser: null,
          isAuthenticated: false,
          userRole: null,
          authLoading: false,
          isInitializing: false,
        });
      }
    } catch (error) {
      console.error('[Session Init] Verification failed:', error);
      // Fallback: If network error, rely on cached user state rather than logging out
      const fallbackUser = authService.getCachedUser();
      set({
        user: fallbackUser,
        currentUser: fallbackUser,
        isAuthenticated: Boolean(fallbackUser),
        userRole: fallbackUser?.role || null,
        authLoading: false,
        isInitializing: false,
      });
    }
  },

  /**
   * Register Action
   */
  register: async ({ name, email, password, role }) => {
    set({ authLoading: true, authError: null });

    try {
      const response = await authService.register({ name, email, password, role });
      const user = response.user;

      set({
        user,
        currentUser: user,
        isAuthenticated: true,
        userRole: user?.role || null,
        authLoading: false,
      });

      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      set({ authLoading: false, authError: errorMessage });
      throw error;
    }
  },

  /**
   * Login Action
   */
  login: async ({ email, password, role }) => {
    set({ authLoading: true, authError: null });

    try {
      const response = await authService.login({ email, password, role });
      const user = response.user;

      set({
        user,
        currentUser: user,
        isAuthenticated: true,
        userRole: user?.role || null,
        authLoading: false,
      });

      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      set({ authLoading: false, authError: errorMessage });
      throw error;
    }
  },

  /**
   * Logout Action
   */
  logout: async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout warning:', err);
    } finally {
      set({
        user: null,
        currentUser: null,
        isAuthenticated: false,
        userRole: null,
        authLoading: false,
        authError: null,
      });
    }
  },
}));

export default useAppStore;