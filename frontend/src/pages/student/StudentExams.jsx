import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const StudentExams = () => (
  <div className="space-y-6">
    <PageHeader title="Examinations" description="Upcoming exams and past results." />
    <Card>
      <h3 className="font-bold text-lg text-slate-900 mb-4">Upcoming Schedule</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-[16px] bg-red-50 border border-red-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-red-600 border border-red-200">
              <span className="text-[10px] font-bold uppercase leading-none">Nov</span>
              <span className="text-lg font-extrabold leading-none mt-0.5">12</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Physics Mid-Term Exam</h4>
              <p className="text-sm font-medium text-slate-600">Room 204 • 09:00 AM - 11:00 AM</p>
            </div>
          </div>
          <Badge variant="error" className="hidden sm:block">In 14 Days</Badge>
        </div>
      </div>
    </Card>
    <Card>
      <h3 className="font-bold text-lg text-slate-900 mb-4">Past Results</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
            <tr><th className="py-3">Subject</th><th className="py-3">Score</th><th className="py-3">Grade</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="py-3 font-semibold">Mathematics</td><td className="py-3 font-semibold">95/100</td><td className="py-3"><Badge variant="success">A+</Badge></td></tr>
            <tr><td className="py-3 font-semibold">Physics</td><td className="py-3 font-semibold">88/100</td><td className="py-3"><Badge variant="success">A</Badge></td></tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export default StudentExams;
