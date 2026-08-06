import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const steps = [
  { title: 'Welcome, Educator!', desc: "Let's get your teaching workspace configured." },
  { title: 'Confirm your subjects', desc: 'This helps us tailor question papers and materials suggestions.' },
  { title: "You're ready to teach!", desc: 'Your classes, timetable, and AI assistant are ready.' },
];

const subjectList = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'];

const TeacherOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const toggle = (s) => setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const finish = () => navigate('/teacher');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <div className="flex items-center gap-2 text-[#284A50] font-extrabold text-xl tracking-tighter mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#284A50] flex items-center justify-center"><BookOpen className="text-white" size={20} /></div>
          Planify
        </div>
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-[#284A50]' : 'bg-slate-100'}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{steps[step].title}</h2>
            <p className="text-slate-500 font-medium mb-8">{steps[step].desc}</p>
            {step === 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {subjectList.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                      subjects.includes(s) ? 'bg-[#284A50] text-white border-[#284A50]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="flex items-center justify-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><CheckCircle2 size={40} /></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <Button size="lg" className="w-full" onClick={() => (step < steps.length - 1 ? setStep(step + 1) : finish())}>
          {step < steps.length - 1 ? 'Continue' : 'Go to Dashboard'} <ArrowRight size={18} />
        </Button>
      </Card>
    </div>
  );
};

export default TeacherOnboarding;
