import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import Badge from '../ui/Badge';
import useAppStore from '../../store/useAppStore';

const iconFor = (type) => {
  if (type === 'warning') return <AlertTriangle size={16} className="text-amber-500" />;
  if (type === 'success') return <CheckCircle2 size={16} className="text-emerald-500" />;
  return <Info size={16} className="text-[#284A50]" />;
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  // Pull notifications state directly from Zustand store (Removed duplicate useState)
  const { notifications = [], loadNotifications, removeNotification } = useAppStore();

  useEffect(() => {
    if (typeof loadNotifications === 'function') {
      loadNotifications();
    }
  }, [loadNotifications]);

  const list = Array.isArray(notifications) ? notifications : [];
  const count = list.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 bg-white border border-slate-200 shadow-sm transition-colors relative"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFA20A] text-white text-[10px] font-bold flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">Notifications</h3>
              <Badge variant="primary">{count} New</Badge>
            </div>
            
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {count === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm font-medium">All caught up!</div>
              ) : (
                list.map((n) => (
                  <div key={n.id} className="flex gap-3 items-start p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <div className="mt-0.5">{iconFor(n.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{n.text}</p>
                      <p className="text-xs text-slate-400 font-medium mt-1">{n.time}</p>
                    </div>
                    <button 
                      onClick={() => removeNotification && removeNotification(n.id)} 
                      className="text-slate-300 hover:text-slate-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;