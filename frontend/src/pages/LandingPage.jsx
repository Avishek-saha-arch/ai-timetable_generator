// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { BookOpen, Sparkles, ArrowRight, BrainCircuit, Zap, Activity } from 'lucide-react';
// // import Button from '../components/ui/Button';
// // import Badge from '../components/ui/Badge';
// // import Card from '../components/ui/Card';

// // const LandingPage = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white selection:bg-[#FFA20A] selection:text-white overflow-hidden font-sans">
// //       <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
// //         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
// //           <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter">
// //             <div className="w-8 h-8 rounded-[10px] bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
// //               <BookOpen className="text-white" size={18} />
// //             </div>
// //             Planify.AI
// //           </div>
// //           <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600 dark:text-slate-300">
// //             <a href="#features" className="hover:text-[#FFA20A] transition-colors">Features</a>
// //             <a href="#how-it-works" className="hover:text-[#FFA20A] transition-colors">Solutions</a>
// //             <a href="#testimonials" className="hover:text-[#FFA20A] transition-colors">Customers</a>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Button variant="ghost" className="hidden sm:flex font-semibold" onClick={() => navigate('/login')}>Sign In</Button>
// //             <Button variant="primary" onClick={() => navigate('/login')}>Start Free Trial</Button>
// //           </div>
// //         </div>
// //       </nav>

// //       <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
// //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#284A50]/10 blur-[120px] rounded-full pointer-events-none" />

// //         <div className="text-center max-w-4xl mx-auto relative z-10">
// //           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// //             <Badge variant="primary" className="mb-8 inline-flex px-4 py-1.5 rounded-full border border-[#284A50]/20 bg-white text-[#284A50]">
// //               <Sparkles size={14} className="mr-2 inline text-[#FFA20A]" /> Planify 2.0 is now live
// //             </Badge>
// //             <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
// //               The Operating System for <br />
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284A50] to-[#52A8AD]">
// //                 Modern Education
// //               </span>
// //             </h1>
// //             <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
// //               Automate complex timetables, extract data from documents instantly with AI, and manage your entire campus from one lightning-fast platform.
// //             </p>
// //             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
// //               <Button size="xl" onClick={() => navigate('/login')} className="w-full sm:w-auto group shadow-xl shadow-[#FFA20A]/20">
// //                 Enter Workspace <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
// //               </Button>
// //               <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm">
// //                 Book a Demo
// //               </Button>
// //             </div>
// //           </motion.div>
// //         </div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 40 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.2, duration: 0.7 }}
// //           className="mt-24 relative mx-auto max-w-5xl"
// //         >
// //           <div className="absolute inset-0 bg-gradient-to-b from-[#284A50]/5 to-transparent rounded-[32px] -m-4 blur-xl" />
// //           <div className="relative bg-white dark:bg-[#1E293B] rounded-[24px] border border-slate-200/80 shadow-2xl shadow-[#284A50]/10 overflow-hidden ring-1 ring-slate-900/5">
// //             <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
// //               <div className="w-3 h-3 rounded-full bg-red-400" />
// //               <div className="w-3 h-3 rounded-full bg-amber-400" />
// //               <div className="w-3 h-3 rounded-full bg-emerald-400" />
// //             </div>
// //             <img
// //               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
// //               alt="Dashboard"
// //               className="w-full object-cover h-[400px] lg:h-[600px] opacity-95"
// //             />
// //           </div>
// //         </motion.div>
// //       </div>

// //       <div id="features" className="py-32 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-800">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="text-center mb-20">
// //             <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Everything you need to run your school.</h2>
// //             <p className="text-slate-500 max-w-2xl mx-auto text-lg">Replace clunky legacy systems with a modern stack designed for speed, accuracy, and joy.</p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               { icon: BrainCircuit, title: 'AI Timetable Engine', desc: 'Resolve complex scheduling conflicts in seconds, not weeks. Perfect optimization.' },
// //               { icon: Zap, title: 'Instant OCR Reader', desc: 'Drag and drop physical admission forms. Our AI digitizes them with 99% accuracy.' },
// //               { icon: Activity, title: 'Live Health Score', desc: 'Monitor attendance, fee collection, and faculty workload through a unified dashboard.' },
// //             ].map((f, i) => (
// //               <Card key={i} hover className="border-slate-200/60 shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
// //                 <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-[#284A50] mb-6">
// //                   <f.icon size={28} />
// //                 </div>
// //                 <h3 className="text-xl font-bold mb-3">{f.title}</h3>
// //                 <p className="text-slate-500 leading-relaxed">{f.desc}</p>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   BookOpen, Sparkles, ArrowRight, 
//   Coffee, Smile, PlayCircle, Menu, X, CheckCircle2,
//   Mail, Github, Linkedin
// } from 'lucide-react';
// import Button from '../components/ui/Button';
// import Badge from '../components/ui/Badge';
// import Card from '../components/ui/Card';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Detect Scroll for Navbar shadow transition
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Why Planify?', href: '#why' },
//     { name: 'How it Helps', href: '#features' },
//     { name: 'Happy Teachers', href: '#stories' },
//   ];

//   // Framer Motion Variants
//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15 }
//     }
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white selection:bg-[#FFA20A] selection:text-white overflow-hidden font-serif relative">
      
//       {/* --- BACKGROUND GRID & AMBIENT BLOBS --- */}
//       <div className="fixed inset-0 opacity-[0.06] dark:opacity-[0.1] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
//       <div className="absolute top-0 left-0 w-full max-w-[800px] h-[600px] bg-gradient-to-br from-[#284A50]/15 to-transparent blur-[120px] rounded-full pointer-events-none z-0 2xl:scale-150 origin-top-left" />
//       <div className="absolute top-40 right-0 w-full max-w-[800px] h-[800px] bg-gradient-to-bl from-[#52A8AD]/15 to-transparent blur-[120px] rounded-full pointer-events-none z-0 2xl:scale-150 origin-top-right" />

//       {/* --- SOLID & ANIMATED NAVBAR --- */}
//       <motion.nav 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 120, damping: 20 }}
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out bg-white dark:bg-[#0F172A] ${
//           scrolled 
//             ? 'shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-3 sm:py-4 border-b border-transparent' 
//             : 'py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800'
//         }`}
//       >
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
          
//           <motion.div 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 sm:gap-3 text-[#284A50] font-extrabold text-xl sm:text-2xl tracking-tight cursor-pointer" 
//             onClick={() => window.scrollTo(0,0)}
//           >
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
//               <BookOpen className="text-white" size={18} />
//             </div>
//             Planify
//           </motion.div>
          
//           <div className="hidden lg:flex items-center gap-10 font-medium text-base text-slate-500 dark:text-slate-400 font-sans">
//             {navLinks.map((link, idx) => (
//               <motion.a 
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * idx }}
//                 key={link.name} 
//                 href={link.href} 
//                 className="relative group hover:text-slate-900 dark:hover:text-white transition-colors py-2"
//               >
//                 {link.name}
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FFA20A] transition-all duration-300 group-hover:w-full rounded-full" />
//               </motion.a>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-4 font-sans">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//               <Button variant="ghost" className="font-semibold text-slate-600" onClick={() => navigate('/login')}>
//                 Log In
//               </Button>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }} 
//               animate={{ opacity: 1, scale: 1 }} 
//               transition={{ delay: 0.5, type: "spring" }}
//               whileHover={{ scale: 1.05 }} 
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button variant="primary" className="shadow-lg shadow-[#FFA20A]/20 font-semibold" onClick={() => navigate('/login')}>
//                 Try for Free
//               </Button>
//             </motion.div>
//           </div>

//           <button 
//             className="md:hidden p-2 text-slate-600 relative z-10"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div 
//               initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
//               animate={{ opacity: 1, y: 0, scaleY: 1 }}
//               exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
//               className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex flex-col gap-4 shadow-2xl origin-top font-sans"
//             >
//               {navLinks.map((link) => (
//                 <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-600 py-3 border-b border-slate-100">
//                   {link.name}
//                 </a>
//               ))}
//               <div className="flex flex-col gap-3 pt-2">
//                 <Button variant="outline" className="w-full justify-center py-3 font-semibold" onClick={() => navigate('/login')}>Log In</Button>
//                 <Button variant="primary" className="w-full justify-center py-3 font-semibold" onClick={() => navigate('/login')}>Try for Free</Button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* --- SPLIT LAYOUT HERO SECTION --- */}
//       <div className="relative pt-36 sm:pt-40 lg:pt-44 2xl:pt-56 pb-16 sm:pb-24 lg:pb-32 2xl:pb-40 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 2xl:gap-16">
        
//         <motion.div 
//           variants={staggerContainer}
//           initial="hidden"
//           animate="show"
//           className="w-full lg:w-1/2 text-center lg:text-left relative z-10"
//         >
//           <motion.div variants={fadeUp}>
//             <Badge variant="primary" className="mb-6 sm:mb-8 2xl:mb-10 inline-flex px-3 sm:px-4 py-1.5 2xl:py-2 2xl:text-base rounded-full border border-[#284A50]/20 bg-white shadow-sm text-xs sm:text-sm font-sans font-semibold">
//               <Sparkles size={16} className="mr-2 inline text-[#FFA20A]" /> Introducing Planify 2.0
//             </Badge>
//           </motion.div>
          
//           <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-[5.5rem] font-bold tracking-tight mb-6 sm:mb-8 2xl:mb-10 leading-[1.15] sm:leading-[1.1] 2xl:leading-[1.05] text-slate-900 dark:text-white">
//             Automate the chaos. <br className="hidden sm:block" />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284A50] to-[#52A8AD] italic">
//               Empower the classroom.
//             </span>
//           </motion.h1>
          
//           <motion.p variants={fadeUp} className="text-lg sm:text-xl 2xl:text-2xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 2xl:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans px-2 sm:px-0">
//             Ditch the messy spreadsheets and legacy software. Manage timetables, documents, and student data with a smart platform designed entirely for humans.
//           </motion.p>
          
//           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 2xl:gap-6 w-full sm:w-auto font-sans">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
//               <Button size="xl" onClick={() => navigate('/login')} className="w-full sm:w-auto justify-center group shadow-xl shadow-[#FFA20A]/20 2xl:text-lg 2xl:px-10 2xl:py-5 font-semibold">
//                 Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
//               <Button size="xl" variant="outline" className="w-full sm:w-auto justify-center bg-white/50 backdrop-blur-sm hover:bg-white gap-2 border-slate-200 2xl:text-lg 2xl:px-10 2xl:py-5 font-semibold">
//                 <PlayCircle size={22} className="text-[#284A50]" /> Watch Video
//               </Button>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 40 }}
//           className="w-full lg:w-1/2 relative perspective-1000 mt-8 lg:mt-0 font-sans"
//         >
//           <motion.div 
//             animate={{ y: [0, -12, 0] }}
//             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
//             className="absolute -left-4 lg:-left-12 2xl:-left-16 top-10 lg:top-16 2xl:top-24 z-20 hidden md:flex items-center gap-4 bg-white shadow-2xl p-5 2xl:p-6 rounded-2xl border border-slate-100"
//           >
//             <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
//               <CheckCircle2 size={24} />
//             </div>
//             <div>
//               <p className="text-base 2xl:text-lg font-bold text-slate-800">Timetable Solved!</p>
//               <p className="text-sm 2xl:text-base font-semibold text-slate-500">Zero conflicts detected.</p>
//             </div>
//           </motion.div>

//           <motion.div 
//             whileHover={{ rotateX: 2, rotateY: -4, scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className="relative bg-white dark:bg-[#1E293B] rounded-2xl sm:rounded-[24px] 2xl:rounded-[32px] border border-slate-200/80 shadow-2xl shadow-[#284A50]/20 overflow-hidden ring-1 ring-slate-900/5 group cursor-pointer lg:-mr-12"
//           >
//             <div className="h-8 sm:h-12 2xl:h-14 border-b border-slate-100 dark:border-slate-800 flex items-center px-3 sm:px-4 2xl:px-6 gap-1.5 sm:gap-2 2xl:gap-3 bg-slate-50 dark:bg-slate-900 transition-colors group-hover:bg-slate-100">
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-red-400 shadow-sm" />
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-amber-400 shadow-sm" />
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-emerald-400 shadow-sm" />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
//               <img
//                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
//                 alt="Interactive Dashboard Preview"
//                 className="w-full object-cover h-[250px] sm:h-[400px] lg:h-[500px] 2xl:h-[650px] opacity-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* --- RESPONSIVE FEATURES SECTION --- */}
//       <div id="features" className="py-20 sm:py-24 lg:py-32 2xl:py-40 relative z-10 border-t border-slate-200/50 bg-white">
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-center mb-12 sm:mb-16 lg:mb-20 2xl:mb-24"
//           >
//             <Badge variant="primary" className="mb-4 2xl:mb-6 inline-flex px-4 py-1.5 2xl:py-2 rounded-full border border-[#284A50]/20 text-[#284A50] 2xl:text-base font-sans font-semibold">
//               Core Features
//             </Badge>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 2xl:mb-6 tracking-tight text-slate-900">
//               Features that actually make sense.
//             </h2>
//             <p className="text-slate-500 max-w-2xl 2xl:max-w-4xl mx-auto text-base sm:text-lg 2xl:text-2xl px-4 sm:px-0 font-sans">
//               We skipped the corporate jargon. Here is exactly how Planify makes your daily life easier.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-12 font-sans">
//             {[
//               { 
//                 icon: Coffee, 
//                 title: 'No More Scheduling Headaches', 
//                 desc: 'Our Smart Timetable engine matches teachers, rooms, and subjects perfectly, so you can grab a coffee instead of stressing over conflicts.' 
//               },
//               { 
//                 icon: Sparkles, 
//                 title: 'Goodbye Manual Data Entry', 
//                 desc: 'Got a stack of messy admission forms? Drag and drop them in. Our AI reads and digitizes them instantly with crazy accuracy.' 
//               },
//               { 
//                 icon: Smile, 
//                 title: 'Keep Your Finger on the Pulse', 
//                 desc: 'See attendance trends, faculty workload, and student happiness in one beautiful dashboard. No spreadsheets required.' 
//               },
//             ].map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ delay: i * 0.15, type: "spring", stiffness: 50 }}
//               >
//                 <Card className="h-full relative overflow-hidden border-slate-200/60 shadow-md bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group p-6 sm:p-8 2xl:p-12 cursor-default">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center text-[#284A50] mb-5 sm:mb-6 2xl:mb-8 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#284A50] group-hover:text-white">
//                     <f.icon className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8" />
//                   </div>
//                   <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold mb-2 sm:mb-3 2xl:mb-4 text-slate-800 font-serif">{f.title}</h3>
//                   <p className="text-sm sm:text-base 2xl:text-lg text-slate-500 leading-relaxed font-medium">{f.desc}</p>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- DETAILED FOOTER SECTION --- */}
//       <footer className="bg-white dark:bg-[#0B1120] border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 relative z-10 font-sans">
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
//             {/* Brand Column */}
//             <div className="lg:col-span-2">
//               <div className="flex items-center gap-3 text-[#284A50] font-extrabold text-2xl tracking-tight mb-6 font-serif">
//                 <div className="w-10 h-10 rounded-xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
//                   <BookOpen className="text-white" size={20} />
//                 </div>
//                 Planify
//               </div>
//               <p className="text-slate-500 dark:text-slate-400 text-base max-w-sm mb-8 font-medium leading-relaxed">
//                 Ditch the messy spreadsheets and legacy software. Manage timetables, documents, and student data with a smart platform designed entirely for humans.
//               </p>
//               <div className="flex items-center gap-4">
//                 <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#284A50] hover:bg-slate-200 transition-colors">
//                   <Github size={18} />
//                 </a>
//                 <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#284A50] hover:bg-slate-200 transition-colors">
//                   <Linkedin size={18} />
//                 </a>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Product</h4>
//               <ul className="space-y-4">
//                 <li><a href="#features" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">Features</a></li>
//                 <li><a href="#" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">Pricing</a></li>
//                 <li><a href="#" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">Changelog</a></li>
//                 <li><a href="#" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">Documentation</a></li>
//               </ul>
//             </div>

//             {/* Company & Contact Mailto Action */}
//             <div>
//               <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
//               <ul className="space-y-4">
//                 <li><a href="#" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">About Us</a></li>
//                 <li><a href="#" className="text-slate-500 hover:text-[#284A50] font-medium transition-colors">Careers</a></li>
//                 <li className="pt-2">
//                   {/* The interactive mailto action exactly as requested */}
//                   <a 
//                     href="mailto:hello@planify.edu?subject=Inquiry about Planify&body=Hi Planify Team,%0D%0A%0D%0AI would like to learn more about..."
//                     className="inline-flex items-center gap-2 bg-[#284A50]/10 text-[#284A50] border border-[#284A50]/20 px-5 py-2.5 rounded-xl font-bold hover:bg-[#284A50] hover:text-white transition-all duration-300 group shadow-sm"
//                   >
//                     <Mail size={18} className="group-hover:scale-110 transition-transform" />
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//           </div>

//           {/* Copyright Bottom Bar */}
//           <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-slate-400 text-sm font-medium">
//               © 2026 Planify Inc. All rights reserved.
//             </p>
//             <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
//               <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
//               <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
//             </div>
//           </div>

//         </div>
//       </footer>
      
//     </div>
//   );
// };

// export default LandingPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Sparkles, ArrowRight, 
  Coffee, Smile, PlayCircle, Menu, X,
  Mail, Github, Linkedin, TrendingUp, CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

// Vite-safe dynamic URL resolution for local assets in src/pic/
const illustrationImg = new URL('../pic/image.png', import.meta.url).href;

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Planify?', href: '#why' },
    { name: 'How it Helps', href: '#features' },
    { name: 'Happy Teachers', href: '#stories' },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white selection:bg-[#FFA20A] selection:text-white overflow-hidden font-sans relative">
      
      <div className="fixed inset-0 opacity-[0.06] dark:opacity-[0.1] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full max-w-[800px] h-[600px] bg-gradient-to-br from-[#284A50]/10 to-transparent blur-[120px] rounded-full pointer-events-none z-0 2xl:scale-150 origin-top-left" />

      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out bg-white dark:bg-[#0F172A] ${
          scrolled 
            ? 'shadow-[0_10px_40px_rgba(0,0,0,0.06)] py-3 sm:py-4 border-b border-transparent' 
            : 'py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 sm:gap-3 text-[#284A50] font-extrabold text-xl sm:text-2xl tracking-tighter cursor-pointer" 
            onClick={() => window.scrollTo(0,0)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
              <BookOpen className="text-white" size={18} />
            </div>
            Planify
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-10 font-bold text-sm text-slate-500 dark:text-slate-400">
            {navLinks.map((link, idx) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                key={link.name} 
                href={link.href} 
                className="relative group hover:text-slate-900 dark:hover:text-white transition-colors py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FFA20A] transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-bold text-slate-600 hover:text-slate-900 transition-colors duration-300" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="primary" className="shadow-lg shadow-[#FFA20A]/20 transition-all duration-300" onClick={() => navigate('/login')}>
              Try for Free
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600 relative z-10 hover:bg-slate-100 rounded-xl transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
              className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] origin-top"
            >
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-600 py-3 border-b border-slate-50 hover:text-[#284A50] transition-colors duration-300">
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Button variant="outline" className="w-full justify-center py-3" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="primary" className="w-full justify-center py-3" onClick={() => navigate('/login')}>Try for Free</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-36 sm:pt-40 lg:pt-44 2xl:pt-56 pb-16 sm:pb-24 lg:pb-32 2xl:pb-40 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 2xl:gap-16">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[45%] text-center lg:text-left relative z-10"
        >
          <Badge variant="primary" className="mb-6 sm:mb-8 2xl:mb-10 inline-flex px-3 sm:px-4 py-1.5 rounded-full border border-[#284A50]/20 bg-white shadow-sm text-xs sm:text-sm font-bold">
            <Sparkles size={16} className="mr-2 inline text-[#FFA20A]" /> Introducing Planify 2.0
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-[5.5rem] font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.15] text-slate-900 dark:text-white">
            Automate the chaos. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284A50] to-[#52A8AD]">
              Empower the classroom.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Ditch the messy spreadsheets and legacy software. Manage timetables, documents, and student data with a smart platform designed entirely for humans.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <Button size="xl" onClick={() => navigate('/login')} className="w-full sm:w-auto justify-center group shadow-xl shadow-[#FFA20A]/20 transition-all duration-300">
              Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto justify-center bg-white/50 backdrop-blur-sm gap-2 border-slate-200 transition-all" onClick={() => navigate('/login')}>
              <PlayCircle size={22} className="text-[#284A50]" /> Watch Video
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Increased Image Display Size */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 40 }}
          className="w-full lg:w-[55%] relative mt-8 lg:mt-0 h-[450px] sm:h-[600px] lg:h-[700px] flex items-center justify-center"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[8%] right-[2%] z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <TrendingUp size={16} className="text-[#FFA20A]" />
            <span className="text-sm font-bold text-slate-800 dark:text-white">Analytics 99%</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] left-[2%] z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-[#52A8AD]" />
            <span className="text-sm font-bold text-slate-800 dark:text-white">Zero Conflicts</span>
          </motion.div>

          {/* Significantly larger max-height and width scaling */}
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img 
              src={illustrationImg} 
              alt="Analytics Presentation Illustration" 
              className="max-h-[550px] sm:max-h-[650px] w-full object-contain drop-shadow-lg select-none pointer-events-none scale-110 sm:scale-125 transition-transform duration-500"
            />
          </div>
        </motion.div>

      </div>

      {/* --- FEATURES SECTION --- */}
      <div id="features" className="py-20 sm:py-24 lg:py-32 2xl:py-40 relative z-10 border-t border-slate-200/50 bg-white dark:bg-[#0B1120]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge variant="primary" className="mb-4 inline-flex px-4 py-1.5 rounded-full border border-[#284A50]/20 text-[#284A50] font-bold">
              Core Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Features that actually make sense.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium">
              We skipped the corporate jargon. Here is exactly how Planify makes your daily life easier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Coffee, title: 'No More Scheduling Headaches', desc: 'Our Smart Timetable engine matches teachers, rooms, and subjects perfectly.' },
              { icon: Sparkles, title: 'Goodbye Manual Data Entry', desc: 'Got a stack of messy forms? Our AI reads and digitizes them instantly.' },
              { icon: Smile, title: 'Keep Your Finger on the Pulse', desc: 'See attendance trends and faculty workload in one beautiful dashboard.' },
            ].map((f, i) => (
              <Card key={i} className="h-full relative overflow-hidden border-slate-200/60 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#284A50] dark:text-[#52A8AD] mb-5">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 dark:text-white">{f.title}</h3>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="relative bg-slate-50 dark:bg-[#0B1120] border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 z-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-medium">© 2026 Planify Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-700">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700">Terms of Service</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default LandingPage;