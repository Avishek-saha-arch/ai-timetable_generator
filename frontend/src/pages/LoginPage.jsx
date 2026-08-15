// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, GraduationCap, Users, User } from 'lucide-react';
// // import Button from '../components/ui/Button';
// // import useAppStore from '../store/useAppStore';

// // const ROLE_OPTIONS = [
// //   { id: 'admin', label: 'Administrator', icon: ShieldCheck },
// //   { id: 'teacher', label: 'Teacher', icon: Users },
// //   { id: 'student', label: 'Student', icon: GraduationCap },
// // ];

// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   const { login, register, authLoading, authError } = useAppStore();

// //   const [isSignUp, setIsSignUp] = useState(false);
// //   const [role, setRole] = useState('student');
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [validationError, setValidationError] = useState('');

// //   const toggleMode = (signUpState) => {
// //     setIsSignUp(signUpState);
// //     setValidationError('');
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setValidationError('');

// //     if (isSignUp && password !== confirmPassword) {
// //       setValidationError('Passwords do not match.');
// //       return;
// //     }

// //     try {
// //       let user;
// //       if (isSignUp) {
// //         if (role === 'admin') {
// //           throw new Error('Admin registration is not allowed through this form.');
// //         }
// //         user = await register({ name, email, password, role });
// //       } else {
// //         user = await login({ email, password, role });
// //       }

// //       if (user?.role === 'admin') navigate('/admin');
// //       else if (user?.role === 'teacher') navigate('/teacher/onboarding');
// //       else navigate('/student/onboarding');
// //     } catch {
// //       // authError is handled and surfaced by Zustand store
// //     }
// //   };

// //   const activeError = validationError || authError;

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-[#FFA20A] selection:text-white">
// //       <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-10 relative my-8">
// //         <div className="max-w-md w-full mx-auto">
// //           <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter mb-8">
// //             <div className="w-10 h-10 rounded-2xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/30">
// //               <BookOpen className="text-white" size={24} />
// //             </div>
// //             Planify
// //           </div>

// //           <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
// //             {isSignUp ? 'Create an account' : 'Welcome back'}
// //           </h2>
// //           <p className="text-slate-500 font-medium mb-6">
// //             {isSignUp ? 'Enter your details below to create your account.' : 'Enter your credentials to access your workspace.'}
// //           </p>

// //           {/* Mode Switcher Tabs */}
// //           <div className="flex bg-slate-200/60 p-1 rounded-2xl mb-6">
// //             <button
// //               type="button"
// //               onClick={() => toggleMode(false)}
// //               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
// //                 !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
// //               }`}
// //             >
// //               Log In
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => toggleMode(true)}
// //               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
// //                 isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
// //               }`}
// //             >
// //               Sign Up
// //             </button>
// //           </div>

// //           {/* Role Selection */}
// //           <div className="grid grid-cols-3 gap-2 mb-6">
// //             {ROLE_OPTIONS.map((r) => (
// //               <button
// //                 key={r.id}
// //                 type="button"
// //                 onClick={() => setRole(r.id)}
// //                 className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
// //                   role === r.id
// //                     ? 'bg-[#284A50] text-white border-[#284A50] shadow-md'
// //                     : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
// //                 }`}
// //               >
// //                 <r.icon size={18} />
// //                 {r.label}
// //               </button>
// //             ))}
// //           </div>

// //           <form className="space-y-4" onSubmit={handleSubmit}>
// //             {/* Full Name field (Sign Up only) */}
// //             {isSignUp && (
// //               <div>
// //                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
// //                 <div className="relative group">
// //                   <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
// //                   <input
// //                     type="text"
// //                     placeholder="Your Name"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             <div>
// //               <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
// //               <div className="relative group">
// //                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
// //                 <input
// //                   type="email"
// //                   placeholder="your.email@planify.edu"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
// //               <div className="relative group">
// //                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
// //                 <input
// //                   type={showPassword ? 'text' : 'password'}
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
// //                 >
// //                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Confirm Password field (Sign Up only) */}
// //             {isSignUp && (
// //               <div>
// //                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
// //                 <div className="relative group">
// //                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={confirmPassword}
// //                     onChange={(e) => setConfirmPassword(e.target.value)}
// //                     className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             {activeError && (
// //               <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
// //                 <AlertCircle size={16} /> {activeError}
// //               </div>
// //             )}

// //             <Button type="submit" size="lg" className="w-full mt-2" disabled={authLoading}>
// //               {authLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : isSignUp ? 'Create Account' : 'Sign In'}
// //             </Button>

// //             <p className="text-xs text-center text-slate-400 font-medium">
// //               {isSignUp ? (
// //                 <>
// //                   Already have an account?{' '}
// //                   <button type="button" onClick={() => toggleMode(false)} className="text-[#284A50] font-bold hover:underline">
// //                     Sign In
// //                   </button>
// //                 </>
// //               ) : (
// //                 <>
// //                   Don't have an account?{' '}
// //                   <button type="button" onClick={() => toggleMode(true)} className="text-[#284A50] font-bold hover:underline">
// //                     Sign Up
// //                   </button>
// //                 </>
// //               )}
// //             </p>
// //           </form>
// //         </div>
// //       </div>

// //       <div className="hidden lg:block flex-1 bg-gradient-to-br from-[#284A50] to-[#0F172A] relative overflow-hidden">
// //         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%)]" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, 
//   ShieldCheck, GraduationCap, Users, User, BrainCircuit, Clock 
// } from 'lucide-react';
// import Button from '../components/ui/Button';
// import Badge from '../components/ui/Badge';
// import useAppStore from '../store/useAppStore';

// const ROLE_OPTIONS = [
//   { id: 'admin', label: 'Administrator', icon: ShieldCheck },
//   { id: 'teacher', label: 'Teacher', icon: Users },
//   { id: 'student', label: 'Student', icon: GraduationCap },
// ];

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login, register, authLoading, authError } = useAppStore();

//   const [isSignUp, setIsSignUp] = useState(false);
//   const [role, setRole] = useState('student');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationError, setValidationError] = useState('');
  
//   // State for interactive 3D illustration
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   const toggleMode = (signUpState) => {
//     setIsSignUp(signUpState);
//     setValidationError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValidationError('');

//     if (isSignUp && password !== confirmPassword) {
//       setValidationError('Passwords do not match.');
//       return;
//     }

//     try {
//       let user;
//       if (isSignUp) {
//         if (role === 'admin') {
//           throw new Error('Admin registration is not allowed through this form.');
//         }
//         user = await register({ name, email, password, role });
//       } else {
//         user = await login({ email, password, role });
//       }

//       if (user?.role === 'admin') navigate('/admin');
//       else if (user?.role === 'teacher') navigate('/teacher/onboarding');
//       else navigate('/student/onboarding');
//     } catch {
//       // authError is handled and surfaced by Zustand store
//     }
//   };

//   // Calculate mouse position to drive the 3D parallax effect
//   const handleMouseMove = (e) => {
//     const { clientX, clientY, currentTarget } = e;
//     const { left, top, width, height } = currentTarget.getBoundingClientRect();
//     const x = ((clientX - left) / width) * 2 - 1; // Range: -1 to 1
//     const y = ((clientY - top) / height) * 2 - 1; // Range: -1 to 1
//     setMousePos({ x, y });
//   };

//   const activeError = validationError || authError;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-[#FFA20A] selection:text-white">
      
//       {/* Left Side - Auth Form */}
//       <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-10 relative my-8">
//         <div className="max-w-md w-full mx-auto">
//           <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter mb-8">
//             <div className="w-10 h-10 rounded-2xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/30">
//               <BookOpen className="text-white" size={24} />
//             </div>
//             Planify
//           </div>

//           <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
//             {isSignUp ? 'Create an account' : 'Welcome back'}
//           </h2>
//           <p className="text-slate-500 font-medium mb-6">
//             {isSignUp ? 'Enter your details below to create your account.' : 'Enter your credentials to access your workspace.'}
//           </p>

//           {/* Mode Switcher Tabs */}
//           <div className="flex bg-slate-200/60 p-1 rounded-2xl mb-6">
//             <button
//               type="button"
//               onClick={() => toggleMode(false)}
//               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
//                 !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//               }`}
//             >
//               Log In
//             </button>
//             <button
//               type="button"
//               onClick={() => toggleMode(true)}
//               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
//                 isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Role Selection */}
//           <div className="grid grid-cols-3 gap-2 mb-6">
//             {ROLE_OPTIONS.map((r) => (
//               <button
//                 key={r.id}
//                 type="button"
//                 onClick={() => setRole(r.id)}
//                 className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
//                   role === r.id
//                     ? 'bg-[#284A50] text-white border-[#284A50] shadow-md'
//                     : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
//                 }`}
//               >
//                 <r.icon size={18} />
//                 {r.label}
//               </button>
//             ))}
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {isSignUp && (
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
//                 <div className="relative group">
//                   <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
//                 <input
//                   type="email"
//                   placeholder="your.email@planify.edu"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {isSignUp && (
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
//                 <div className="relative group">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm"
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             {activeError && (
//               <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
//                 <AlertCircle size={16} /> {activeError}
//               </div>
//             )}

//             <Button type="submit" size="lg" className="w-full mt-2" disabled={authLoading}>
//               {authLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : isSignUp ? 'Create Account' : 'Sign In'}
//             </Button>

//             <p className="text-xs text-center text-slate-400 font-medium">
//               {isSignUp ? (
//                 <>
//                   Already have an account?{' '}
//                   <button type="button" onClick={() => toggleMode(false)} className="text-[#284A50] font-bold hover:underline">
//                     Sign In
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Don't have an account?{' '}
//                   <button type="button" onClick={() => toggleMode(true)} className="text-[#284A50] font-bold hover:underline">
//                     Sign Up
//                   </button>
//                 </>
//               )}
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Right Side - Interactive 3D Illustration */}
//       <div 
//         className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden items-center justify-center cursor-crosshair"
//         onMouseMove={handleMouseMove}
//       >
//         {/* Glowing Background that follows mouse slightly */}
//         <motion.div 
//           animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
//           transition={{ type: 'spring', damping: 40, stiffness: 100 }}
//           className="absolute w-[600px] h-[600px] bg-[#52A8AD]/20 blur-[120px] rounded-full pointer-events-none" 
//         />

//         {/* 3D Container */}
//         <div className="relative w-full max-w-lg" style={{ perspective: 1200 }}>
          
//           {/* Main Parallax Group */}
//           <motion.div
//             animate={{ rotateX: mousePos.y * -15, rotateY: mousePos.x * 15 }}
//             transition={{ type: 'spring', damping: 30, stiffness: 120 }}
//             className="relative w-full aspect-square"
//             style={{ transformStyle: 'preserve-3d' }}
//           >
            
//             {/* Center Main Card - AI Engine */}
//             <div 
//               className="absolute inset-0 m-auto w-72 h-72 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl p-8 flex flex-col justify-between"
//               style={{ transform: 'translateZ(0px)' }}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#284A50] to-[#52A8AD] flex items-center justify-center shadow-lg">
//                    <BrainCircuit className="text-white" size={28} />
//                 </div>
//                 <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">System Online</Badge>
//               </div>
//               <div>
//                 <h3 className="text-white font-bold text-xl mb-1">Planify Engine Core</h3>
//                 <p className="text-slate-400 text-sm font-medium">Processing institutional data...</p>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
//                     <div className="h-full w-3/4 bg-[#FFA20A] rounded-full" />
//                   </div>
//                   <div className="h-1.5 w-2/3 bg-white/10 rounded-full overflow-hidden">
//                     <div className="h-full w-1/2 bg-[#52A8AD] rounded-full" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Card 1 - Timetable/Sync */}
//             <motion.div
//               animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
//               className="absolute top-8 -left-12 w-48 h-36 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col gap-4"
//               style={{ transform: 'translateZ(60px)' }}
//             >
//                <div className="flex items-center gap-3 text-slate-200 font-bold text-sm">
//                  <div className="p-2 bg-white/10 rounded-lg"><Clock size={16}/></div>
//                  Smart Sync
//                </div>
//                <div className="flex-1 rounded-lg bg-white/10 border border-white/5" />
//                <div className="h-2 w-2/3 rounded-full bg-white/10" />
//             </motion.div>

//             {/* Floating Card 2 - Stats */}
//             <motion.div
//                animate={{ x: mousePos.x * -10, y: mousePos.y * -10 }}
//               className="absolute bottom-8 -right-8 w-56 h-44 bg-gradient-to-tr from-[#284A50]/90 to-[#52A8AD]/90 backdrop-blur-xl border border-white/20 rounded-[24px] p-6 shadow-2xl flex flex-col justify-between text-white"
//               style={{ transform: 'translateZ(90px)' }}
//             >
//                <div className="flex items-center gap-3 font-bold text-sm text-white/90">
//                  <Users size={18} className="text-[#FFA20A]" /> Global Roster
//                </div>
//                <div>
//                   <h4 className="font-extrabold text-4xl tracking-tight mb-1">2,491</h4>
//                   <p className="text-sm font-medium text-white/70">Total Active Users</p>
//                </div>
//                <div className="flex gap-1">
//                  {[...Array(6)].map((_, i) => (
//                    <div key={i} className="h-1 flex-1 bg-white/30 rounded-full" />
//                  ))}
//                </div>
//             </motion.div>

//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, 
  ShieldCheck, GraduationCap, Users, User, Sparkles, Clock, CheckCircle2, UserPlus, LogIn, Droplets 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
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
  
  // State for interactive 3D illustration parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1; 
    const y = ((clientY - top) / height) * 2 - 1; 
    setMousePos({ x, y });
  };

  const activeError = validationError || authError;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden selection:bg-[#FFA20A] selection:text-white font-sans relative">
      
      {/* Architectural Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Main Wrapper ensuring smooth side-switching animation */}
      <div className={`w-full flex flex-col lg:flex-row min-h-screen relative z-10 ${isSignUp ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Auth Form Side */}
        <motion.div 
          layout 
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative"
        >
          <div className="max-w-md w-full mx-auto">
            
            <div className="flex items-center gap-3 text-[#284A50] font-extrabold text-2xl tracking-tighter mb-8 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-11 h-11 rounded-2xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/30">
                <BookOpen className="text-white" size={22} />
              </div>
              Planify
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-slate-500 font-medium mb-8 text-sm sm:text-base">
              {isSignUp ? 'Enter your details below to create your workspace profile.' : 'Enter your credentials to securely access your workspace.'}
            </p>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-200/70 p-1.5 rounded-2xl mb-8 shadow-inner">
              <button
                type="button"
                onClick={() => toggleMode(false)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  !isSignUp ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => toggleMode(true)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  isSignUp ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {ROLE_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-2 py-3.5 rounded-2xl border text-xs font-bold transition-all ${
                    role === r.id
                      ? 'bg-[#284A50] text-white border-[#284A50] shadow-lg shadow-[#284A50]/20 scale-[1.02]'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <r.icon size={18} />
                  {r.label}
                </button>
              ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm text-slate-800"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="your.email@planify.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#284A50] transition-colors" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] transition-all font-medium shadow-sm text-slate-800"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeError && (
                <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 shadow-sm">
                  <AlertCircle size={16} /> {activeError}
                </div>
              )}

              <Button type="submit" size="xl" className="w-full mt-3 shadow-lg shadow-[#FFA20A]/20" disabled={authLoading}>
                {authLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              <p className="text-xs text-center text-slate-400 font-medium pt-2">
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
        </motion.div>

        {/* Interactive 3D Illustration Side with Water Drop Fluid Theme */}
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className={`hidden lg:flex flex-1 relative overflow-hidden items-center justify-center cursor-crosshair p-12 transition-colors duration-700 ${
            isSignUp 
              ? 'bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] text-white' 
              : 'bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] text-slate-900'
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Subtle Architectural Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Dynamic Water Ripple Glow Accent */}
          <motion.div 
            animate={{ x: mousePos.x * 35, y: mousePos.y * 35 }}
            transition={{ type: 'spring', damping: 40, stiffness: 100 }}
            className={`absolute w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none ${
              isSignUp ? 'bg-cyan-200/30' : 'bg-[#FFA20A]/15'
            }`} 
          />

          {/* 3D Depth Container with Water Drop Fluid Animations */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center" style={{ perspective: 1200 }}>
            
            <motion.div
              animate={{ rotateX: mousePos.y * -12, rotateY: mousePos.x * 12 }}
              transition={{ type: 'spring', damping: 30, stiffness: 100 }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              
              {/* Center Main Fluid Water Drop Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className={`absolute w-80 h-80 backdrop-blur-2xl p-8 flex flex-col justify-between transition-all duration-700 ${
                  isSignUp 
                    ? 'bg-white/15 border border-white/40 shadow-[0_25px_60px_rgba(3,105,161,0.3)] text-white rounded-[60%_40%_70%_30%/40%_60%_30%_70%]' 
                    : 'bg-white/70 border border-white/60 shadow-[0_25px_60px_rgba(15,23,42,0.12)] text-slate-900 rounded-[36px]'
                }`}
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                    isSignUp ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-gradient-to-br from-[#284A50] to-[#52A8AD] text-white'
                  }`}>
                     {isSignUp ? <Droplets size={26} /> : <LogIn size={26} />}
                  </div>
                  <Badge className={`font-bold px-3 py-1 ${isSignUp ? 'bg-white/20 text-white border border-white/30 backdrop-blur-md' : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'}`}>
                    {isSignUp ? 'Fluid Flow' : 'Secure Login'}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-extrabold text-2xl tracking-tight mb-1">
                    {isSignUp ? 'Ripple Effect' : 'Smart Institution'}
                  </h3>
                  <p className={`text-sm font-medium mb-4 ${isSignUp ? 'text-cyan-100' : 'text-slate-600'}`}>
                    {isSignUp ? 'Seamless data ripples across your ecosystem.' : 'Automated scheduling & analytics core active.'}
                  </p>
                  <div className="space-y-2.5">
                    <div className={`h-2 w-full rounded-full overflow-hidden ${isSignUp ? 'bg-white/20' : 'bg-slate-200'}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: isSignUp ? '95%' : '88%' }} transition={{ duration: 1.5 }} className={`h-full rounded-full ${isSignUp ? 'bg-white' : 'bg-gradient-to-r from-[#284A50] to-[#FFA20A]'}`} />
                    </div>
                    <div className={`h-2 w-3/4 rounded-full overflow-hidden ${isSignUp ? 'bg-white/20' : 'bg-slate-200'}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: isSignUp ? '80%' : '65%' }} transition={{ duration: 1.5, delay: 0.2 }} className={`h-full rounded-full ${isSignUp ? 'bg-cyan-200' : 'bg-[#52A8AD]'}`} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Top-Left Water Drop Bubble */}
              <motion.div
                animate={{ x: mousePos.x * -25, y: [0, -12, 0] }}
                transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                className={`absolute top-6 left-2 w-52 backdrop-blur-xl p-5 shadow-2xl flex items-center gap-4 transition-all duration-700 ${
                  isSignUp 
                    ? 'bg-white/10 border border-white/30 text-white rounded-[40%_60%_50%_50%/50%_40%_60%_50%]' 
                    : 'bg-white/80 border border-white/60 text-slate-900 rounded-3xl'
                }`}
                style={{ transform: 'translateZ(90px)' }}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSignUp ? 'bg-white/20 text-cyan-200' : 'bg-[#52A8AD]/15 text-[#284A50]'}`}>
                   <Droplets size={22}/>
                 </div>
                 <div>
                   <div className="font-bold text-sm">Pure Clarity</div>
                   <div className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${isSignUp ? 'text-cyan-200' : 'text-emerald-600'}`}>
                     <CheckCircle2 size={12} /> Fluid Dynamics
                   </div>
                 </div>
              </motion.div>

              {/* Floating Bottom-Right Water Drop Bubble */}
              <motion.div
                animate={{ x: mousePos.x * 20, y: [0, 12, 0] }}
                transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } }}
                className={`absolute bottom-6 right-2 w-60 backdrop-blur-2xl p-6 shadow-2xl transition-all duration-700 ${
                  isSignUp 
                    ? 'bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white rounded-[50%_50%_30%_70%/60%_40%_60%_40%]' 
                    : 'bg-gradient-to-br from-[#284A50] to-[#1E293B] text-white rounded-[28px]'
                }`}
                style={{ transform: 'translateZ(120px)' }}
              >
                 <div className="flex items-center gap-2.5 font-bold text-sm text-white/90 mb-2">
                   <Users size={18} className={isSignUp ? 'text-cyan-200' : 'text-[#FFA20A]'} /> {isSignUp ? 'Absorption Rate' : 'Live Roster Load'}
                 </div>
                 <div className="flex items-baseline justify-between mb-3">
                   <span className="text-3xl font-extrabold text-white tracking-tight">{isSignUp ? '99.9%' : '1,842'}</span>
                   <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isSignUp ? 'text-cyan-100 bg-white/20' : 'text-emerald-300 bg-emerald-500/20'}`}>{isSignUp ? 'Optimal' : 'Active'}</span>
                 </div>
                 <div className="flex gap-1.5 h-1.5 w-full">
                   {[...Array(8)].map((_, i) => (
                     <div key={i} className={`flex-1 rounded-full ${i < 6 ? (isSignUp ? 'bg-cyan-200' : 'bg-[#52A8AD]') : 'bg-white/20'}`} />
                   ))}
                 </div>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;