import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ArrowRight, BrainCircuit, Zap, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white selection:bg-[#FFA20A] selection:text-white overflow-hidden font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-2xl tracking-tighter">
            <div className="w-8 h-8 rounded-[10px] bg-[#284A50] flex items-center justify-center shadow-lg shadow-[#284A50]/20">
              <BookOpen className="text-white" size={18} />
            </div>
            Planify.AI
          </div>
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-[#FFA20A] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#FFA20A] transition-colors">Solutions</a>
            <a href="#testimonials" className="hover:text-[#FFA20A] transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex font-semibold" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" onClick={() => navigate('/login')}>Start Free Trial</Button>
          </div>
        </div>
      </nav>

      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#284A50]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="primary" className="mb-8 inline-flex px-4 py-1.5 rounded-full border border-[#284A50]/20 bg-white text-[#284A50]">
              <Sparkles size={14} className="mr-2 inline text-[#FFA20A]" /> Planify 2.0 is now live
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
              The Operating System for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284A50] to-[#52A8AD]">
                Modern Education
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Automate complex timetables, extract data from documents instantly with AI, and manage your entire campus from one lightning-fast platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" onClick={() => navigate('/login')} className="w-full sm:w-auto group shadow-xl shadow-[#FFA20A]/20">
                Enter Workspace <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-24 relative mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#284A50]/5 to-transparent rounded-[32px] -m-4 blur-xl" />
          <div className="relative bg-white dark:bg-[#1E293B] rounded-[24px] border border-slate-200/80 shadow-2xl shadow-[#284A50]/10 overflow-hidden ring-1 ring-slate-900/5">
            <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
              alt="Dashboard"
              className="w-full object-cover h-[400px] lg:h-[600px] opacity-95"
            />
          </div>
        </motion.div>
      </div>

      <div id="features" className="py-32 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Everything you need to run your school.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Replace clunky legacy systems with a modern stack designed for speed, accuracy, and joy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BrainCircuit, title: 'AI Timetable Engine', desc: 'Resolve complex scheduling conflicts in seconds, not weeks. Perfect optimization.' },
              { icon: Zap, title: 'Instant OCR Reader', desc: 'Drag and drop physical admission forms. Our AI digitizes them with 99% accuracy.' },
              { icon: Activity, title: 'Live Health Score', desc: 'Monitor attendance, fee collection, and faculty workload through a unified dashboard.' },
            ].map((f, i) => (
              <Card key={i} hover className="border-slate-200/60 shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-[#284A50] mb-6">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
