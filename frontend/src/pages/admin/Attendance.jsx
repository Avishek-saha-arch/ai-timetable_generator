import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import * as attendanceService from '../../services/attendance.service';

const Attendance = () => {
  const [roster, setRoster] = useState([]);
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchRoster = async () => {
    setLoading(true);
    const data = await attendanceService.getRoster({ classId, date });
    setRoster(data);
    setLoading(false);
  };

  useEffect(() => { fetchRoster(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = (id, status) => {
    setRoster((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleSave = async () => {
    setSaving(true);
    await attendanceService.saveAttendance({ classId, date, records: roster.map((r) => ({ studentId: r.id, status: r.status })) });
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Record and review daily presence across the institution." />
      <Card className="mb-6 bg-slate-50 border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="flex-1 w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 text-slate-700">
            <option value="">Select Class - Subject</option>
            <option value="cs-sem4-math">CS Sem 4 - Advanced Mathematics</option>
            <option value="cs-sem3-ds">CS Sem 3 - Data Structures</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50 text-slate-700" />
          <Button className="w-full sm:w-auto shadow-md" onClick={fetchRoster}>Fetch Roster</Button>
        </div>
      </Card>

      {loading ? (
        <Loader label="Loading roster..." />
      ) : (
        <Card noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roster.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-200" />
                        <span className="font-bold text-slate-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex bg-slate-100 rounded-xl p-1 w-fit border border-slate-200/50">
                        {['Present', 'Absent', 'Late'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setStatus(s.id, opt)}
                            className={`px-4 py-1.5 rounded-[10px] text-xs font-bold transition-colors ${
                              s.status === opt
                                ? opt === 'Present' ? 'bg-white shadow-sm text-emerald-600 border border-slate-200'
                                : opt === 'Absent' ? 'bg-white shadow-sm text-red-600 border border-slate-200'
                                : 'bg-white shadow-sm text-amber-600 border border-slate-200'
                                : 'text-slate-500'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex justify-end">
            <Button size="lg" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Attendance'}</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
