import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore();
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
