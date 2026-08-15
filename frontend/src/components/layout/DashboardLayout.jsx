import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Menu, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationBell from '../common/NotificationBell';
import ThemeToggle from '../common/ThemeToggle'; // Added your ThemeToggle!
import useAppStore from '../../store/useAppStore';

const DashboardLayout = ({ menuItems, activeMenu, onMenuSelect, brandLabel = 'Planify', children }) => {
  const { sidebarOpen, toggleSidebar, currentUser, logout } = useAppStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex">
      
      {/* Mobile Overlay Background - Closes sidebar when clicked on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Side Navigation Bar */}
      <aside
        className={`fixed md:sticky left-0 top-0 h-screen bg-[#0F172A] z-50 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className="h-20 flex items-center justify-center px-4 border-b border-slate-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tighter text-white">
              <div className="w-8 h-8 rounded-[10px] bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
                <BookOpen className="text-white" size={18} />
              </div>
              {brandLabel}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-[12px] bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
              <BookOpen className="text-white" size={20} />
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-4 overflow-y-auto space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onMenuSelect(item.id);
                  // Auto-close sidebar on mobile after clicking a link
                  if (window.innerWidth < 768 && sidebarOpen) toggleSidebar();
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group relative font-semibold
                  ${isActive ? 'bg-[#FFA20A] text-white shadow-lg shadow-[#FFA20A]/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100 transition-opacity'} />
                {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300">
        
        {/* Top Interactive Navigation Bar */}
        <header className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 sticky top-0 z-30 px-4 lg:px-10 flex items-center justify-between transition-colors">
          
          {/* Left Side: Burger Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#284A50]/50 active:scale-95"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Right Side: Interactive Tools & Profile */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Added your Theme Toggle here! */}
            <ThemeToggle />
            
            {/* Notifications */}
            <NotificationBell />

            {/* Interactive User Profile Dropdown */}
            <div className="relative border-l border-slate-200 dark:border-slate-700 pl-3 sm:pl-5">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1 pr-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#284A50]/30"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{currentUser.role}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#284A50] to-[#52A8AD] text-white flex items-center justify-center font-bold shadow-md shadow-[#284A50]/20">
                  {currentUser.avatar}
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-slate-700 overflow-hidden z-50 p-2"
                  >
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
                      <User size={16} /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;