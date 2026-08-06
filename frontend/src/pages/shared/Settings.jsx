import React, { useState } from 'react';
import { Sun, Moon, Bell, Lock, Globe } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-[#284A50]' : 'bg-slate-200'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
  </button>
);

const Settings = () => {
  const { theme, toggleTheme } = useAppStore();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Settings" description="Manage your account preferences." />

      <Card>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Sun size={18} className="text-[#284A50]" /> Appearance</h3>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Dark Mode</p>
            <p className="text-xs text-slate-500">Switch between light and dark themes.</p>
          </div>
          <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Bell size={18} className="text-[#284A50]" /> Notifications</h3>
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Email Alerts</p>
            <p className="text-xs text-slate-500">Receive important updates via email.</p>
          </div>
          <Toggle checked={emailAlerts} onChange={setEmailAlerts} />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Push Notifications</p>
            <p className="text-xs text-slate-500">Get real-time alerts in your browser.</p>
          </div>
          <Toggle checked={pushAlerts} onChange={setPushAlerts} />
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Lock size={18} className="text-[#284A50]" /> Security</h3>
        <div className="space-y-3">
          <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
          <input type="password" placeholder="New Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
          <Button>Update Password</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
