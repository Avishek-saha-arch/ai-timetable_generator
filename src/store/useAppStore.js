import { create } from 'zustand';
import * as authService from '../services/auth.service';
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

const useAppStore = create((set, get) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  userRole: cachedUser?.role || null,
  currentUser: cachedUser || { name: '', role: '', email: '', avatar: '' },
  authError: null,
  authLoading: false,

  login: async ({ email, password, role }) => {
    set({ authLoading: true, authError: null });
    try {
      const { user } = await authService.login({ email, password, role });
      set({ isAuthenticated: true, userRole: user.role, currentUser: user, authLoading: false });
      get().loadNotifications();
      return user;
    } catch (error) {
      set({ authLoading: false, authError: error?.response?.data?.message || 'Invalid credentials.' });
      throw error;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ isAuthenticated: false, userRole: null, currentUser: { name: '', role: '', email: '', avatar: '' } });
  },

  notifications: [],
  loadNotifications: async () => {
    const notifications = await notificationsService.getNotifications();
    set({ notifications });
  },
  removeNotification: (id) => {
    notificationsService.dismissNotification(id).catch(() => {});
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
  },
}));

// If a request comes back 401, drop the local session immediately.
window.addEventListener('planify:unauthorized', () => {
  useAppStore.setState({ isAuthenticated: false, userRole: null, currentUser: { name: '', role: '', email: '', avatar: '' } });
});

export default useAppStore;
