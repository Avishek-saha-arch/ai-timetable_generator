import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';

const gpaTrend = [
  { term: 'T1', gpa: 3.4 }, { term: 'T2', gpa: 3.6 }, { term: 'T3', gpa: 3.7 }, { term: 'T4', gpa: 3.85 },
];

const StudentPerformance = () => (
  <div className="space-y-6">
    <PageHeader title="My Performance" description="Track your academic progress over time." />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="flex flex-col items-center justify-center text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current GPA</p>
        <h2 className="text-4xl font-extrabold text-[#284A50]">3.85</h2>
        <p className="text-xs font-semibold text-emerald-600 mt-2">+0.15 this term</p>
      </Card>
      <Card className="lg:col-span-2">
        <h3 className="font-bold text-slate-900 mb-6">GPA Trend</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gpaTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
              <YAxis domain={[3, 4]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="gpa" stroke="#284A50" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
);

export default StudentPerformance;
