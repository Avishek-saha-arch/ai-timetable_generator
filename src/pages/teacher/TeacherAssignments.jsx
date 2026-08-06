import React, { useState } from 'react';
import { Plus, Users, Clock } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const initialAssignments = [
  { title: 'Chapter 4 Problem Set', class: 'Physics - Section A', due: 'Tomorrow', submissions: '18/32' },
  { title: 'Lab Report 3', class: 'Chemistry Lab', due: 'Oct 15', submissions: '10/24' },
];

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    setAssignments((prev) => [{ title, class: 'New Class', due: 'TBD', submissions: '0/0' }, ...prev]);
    setTitle('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" description="Create and track assignments for your classes." action={<Button onClick={() => setModalOpen(true)}><Plus size={18} /> New Assignment</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((a, i) => (
          <Card key={i} hover>
            <div className="flex justify-between items-start mb-3">
              <Badge variant="primary">{a.class}</Badge>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {a.due}</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-4">{a.title}</h3>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5"><Users size={14} /> {a.submissions} Submitted</span>
              <Button size="sm" variant="outline">Review</Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Assignment" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleCreate}>Create</Button></>}>
        <input
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default TeacherAssignments;
