import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/common/SearchBar';
import * as studentsService from '../../services/students.service';

const emptyForm = { name: '', className: '', section: '', roll: '', attendance: '' };

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async() => {
      try {
        setLoading(true);

        const data = await studentsService.getStudents();

        console.log("Students received:", data);

        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {load();}, []);

  const filtered = useMemo(() => {
  const search = query.toLowerCase();

  return (Array.isArray(students) ? students : []).filter((s) => {
    const name = String(s.name || '').toLowerCase();
    const id = String(s.id || '').toLowerCase();

    return (
      name.includes(search) ||
      id.includes(search)
    );
  });
}, [students, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditing(student);
    setForm({ name: student.name, className: student.className, section: student.section, attendance: student.attendance });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (editing) {
      await studentsService.updateStudent(editing.id, form);
    } else {
      await studentsService.createStudent(form);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    await studentsService.deleteStudent(id);
    load();
  };

  return (
    <div className="space-y-6">
      {/* RAJIB i am removing this button because we dont have any use of this button cause we will add students from database directly */}
      {/* <PageHeader
        title="Student Management"
        description="View, add, and manage student records across your institution."
        action={<Button onClick={openCreate}><Plus size={18} /> Add Student</Button>}
      /> */}

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name or ID..." className="flex-1" />
      </div>

      {loading ? (
        <Loader label="Loading students..." />
      ) : (
        <Card noPadding className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Section</th>
                <th className="px-6 py-4">Roll</th>
                <th className="px-6 py-4">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-slate-800">{s.name}</p>
                        <p className="text-xs font-semibold text-slate-400">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{s.className}</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{s.section}</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{s.roll}</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{s.attendance}%</td>
                  
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400">
                    <GraduationCap size={40} className="mx-auto mb-3 opacity-30" />
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Student' : 'Add Student'}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Student'}</Button>
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
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Grade (e.g. 10th)"
              value={form.className}
              onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))}
            />
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Section"
              value={form.section}
              onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Attendance %"
              value={form.attendance}
              onChange={(e) => setForm((f) => ({ ...f, attendance: e.target.value }))}
            />
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Roll Number"
              value={form.roll}
              onChange={(e) =>
                setForm((f) => ({ ...f, roll: e.target.value }))
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentManagement;
