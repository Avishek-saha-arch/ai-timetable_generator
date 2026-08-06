import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import * as studentsService from '../../services/students.service';
import * as teachersService from '../../services/teachers.service';

const attendanceTrend = [
  { day: 'Mon', rate: 92 }, { day: 'Tue', rate: 89 }, { day: 'Wed', rate: 94 },
  { day: 'Thu', rate: 91 }, { day: 'Fri', rate: 96 },
];

const statusPie = [
  { name: 'Active', value: 82, color: '#10B981' },
  { name: 'Warning', value: 18, color: '#F59E0B' },
];

const DashboardOverview = () => {
  const [studentCount, setStudentCount] = useState(null);
  const [teacherCount, setTeacherCount] = useState(null);

  useEffect(() => {
    studentsService.getStudents().then((s) => setStudentCount(s.length));
    teachersService.getTeachers().then((t) => setTeacherCount(t.length));
  }, []);

  const stats = [
    { title: 'Total Students', value: studentCount ?? '—', sub: 'Across all grades', icon: GraduationCap, c: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Faculty', value: teacherCount ?? '—', sub: 'Active this term', icon: Users, c: 'text-[#284A50]', bg: 'bg-[#284A50]/10' },
    { title: 'Avg. Attendance', value: '92%', sub: '+2% from last month', icon: Activity, c: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Open Alerts', value: '3', sub: '1 needs urgent action', icon: AlertTriangle, c: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Institution Overview" description="A live snapshot of your school's health." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} hover className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.c}`}><stat.icon size={18} /></div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.title}</p>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-xs font-semibold text-slate-500">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><TrendingUp size={18} className="text-[#284A50]" /> Weekly Attendance Trend</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="rate" stroke="#284A50" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-lg text-slate-900 mb-6">Student Standing</h3>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusPie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {statusPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {statusPie.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} /> {s.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-lg text-slate-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <div>
              <p className="font-bold text-slate-800 text-sm">Teacher Sarah absent today</p>
              <p className="text-xs text-slate-500 font-medium">Substitute required for Room 302</p>
            </div>
            <Badge variant="warning">Action Needed</Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div>
              <p className="font-bold text-slate-800 text-sm">AI Document analysis complete</p>
              <p className="text-xs text-slate-500 font-medium">15 admission forms digitized</p>
            </div>
            <Badge variant="success">Done</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
