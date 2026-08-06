import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const classes = [
  { name: 'Physics - Section A', students: 32, avg: '84%' },
  { name: 'Physics - Section B', students: 28, avg: '79%' },
  { name: 'Chemistry Lab', students: 24, avg: '88%' },
];

const TeacherClasses = () => (
  <div className="space-y-6">
    <PageHeader title="My Classes" description="Manage rosters and view class performance." />
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {classes.map((c, i) => (
        <Card key={i} hover className="cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[#284A50]/10 text-[#284A50]"><Users size={20} /></div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-[#284A50] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">{c.name}</h3>
          <p className="text-sm font-semibold text-slate-500 mb-4">{c.students} Students</p>
          <Badge variant="primary">Avg Score: {c.avg}</Badge>
        </Card>
      ))}
    </div>
  </div>
);

export default TeacherClasses;
