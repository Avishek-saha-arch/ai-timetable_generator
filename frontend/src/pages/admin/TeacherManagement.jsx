// import React, { useEffect, useMemo, useState } from 'react';
// import { Plus, Edit2, Trash2, Users } from 'lucide-react';
// import PageHeader from '../../components/ui/PageHeader';
// import Card from '../../components/ui/Card';
// import Button from '../../components/ui/Button';
// import Badge from '../../components/ui/Badge';
// import Loader from '../../components/ui/Loader';
// import Modal from '../../components/ui/Modal';
// import SearchBar from '../../components/common/SearchBar';
// import * as teachersService from '../../services/teachers.service';

// const emptyForm = { name: '', department: '', classes: '', workload: '' };

// const TeacherManagement = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState(emptyForm);

//   const load = () => {
//     setLoading(true);
//     teachersService.getTeachers().then((data) => {
//       setTeachers(data);
//       setLoading(false);
//     });
//   };

//   useEffect(load, []);

//   const filtered = useMemo(
//     () => teachers.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.department.toLowerCase().includes(query.toLowerCase())),
//     [teachers, query]
//   );

//   const openCreate = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     setModalOpen(true);
//   };

//   const openEdit = (teacher) => {
//     setEditing(teacher);
//     setForm({ name: teacher.name, department: teacher.department, classes: teacher.classes, workload: teacher.workload });
//     setModalOpen(true);
//   };

//   const handleSave = async () => {
//     if (editing) {
//       await teachersService.updateTeacher(editing.id, form);
//     } else {
//       await teachersService.createTeacher(form);
//     }
//     setModalOpen(false);
//     load();
//   };

//   const handleDelete = async (id) => {
//     await teachersService.deleteTeacher(id);
//     load();
//   };

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Teacher Management"
//         description="Manage faculty records, departments, and workload."
//         action={<Button onClick={openCreate}><Plus size={18} /> Add Teacher</Button>}
//       />

//       <SearchBar value={query} onChange={setQuery} placeholder="Search by name or department..." />

//       {loading ? (
//         <Loader label="Loading faculty..." />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((t) => (
//             <Card key={t.id} hover className="flex flex-col">
//               <div className="flex justify-between items-start mb-4">
//                 <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
//                 <Badge variant={t.status === 'Overloaded' ? 'warning' : 'success'}>{t.status}</Badge>
//               </div>
//               <h3 className="font-bold text-lg text-slate-900 leading-tight">{t.name}</h3>
//               <p className="text-sm font-semibold text-slate-500 mt-1">{t.department}</p>
//               <div className="flex items-center justify-between mt-4 text-xs font-bold text-slate-600">
//                 <span>{t.classes} Classes</span>
//                 <span>{t.workload}% Workload</span>
//               </div>
//               <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
//                 <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(t)}><Edit2 size={14} /> Edit</Button>
//                 <Button variant="danger" size="sm" className="flex-1" onClick={() => handleDelete(t.id)}><Trash2 size={14} /> Remove</Button>
//               </div>
//             </Card>
//           ))}
//           {filtered.length === 0 && (
//             <Card className="col-span-full text-center py-16 text-slate-400">
//               <Users size={40} className="mx-auto mb-3 opacity-30" />
//               No teachers found.
//             </Card>
//           )}
//         </div>
//       )}

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={editing ? 'Edit Teacher' : 'Add Teacher'}
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
//             <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Teacher'}</Button>
//           </>
//         }
//       >
//         <div className="space-y-4">
//           <input
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//           />
//           <input
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
//             placeholder="Department"
//             value={form.department}
//             onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
//               placeholder="Number of Classes"
//               value={form.classes}
//               onChange={(e) => setForm((f) => ({ ...f, classes: e.target.value }))}
//             />
//             <input
//               className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
//               placeholder="Workload %"
//               value={form.workload}
//               onChange={(e) => setForm((f) => ({ ...f, workload: e.target.value }))}
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default TeacherManagement;
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, Users, BookOpen, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/common/SearchBar';
import * as teachersService from '../../services/teachers.service';

const emptyForm = { name: '', department: '', classes: '', workload: '', avatar: '', present: 85, absent: 15 };

// Catchy color palette for Present vs Absent pie chart
const PIE_COLORS = ['#10B981', '#EF4444']; // Green for Present, Red for Absent

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    teachersService.getTeachers().then((data) => {
      // Ensure each teacher has mock attendance data if not provided by backend
      const enhancedData = data.map((t) => ({
        ...t,
        present: t.present ?? Math.floor(Math.random() * 20) + 75,
        absent: t.absent ?? Math.floor(Math.random() * 15) + 5,
      }));
      setTeachers(enhancedData);
      setLoading(false);
    });
  };

  useEffect(load, []);

  // Extract unique departments for the dropdown filter
  const departmentsList = useMemo(() => {
    const depts = teachers.map((t) => t.department || 'General');
    return ['ALL', ...new Set(depts)];
  }, [teachers]);

  // Filter teachers by search query and department dropdown filter
  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.department.toLowerCase().includes(query.toLowerCase());
      const matchesDept = selectedDeptFilter === 'ALL' || t.department === selectedDeptFilter;
      return matchesSearch && matchesDept;
    });
  }, [teachers, query, selectedDeptFilter]);

  // Calculate overall attendance averages for the top summary chart
  const overallAttendanceData = useMemo(() => {
    if (teachers.length === 0) return [{ name: 'Present', value: 0 }, { name: 'Absent', value: 0 }];
    const totalPresent = teachers.reduce((acc, t) => acc + (Number(t.present) || 0), 0);
    const totalAbsent = teachers.reduce((acc, t) => acc + (Number(t.absent) || 0), 0);
    const avgPresent = Math.round(totalPresent / teachers.length);
    const avgAbsent = Math.round(totalAbsent / teachers.length);
    return [
      { name: 'Present', value: avgPresent },
      { name: 'Absent', value: avgAbsent },
    ];
  }, [teachers]);

  // Group filtered teachers by department
  const groupedByDepartment = useMemo(() => {
    return filtered.reduce((acc, teacher) => {
      const dept = teacher.department || 'General';
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(teacher);
      return acc;
    }, {});
  }, [filtered]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (teacher) => {
    setEditing(teacher);
    setForm({
      name: teacher.name,
      department: teacher.department,
      classes: teacher.classes,
      workload: teacher.workload,
      avatar: teacher.avatar || '',
      present: teacher.present ?? 85,
      absent: teacher.absent ?? 15,
    });
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
        description="Manage faculty records, departments, attendance, and workload."
        action={<Button onClick={openCreate}><Plus size={18} /> Add Teacher</Button>}
      />

      {/* Top Section: Filters & Overall Attendance Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filter Controls Card */}
        <Card className="lg:col-span-2 flex flex-col justify-between space-y-4 bg-slate-50 border border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Faculty Filters & Search</h3>
            <p className="text-xs text-slate-500">Quickly locate faculty by name or filter down by academic department.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[220px]">
              <SearchBar value={query} onChange={setQuery} placeholder="Search by name or department..." />
            </div>

            {/* Department Dropdown Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Dept:</label>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#284A50]"
              >
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'ALL' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Overall Teacher Attendance Pie Chart Card */}
        <Card className="flex flex-col items-center justify-center p-4 border border-slate-200 shadow-sm">
          <div className="w-full flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <PieIcon size={14} className="text-[#284A50]" /> Overall Attendance
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
              Institution
            </span>
          </div>
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallAttendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={24}
                  outerRadius={40}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {overallAttendanceData.map((_, idx) => (
                    <Cell key={`overall-cell-${idx}`} fill={PIE_COLORS[idx]} stroke="#fff" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 600 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {loading ? (
        <Loader label="Loading faculty..." />
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedByDepartment).length > 0 ? (
            Object.keys(groupedByDepartment).map((dept) => (
              <div key={dept} className="space-y-4">
                {/* Department Header */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <BookOpen size={20} className="text-[#284A50]" />
                  <h2 className="text-lg font-bold text-slate-900">{dept}</h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                    {groupedByDepartment[dept].length} Faculty
                  </span>
                </div>

                {/* Compact Cards with Individual Pie Chart inside */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {groupedByDepartment[dept].map((t) => {
                    const attendanceData = [
                      { name: 'Present', value: Number(t.present) || 85 },
                      { name: 'Absent', value: Number(t.absent) || 15 },
                    ];

                    return (
                      <Card key={t.id} hover className="flex flex-col p-4 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <img
                            src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                            alt={t.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                          <Badge variant={t.status === 'Overloaded' ? 'warning' : 'success'} className="text-[10px] px-2 py-0.5">
                            {t.status || 'Active'}
                          </Badge>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 leading-snug truncate">{t.name}</h3>
                        <p className="text-xs font-medium text-slate-500 mb-2">{t.department}</p>

                        {/* Individual Attendance Pie Chart */}
                        <div className="h-32 w-full my-1 relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={attendanceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={28}
                                outerRadius={46}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {attendanceData.map((_, idx) => (
                                  <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx]} stroke="#fff" strokeWidth={1} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-bold text-slate-600">Attendance</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mt-2 pt-2 border-t border-slate-100">
                          <span>{t.classes} Classes</span>
                          <span className="text-emerald-600">P: {t.present}% | A: {t.absent}%</span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 py-1 text-xs" onClick={() => openEdit(t)}>
                            <Edit2 size={12} /> Edit
                          </Button>
                          <Button variant="danger" size="sm" className="flex-1 py-1 text-xs" onClick={() => handleDelete(t.id)}>
                            <Trash2 size={12} /> Del
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <Card className="col-span-full text-center py-16 text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              No teachers found matching your filter.
            </Card>
          )}
        </div>
      )}

      {/* Add / Edit Teacher Modal */}
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
            placeholder="Department (e.g. Computer Science)"
            value={form.department}
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
          />
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
            placeholder="Avatar Image URL (optional)"
            value={form.avatar}
            onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Present %"
              value={form.present}
              onChange={(e) => setForm((f) => ({ ...f, present: e.target.value }))}
            />
            <input
              type="number"
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
              placeholder="Absent %"
              value={form.absent}
              onChange={(e) => setForm((f) => ({ ...f, absent: e.target.value }))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherManagement;