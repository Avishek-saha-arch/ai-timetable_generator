import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/common/SearchBar';
import * as teachersService from '../../services/teachers.service';

const emptyForm = { name: '', department: '', classes: '', workload: '' };

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    teachersService.getTeachers().then((data) => {
      setTeachers(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const filtered = useMemo(
    () => teachers.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.department.toLowerCase().includes(query.toLowerCase())),
    [teachers, query]
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (teacher) => {
    setEditing(teacher);
    setForm({ name: teacher.name, department: teacher.department, classes: teacher.classes, workload: teacher.workload });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (editing) {
      await teachersService.updateTeacher(editing.id, form);
    } else {
      await teachersService.createTeacher(form);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    await teachersService.deleteTeacher(id);
    load();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Management"
        description="Manage faculty records, departments, and workload."
        action={<Button onClick={openCreate}><Plus size={18} /> Add Teacher</Button>}
      />

      <SearchBar value={query} onChange={setQuery} placeholder="Search by name or department..." />

      {loading ? (
        <Loader label="Loading faculty..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <Card key={t.id} hover className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                <Badge variant={t.status === 'Overloaded' ? 'warning' : 'success'}>{t.status}</Badge>
              </div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight">{t.name}</h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">{t.department}</p>
              <div className="flex items-center justify-between mt-4 text-xs font-bold text-slate-600">
                <span>{t.classes} Classes</span>
                <span>{t.workload}% Workload</span>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(t)}><Edit2 size={14} /> Edit</Button>
                <Button variant="danger" size="sm" className="flex-1" onClick={() => handleDelete(t.id)}><Trash2 size={14} /> Remove</Button>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card className="col-span-full text-center py-16 text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              No teachers found.
            </Card>
          )}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Teacher' : 'Add Teacher'}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Teacher'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Number of Classes"
              value={form.classes}
              onChange={(e) => setForm((f) => ({ ...f, classes: e.target.value }))}
            />
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Workload %"
              value={form.workload}
              onChange={(e) => setForm((f) => ({ ...f, workload: e.target.value }))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherManagement;
