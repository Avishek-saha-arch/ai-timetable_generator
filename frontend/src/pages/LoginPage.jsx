import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, GraduationCap, Users, User } from 'lucide-react';
import Button from '../components/ui/Button';
import useAppStore from '../store/useAppStore';

const ROLE_OPTIONS = [
  { id: 'admin', label: 'Administrator', icon: ShieldCheck },
  { id: 'teacher', label: 'Teacher', icon: Users },
  { id: 'student', label: 'Student', icon: GraduationCap },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register, authLoading, authError } = useAppStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const toggleMode = (signUpState) => {
    setIsSignUp(signUpState);
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (isSignUp && password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      let user;
      if (isSignUp) {
        if (role === 'admin') {
          throw new Error('Admin registration is not allowed through this form.');
        }
        user = await register({ name, email, password, role });
      } else {
        user = await login({ email, password, role });
      }

      if (user?.role === 'admin') navigate('/admin');
      else if (user?.role === 'teacher') navigate('/teacher/onboarding');
      else navigate('/student/onboarding');
    } catch {
      // authError is handled and surfaced by Zustand store
    }
  };

  const activeError = validationError || authError;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-[#FFA20A] selection:text-white">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-10 relative my-8">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/30">
              <BookOpen className="text-white" size={24} />
            </div>
            Planify
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-slate-500 font-medium mb-6">
            {isSignUp ? 'Enter your details below to create your account.' : 'Enter your credentials to access your workspace.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-200/60 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => toggleMode(false)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => toggleMode(true)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
                  role === r.id
                    ? 'bg-[#284A50] text-white border-[#284A50] shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                <r.icon size={18} />
                {r.label}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name field (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="your.email@planify.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password field (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            {activeError && (
              <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle size={16} /> {activeError}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" disabled={authLoading}>
              {authLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            <p className="text-xs text-center text-slate-400 font-medium">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => toggleMode(false)} className="text-[#284A50] font-bold hover:underline">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => toggleMode(true)} className="text-[#284A50] font-bold hover:underline">
                    Sign Up
                  </button>
                </>
              )}
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