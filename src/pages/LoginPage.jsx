import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, GraduationCap, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import useAppStore from '../store/useAppStore';

const ROLE_OPTIONS = [
  { id: 'admin', label: 'Administrator', icon: ShieldCheck },
  { id: 'teacher', label: 'Teacher', icon: Users },
  { id: 'student', label: 'Student', icon: GraduationCap },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authLoading, authError } = useAppStore();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('demo@planify.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password, role });
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'teacher') navigate('/teacher/onboarding');
      else navigate('/student/onboarding');
    } catch {
      // authError is already surfaced from the store
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-[#FFA20A] selection:text-white">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-10 relative">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter mb-12">
            <div className="w-10 h-10 rounded-2xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/30">
              <BookOpen className="text-white" size={24} />
            </div>
            Planify
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome back</h2>
          <p className="text-slate-500 font-medium mb-8">Enter your credentials to access your workspace.</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
                  role === r.id ? 'bg-[#284A50] text-white border-[#284A50] shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                <r.icon size={18} />
                {r.label}
              </button>
            ))}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle size={16} /> {authError}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={authLoading}>
              {authLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <p className="text-xs text-center text-slate-400 font-medium">
              No backend connected yet? This will sign you in with demo data so you can explore the UI.
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-[#284A50] to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%)]" />
      </div>
    </div>
  );
};

export default LoginPage;
