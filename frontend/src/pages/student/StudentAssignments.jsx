import React, { useState } from 'react';
import { Clock, UploadCloud } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const assignments = [
  { sub: 'Calculus', title: 'Chapter 4 Problem Set', due: 'Tomorrow, 11:59 PM', status: 'Pending', priority: 'High' },
  { sub: 'Physics', title: 'Lab Report 3', due: 'Oct 15, 2026', status: 'Pending', priority: 'Medium' },
  { sub: 'English Lit', title: 'Essay Draft', due: 'Oct 20, 2026', status: 'Pending', priority: 'Medium' },
  { sub: 'History', title: 'World War II Timeline', due: 'Submitted', status: 'Graded', priority: 'Low' },
];

const StudentAssignments = () => {
  const [filter, setFilter] = useState('all');
  const filtered = assignments.filter((a) => filter === 'all' || (filter === 'pending' ? a.status === 'Pending' : a.status !== 'Pending'));

  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" description="Track and submit your coursework." />
      <div className="flex gap-4 mb-6">
        <Badge variant={filter === 'all' ? 'primary' : 'default'} className="px-4 py-1.5 text-sm cursor-pointer" onClick={() => setFilter('all')}>All ({assignments.length})</Badge>
        <Badge variant={filter === 'pending' ? 'primary' : 'default'} className="px-4 py-1.5 text-sm cursor-pointer" onClick={() => setFilter('pending')}>Pending ({assignments.filter((a) => a.status === 'Pending').length})</Badge>
        <Badge variant={filter === 'submitted' ? 'primary' : 'default'} className="px-4 py-1.5 text-sm cursor-pointer" onClick={() => setFilter('submitted')}>Submitted ({assignments.filter((a) => a.status !== 'Pending').length})</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((a, i) => (
          <Card key={i} hover className="flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#284A50] uppercase tracking-wider">{a.sub}</span>
              <Badge variant={a.status === 'Pending' ? (a.priority === 'High' ? 'error' : 'warning') : 'success'}>{a.status}</Badge>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{a.title}</h3>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-6"><Clock size={14} /> {a.due}</div>
            <div className="mt-auto pt-4 border-t border-slate-100">
              {a.status === 'Pending' ? (
                <Button className="w-full" variant="outline"><UploadCloud size={16} /> Upload Submission</Button>
              ) : (
                <Button className="w-full" variant="ghost">View Grade</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignments;
