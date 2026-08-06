import React from 'react';
import { Users, ClipboardCheck, Clock, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';

const TeacherDashboardHome = () => {
  const { currentUser } = useAppStore();

  const stats = [
    { title: 'My Classes', value: '5', sub: 'Across 3 sections', icon: Users, c: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pending Grading', value: '12', sub: '3 due this week', icon: ClipboardCheck, c: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Next Class', value: '11:00', sub: 'Physics - Room 204', icon: Clock, c: 'text-[#284A50]', bg: 'bg-[#284A50]/10' },
    { title: 'Avg. Class Score', value: '82%', sub: '+3% from last term', icon: TrendingUp, c: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const schedule = [
    { time: '09:00 AM', subject: 'Physics - Section A', room: 'Room 204', active: false },
    { time: '11:00 AM', subject: 'Physics - Section B', room: 'Room 204', active: true },
    { time: '02:00 PM', subject: 'Chemistry Lab', room: 'Lab 1', active: false },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome back, ${currentUser.name}`} description="Here's what's happening in your classes today." />

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
          <h3 className="font-bold text-lg text-slate-900 mb-6">Today's Classes</h3>
          <div className="space-y-4">
            {schedule.map((s, i) => (
              <div key={i} className={`flex items-stretch gap-4 p-4 rounded-[16px] border ${s.active ? 'border-[#284A50] bg-[#284A50]/5 shadow-sm' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="w-20 shrink-0 text-sm font-bold text-slate-500 flex items-center">{s.time}</div>
                <div className={`w-1 rounded-full ${s.active ? 'bg-[#284A50]' : 'bg-slate-200'}`} />
                <div className="flex-1">
                  <h4 className={`font-bold ${s.active ? 'text-[#284A50]' : 'text-slate-800'}`}>{s.subject}</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {s.room}</p>
                </div>
                {s.active && <Badge variant="primary">Now</Badge>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-[#284A50] to-[#122225] text-white border-0 overflow-hidden relative shadow-lg shadow-[#284A50]/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <h3 className="font-bold flex items-center gap-2 mb-2 relative z-10 text-sm uppercase tracking-wider text-teal-100">
            <Sparkles className="text-amber-300" size={16} /> AI Teaching Assistant
          </h3>
          <p className="text-teal-50 text-sm font-medium leading-relaxed mb-6 mt-4">
            3 students in Section B are trending below average this month. Want a personalized intervention plan?
          </p>
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">View Insights</Button>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardHome;
