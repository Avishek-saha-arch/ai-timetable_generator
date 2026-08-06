import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';

const data = [
  { name: 'Sec A', avg: 84 }, { name: 'Sec B', avg: 79 }, { name: 'Lab', avg: 88 },
];

const TeacherPerformance = () => (
  <div className="space-y-6">
    <PageHeader title="Class Performance" description="Compare performance across your sections." />
    <Card>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="avg" fill="#284A50" radius={[6, 6, 0, 0]} barSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

export default TeacherPerformance;
