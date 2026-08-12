import React, { useEffect, useState } from 'react';
import { Check, X, Users, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import * as attendanceService from '../../services/attendance.service';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const classOptions = [
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
  ];

  const sectionOptions = [
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
  ];

  useEffect(() => {
    let isSubscribed = true;

    const fetchRoster = async () => {
      if (!selectedClass || !selectedSection) return;

      setLoading(true);
      setFeedback({ type: '', message: '' });

      const classId = `${selectedClass}-${selectedSection}`;

      try {
        const data = await attendanceService.getRoster({
          classId,
          className: selectedClass,
          section: selectedSection,
          date,
        });

        if (isSubscribed) {
          const formatted = (data || []).map((s) => ({
            id: s.id,
            user_id: s.user_id,
            name: s.name,
            roll: s.roll,
            className: s.className,
            section: s.section,
            attendance: s.attendance || 0,
            avatar:
              s.avatar ||
              ' https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            isPresent: s.status ? s.status === 'Present' : true,
          }));
          setStudents(formatted);
        }
      } catch (err) {
        if (isSubscribed) {
          setFeedback({ type: 'error', message: 'Failed to load student roster.' });
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchRoster();

    return () => {
      isSubscribed = false;
    };
  }, [selectedClass, selectedSection, date]);

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const setAllStatus = (isPresent) => {
    setStudents((prev) => prev.map((s) => ({ ...s, isPresent })));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedClass || !selectedSection) {
    setFeedback({
      type: 'error',
      message: 'Please select both class and section before submitting.',
    });
    return;
  }

  setSubmitting(true);
  setFeedback({ type: '', message: '' });

  const classId = `${selectedClass}-${selectedSection}`;

  const records = students.map((s) => ({
    user_id: s.user_id,
    status: s.isPresent ? 'Present' : 'Absent',
  }));

  // console.log('Attendance records:', records);

  try {
    const result = await attendanceService.saveAttendance({
      classId,
      className: selectedClass,
      section: selectedSection,
      date,
      records,
    });

    // console.log('Attendance saved:', result);

    setFeedback({
      type: 'success',
      message: `Attendance saved successfully! Updated ${result.updated || 0} students.`,
    });

  } catch (err) {
    console.error('Attendance save failed:', err);

    setFeedback({
      type: 'error',
      message: err.message || 'Failed to save attendance. Please try again.',
    });

  } finally {
    setSubmitting(false);
  }
};

  const presentCount = students.filter((s) => s.isPresent).length;
  const absentCount = students.length - presentCount;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Select class, section, and date to record or update student presence."
      />

      {/* Control / Filter Card */}
      <Card className="bg-slate-50 border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 tracking-wider">
            <Filter size={14} /> Filter Roster
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Class Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#284A50]/50"
              >
                <option value="">Select Class</option>
                {classOptions.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#284A50]/50"
                disabled={!selectedClass}
              >
                <option value="">Select Section</option>
                {sectionOptions.map((sec) => (
                  <option key={sec.value} value={sec.value}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#284A50]/50"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Roster Body */}
      {!selectedClass || !selectedSection ? (
        <Card className="text-center py-12 border border-dashed border-slate-300 bg-slate-50/50">
          <Users size={40} className="mx-auto text-slate-400 mb-3" />
          <p className="text-slate-600 font-bold text-base">Select Class & Section</p>
          <p className="text-slate-400 text-sm mt-1">
            Choose both a class and a section above to automatically fetch the student list.
          </p>
        </Card>
      ) : loading ? (
        <Loader label="Fetching student roster..." />
      ) : (
        <Card noPadding className="border border-slate-200 overflow-hidden">
          {/* Summary & Quick Bulk Actions Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-slate-600">Total Students: {students.length}</span>
              <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Present: {presentCount}
              </span>
              <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                Absent: {absentCount}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAllStatus(true)}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg transition-colors border border-emerald-200 flex items-center gap-1"
              >
                <Check size={14} /> Mark All Present
              </button>
              <button
                type="button"
                onClick={() => setAllStatus(false)}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg transition-colors border border-red-200 flex items-center gap-1"
              >
                <X size={14} /> Mark All Absent
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5 text-center">Current Status</th>
                  <th className="px-6 py-3.5 text-right">Attendance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      student.isPresent ? 'hover:bg-slate-50/50' : 'bg-red-50/30 hover:bg-red-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-800">{student.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          student.isPresent
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {student.isPresent ? (
                          <>
                            <CheckCircle size={12} /> Present
                          </>
                        ) : (
                          <>
                            <X size={12} /> Absent
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <label className="inline-flex items-center cursor-pointer gap-2 select-none">
                        <input
                          type="checkbox"
                          checked={student.isPresent}
                          onChange={() => toggleAttendance(student.id)}
                          className="w-5 h-5 text-[#284A50] bg-white border-slate-300 rounded focus:ring-[#284A50] focus:ring-2 accent-[#284A50] cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-slate-600">
                          {student.isPresent ? 'Mark Absent' : 'Mark Present'}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feedback Status */}
          {feedback.message && (
            <div
              className={`p-4 border-t flex items-center gap-2 text-sm font-semibold ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              {feedback.message}
            </div>
          )}

          {/* Save Action */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex justify-end">
            <Button size="lg" onClick={handleSubmit} disabled={submitting || students.length === 0}>
              {submitting ? 'Saving to Database...' : 'Submit Attendance'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Attendance;