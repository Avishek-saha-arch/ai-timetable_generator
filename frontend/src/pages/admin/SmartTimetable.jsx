import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Wand2, BookOpen, Clock, Download, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import * as timetableService from '../../services/timetable.service';

const REQUIRED_TOTAL_HOURS = 30;

const SCHOOL_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Social Studies',
  'History',
  'Geography',
  'Art & Design',
  'Physical Education',
  'Education',
  'Philosophy',
  'Economics',
  'Psychology',
];

const SmartTimetable = () => {
  const [generateState, setGenerateState] = useState('config'); // 'config' | 'generating' | 'success'
  const [progress, setProgress] = useState(0);
  const [gridData, setGridData] = useState(null);
  const pollIntervalRef = useRef(null);

  // General Configuration
  const [config, setConfig] = useState({
    className: '',
    section: '',
    numPeriods: 6,
    periodDuration: 45,
  });

  // Dynamic Row Structure for Subjects
  const [subjects, setSubjects] = useState([
    {
      id: 'free_period_row',
      name: 'Free Period / Self Study',
      teachers: ['N/A'],
      hours: 0,
      isCompulsory: true,
      isCustom: false,
    },
    {
      id: Date.now().toString(),
      name: '',
      customName: '',
      teachers: [''],
      hours: 0,
      isCompulsory: false,
      isCustom: false,
    },
  ]);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Calculate current total allocated hours
  const totalHours = subjects.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  const isValidHours = totalHours === REQUIRED_TOTAL_HOURS;

  // Handle adding new subject row
  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: '',
        customName: '',
        teachers: [''],
        hours: 0,
        isCompulsory: false,
        isCustom: false,
      },
    ]);
  };

  // Handle deleting subject row
  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id || s.isCompulsory));
  };

  // Handle subject select or hours change
  const handleSubjectChange = (id, field, value) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === id) {
          if (field === 'name') {
            const isCustomSelected = value === 'OTHER_CUSTOM';
            return {
              ...s,
              name: value,
              isCustom: isCustomSelected,
              customName: isCustomSelected ? s.customName : '',
            };
          }
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  };

  // Handle teacher list updates (Up to 3 teachers per subject)
  const handleTeacherChange = (subjectId, teacherIndex, value) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === subjectId) {
          const updatedTeachers = [...s.teachers];
          updatedTeachers[teacherIndex] = value;
          return { ...s, teachers: updatedTeachers };
        }
        return s;
      })
    );
  };

  const handleAddTeacher = (subjectId) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === subjectId && s.teachers.length < 3) {
          return { ...s, teachers: [...s.teachers, ''] };
        }
        return s;
      })
    );
  };

  const handleRemoveTeacher = (subjectId, teacherIndex) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === subjectId && s.teachers.length > 1) {
          const updatedTeachers = s.teachers.filter((_, idx) => idx !== teacherIndex);
          return { ...s, teachers: updatedTeachers };
        }
        return s;
      })
    );
  };

  // Trigger Timetable Generation
  const handleGenerate = async () => {
    if (!isValidHours) return;

    setGenerateState('generating');
    setProgress(5);

    try {
      // Format subjects payload
      const formattedSubjects = subjects.map((s) => ({
        ...s,
        name: s.isCustom ? s.customName : s.name,
      }));

      const payload = {
        ...config,
        subjects: formattedSubjects,
      };

      const response = await timetableService.generateTimetable(payload);
      const jobId = response.jobId || response.id || response.data?.jobId;

      if (!jobId) {
        throw new Error('Backend did not return a valid jobId');
      }

      // Clear any pre-existing polling
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

      // Start polling status
      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusRes = await timetableService.getGenerationStatus(jobId);
          console.log('Poll Status Response:', statusRes); // Debugging log

          if (statusRes.progress !== undefined) {
            setProgress(statusRes.progress);
          }

          if (statusRes.status === 'done' || statusRes.status === 'completed') {
            clearInterval(pollIntervalRef.current);
            
            const finalResult = statusRes.result || statusRes.data || statusRes;
            setGridData(finalResult);
            setGenerateState('success');
          } else if (statusRes.status === 'failed' || statusRes.status === 'error') {
            clearInterval(pollIntervalRef.current);
            alert(`Generation failed: ${statusRes.error || 'Unknown solver error'}`);
            setGenerateState('config');
          }
        } catch (pollErr) {
          console.error('Polling Status Error:', pollErr);
          clearInterval(pollIntervalRef.current);
          setGenerateState('config');
        }
      }, 500);

    } catch (err) {
      console.error('Generation Initiation Error:', err);
      alert('Failed to initiate timetable generation. Please check backend connections.');
      setGenerateState('config');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-gradient-to-br from-[#284A50] to-[#52A8AD] rounded-xl shadow-lg shadow-[#284A50]/30">
              <Sparkles className="text-white" size={24} />
            </div>
            {generateState === 'config' ? 'Smart Timetable Configuration' : 'Smart Timetable Pro'}
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            {generateState === 'config'
              ? 'Specify class preferences, subjects, faculty constraints, and hours before launching the solver.'
              : 'AI constraint solver generating zero-conflict class schedule.'}
          </p>
        </div>
        {generateState === 'success' && (
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              <Download size={18} /> Export
            </Button>
            <Button onClick={() => setGenerateState('config')} size="lg" className="px-8 shadow-xl">
              <Wand2 size={20} /> Reconfigure
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {generateState === 'config' && (
          <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* Class Settings */}
            <Card>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-[#284A50]" /> Class & Slot Configuration
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Class / Grade</label>
                  <input
                    type="text"
                    placeholder="e.g. Grade 10"
                    value={config.className}
                    onChange={(e) => setConfig({ ...config, className: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Section</label>
                  <input
                    type="text"
                    placeholder="e.g. Section A"
                    value={config.section}
                    onChange={(e) => setConfig({ ...config, section: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">No. of Daily Periods</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={config.numPeriods}
                    onChange={(e) => setConfig({ ...config, numPeriods: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Period Duration (Mins)</label>
                  <input
                    type="number"
                    step="5"
                    value={config.periodDuration}
                    onChange={(e) => setConfig({ ...config, periodDuration: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
                  />
                </div>
              </div>
            </Card>

            {/* Subject, Faculty & Hours Allocation Table */}
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Clock size={18} className="text-[#284A50]" /> Subject, Teacher & Hours Allocation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Select subjects from dropdown, assign up to 3 faculty members. Total weekly hours must equal 30.</p>
                </div>

                {/* Live Hours Counter */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold ${
                  isValidHours ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  {isValidHours ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>Total Hours: {totalHours} / {REQUIRED_TOTAL_HOURS}</span>
                </div>
              </div>

              {/* Dynamic Rows */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider bg-slate-50">
                      <th className="py-3 px-4 rounded-l-xl">Subject Name</th>
                      <th className="py-3 px-4">Assigned Teachers (Max 3)</th>
                      <th className="py-3 px-4 w-36">Weekly Hours</th>
                      <th className="py-3 px-4 w-16 text-center rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {subjects.map((row) => (
                      <tr key={row.id} className={row.isCompulsory ? 'bg-slate-50/50 font-semibold' : 'hover:bg-slate-50/60'}>
                        
                        {/* Subject Select Dropdown */}
                        <td className="py-3 px-4">
                          {row.isCompulsory ? (
                            <div className="flex items-center gap-2 text-slate-800">
                              <span>{row.name}</span>
                              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">Compulsory</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <select
                                value={row.name}
                                onChange={(e) => handleSubjectChange(row.id, 'name', e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-[#284A50]"
                              >
                                <option value="" disabled>-- Select School Subject --</option>
                                {SCHOOL_SUBJECTS.map((subject, idx) => (
                                  <option key={idx} value={subject}>
                                    {subject}
                                  </option>
                                ))}
                                <option value="OTHER_CUSTOM">+ Other (Custom Subject)</option>
                              </select>

                              {/* Custom Input Field */}
                              {row.isCustom && (
                                <input
                                  type="text"
                                  placeholder="Type custom subject name..."
                                  value={row.customName}
                                  onChange={(e) => handleSubjectChange(row.id, 'customName', e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-[#284A50]"
                                />
                              )}
                            </div>
                          )}
                        </td>

                        {/* Teacher Inputs */}
                        <td className="py-3 px-4">
                          {row.isCompulsory ? (
                            <span className="text-slate-400 text-xs italic">N/A (Unassigned)</span>
                          ) : (
                            <div className="space-y-1.5">
                              {row.teachers.map((teacher, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder={`Teacher ${tIdx + 1} Name`}
                                    value={teacher}
                                    onChange={(e) => handleTeacherChange(row.id, tIdx, e.target.value)}
                                    className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#284A50]"
                                  />
                                  {row.teachers.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveTeacher(row.id, tIdx)}
                                      className="text-slate-400 hover:text-red-500 text-xs"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              ))}
                              {row.teachers.length < 3 && (
                                <button
                                  type="button"
                                  onClick={() => handleAddTeacher(row.id)}
                                  className="text-[11px] text-[#284A50] font-bold hover:underline flex items-center gap-1 mt-1"
                                >
                                  + Add Teacher
                                </button>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Hours Input */}
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={row.hours}
                            onChange={(e) => handleSubjectChange(row.id, 'hours', parseInt(e.target.value) || 0)}
                            className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-[#284A50]"
                          />
                        </td>

                        {/* Action Column */}
                        <td className="py-3 px-4 text-center">
                          {!row.isCompulsory && (
                            <button
                              type="button"
                              onClick={() => handleRemoveSubject(row.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Subject Row */}
              <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-4">
                <Button variant="outline" size="sm" onClick={handleAddSubject} className="gap-2">
                  <Plus size={16} /> Add Subject Row
                </Button>

                {!isValidHours && (
                  <p className="text-xs text-amber-600 font-semibold">
                    * Adjust hours so the total equals exactly 30 to enable generation.
                  </p>
                )}
              </div>
            </Card>

            {/* Launch Action */}
            <Card className="bg-gradient-to-br from-[#284A50]/5 to-white border-[#284A50]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">Ready to Generate?</h3>
                <p className="text-xs text-slate-500">The AI solver will assign rooms, teachers, and periods without overlap.</p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={!isValidHours}
                size="lg"
                className="w-full sm:w-auto px-8 shadow-lg disabled:opacity-50"
              >
                <Wand2 size={18} /> Generate Timetable
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Processing State */}
        {generateState === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="flex flex-col items-center justify-center py-24">
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute inset-0 border-4 border-slate-100 border-t-[#284A50] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={28} className="text-[#284A50]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Solving Constraints...</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">{progress}% complete</p>
              <div className="w-full max-w-md bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#284A50] rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Generated Timetable Output */}
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