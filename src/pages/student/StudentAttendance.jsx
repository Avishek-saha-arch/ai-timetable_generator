import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const subjects = [
  { name: 'Mathematics', pct: 95 }, { name: 'Physics', pct: 88 }, { name: 'English', pct: 92 }, { name: 'Computer Science', pct: 90 },
];

const StudentAttendance = () => (
  <div className="space-y-6">
    <PageHeader title="My Attendance" description="Detailed view of your class presence." />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="flex flex-col items-center justify-center text-center py-10">
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="92, 100" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold text-slate-900">92%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Overall</span>
          </div>
        </div>
        <Badge variant="success">Excellent Standing</Badge>
      </Card>
      <Card className="md:col-span-2">
        <h3 className="font-bold text-slate-900 mb-6">By Subject</h3>
        <div className="space-y-4">
          {subjects.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                <span>{s.name}</span><span>{s.pct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#284A50] rounded-full" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default StudentAttendance;
