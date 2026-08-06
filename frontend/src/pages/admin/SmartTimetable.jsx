import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Wand2, BookOpen, Users, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import * as timetableService from '../../services/timetable.service';

const SmartTimetable = () => {
  const [generateState, setGenerateState] = useState('config'); // config | generating | success
  const [progress, setProgress] = useState(0);
  const [gridData, setGridData] = useState(null);
  const [form, setForm] = useState({ institution: '', department: '' });

  const handleGenerate = async () => {
    setGenerateState('generating');
    setProgress(0);

    const { jobId } = await timetableService.generateTimetable(form);

    const interval = setInterval(async () => {
      const status = await timetableService.getGenerationStatus(jobId);
      setProgress(status.progress ?? 100);
      if (status.status === 'done') {
        clearInterval(interval);
        setGridData(status.result);
        setGenerateState('success');
      } else if (status.status === 'failed') {
        clearInterval(interval);
        setGenerateState('config');
      }
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-gradient-to-br from-[#284A50] to-[#52A8AD] rounded-xl shadow-lg shadow-[#284A50]/30">
              <Sparkles className="text-white" size={24} />
            </div>
            {generateState === 'config' ? 'Smart Timetable Configuration' : 'Smart Timetable Pro'}
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            {generateState === 'config' ? 'Configure your institution details and constraints before generation.' : 'AI constraint solver for zero-conflict scheduling.'}
          </p>
        </div>
        {generateState === 'success' && (
          <div className="flex gap-3">
            <Button variant="outline" size="lg"><Download size={18} /> Export</Button>
            <Button onClick={() => setGenerateState('config')} size="lg" className="px-8 shadow-xl">
              <Wand2 size={20} /> Generate Again
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {generateState === 'config' && (
          <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen size={18} className="text-[#284A50]" /> Institution Details</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="School/College Name"
                    value={form.institution}
                    onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50]"
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    value={form.department}
                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50]"
                  />
                  <div className="flex gap-3">
                    <select className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] text-slate-500">
                      <option>Academic Year</option>
                      <option>2025-2026</option>
                    </select>
                    <select className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 focus:border-[#284A50] text-slate-500">
                      <option>Semester</option>
                      <option>Fall</option>
                      <option>Spring</option>
                    </select>
                  </div>
                </div>
              </Card>
              <Card>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Users size={18} className="text-[#284A50]" /> Faculty Details</h3>
                <p className="text-sm text-slate-500 font-medium">Faculty and room constraints are pulled automatically from Teacher Management once connected to the backend.</p>
              </Card>
              <Card className="bg-gradient-to-br from-[#284A50]/5 to-white border-[#284A50]/10">
                <h3 className="font-bold text-slate-900 mb-2">Ready to generate?</h3>
                <p className="text-sm text-slate-600 font-medium mb-6">The AI constraint solver will resolve room, teacher, and section conflicts automatically.</p>
                <Button onClick={handleGenerate} size="lg" className="w-full"><Wand2 size={18} /> Generate Timetable</Button>
              </Card>
            </div>
          </motion.div>
        )}

        {generateState === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="flex flex-col items-center justify-center py-24">
              <div className="relative w-24 h-24 mb-8">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="absolute inset-0 border-4 border-slate-100 border-t-[#284A50] rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center"><Sparkles size={28} className="text-[#284A50]" /></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Solving constraints...</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">{progress}% complete</p>
              <div className="w-full max-w-md bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#284A50] rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </Card>
          </motion.div>
        )}

        {generateState === 'success' && gridData && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TimetableGrid gridData={gridData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartTimetable;
