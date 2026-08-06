import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Menu, LogOut } from 'lucide-react';
import NotificationBell from '../common/NotificationBell';
import useAppStore from '../../store/useAppStore';

/**
 * Generic role-agnostic dashboard shell.
 * @param {Array<{id, label, icon, badge?}>} menuItems - sidebar entries
 * @param {string} activeMenu - id of the currently active menu item
 * @param {(id: string) => void} onMenuSelect
 * @param {string} brandLabel - text next to the logo in the sidebar
 */
const DashboardLayout = ({ menuItems, activeMenu, onMenuSelect, brandLabel = 'Planify', children }) => {
  const { sidebarOpen, toggleSidebar, currentUser, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#0F172A] z-50 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-72' : 'w-20'
        } hidden md:flex`}
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
                onClick={() => onMenuSelect(item.id)}
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
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <LogOut size={18} /> {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 bg-white border border-slate-200 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#284A50]/50"
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="flex items-center gap-5">
            <NotificationBell />
            <div className="flex items-center gap-3 pl-5 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-[#284A50] transition-colors">{currentUser.name}</p>
                <p className="text-xs font-semibold text-slate-500">{currentUser.role}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#284A50] to-[#52A8AD] text-white flex items-center justify-center font-bold shadow-md shadow-[#284A50]/20">
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-10 overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
