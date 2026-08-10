import React from 'react';
import { BookOpen, Target, CheckSquare, Activity, MapPin, Bell, CheckCircle2, Folder, Sparkles } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';

const StudentDashboardHome = () => {
  const { currentUser, isInitializing } = useAppStore();

  const displayName = currentUser?.name || 'Student';

  const stats = [
    { title: "Today's Classes", value: '4', sub: 'Next: Physics at 11:00 AM', icon: BookOpen, c: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Upcoming Exams', value: '2', sub: 'Mid-terms in 14 days', icon: Target, c: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Pending Tasks', value: '3', sub: '2 High Priority', icon: CheckSquare, c: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Overall Attendance', value: '92%', sub: '+2% from last month', icon: Activity, c: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const schedule = [
    { time: '09:00 AM', subject: 'Advanced Mathematics', type: 'Lecture', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Physics', type: 'Lecture', room: 'Room 204', active: true },
    { time: '01:00 PM', subject: 'Lunch Break', type: 'Break', room: 'Cafeteria' },
    { time: '02:00 PM', subject: 'Computer Science', type: 'Lab', room: 'Lab 3' },
  ];

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#284A50] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Good Morning, ${displayName}`} 
        description="Here is your academic overview for today." 
      />

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
        <Card className="xl:col-span-2 flex flex-col">
          <h3 className="font-bold text-lg text-slate-900 mb-6">Today's Schedule</h3>
          <div className="flex-1 space-y-4">
            {schedule.map((s, i) => (
              <div key={i} className={`flex items-stretch gap-4 p-4 rounded-[16px] border ${s.active ? 'border-[#284A50] bg-[#284A50]/5 shadow-sm' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="w-20 shrink-0 text-sm font-bold text-slate-500 flex items-center">{s.time}</div>
                <div className={`w-1 rounded-full ${s.active ? 'bg-[#284A50]' : 'bg-slate-200'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-bold ${s.active ? 'text-[#284A50]' : 'text-slate-800'}`}>{s.subject}</h4>
                    <Badge variant={s.type === 'Break' ? 'default' : s.active ? 'primary' : 'default'} className="!text-[10px]">{s.type}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {s.room}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#284A50] to-[#122225] text-white border-0 overflow-hidden relative shadow-lg shadow-[#284A50]/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <h3 className="font-bold flex items-center gap-2 mb-2 relative z-10 text-sm uppercase tracking-wider text-teal-100">
              <Sparkles className="text-amber-300" size={16} /> AI Study Suggestion
            </h3>
            <p className="text-teal-50 text-sm font-medium leading-relaxed mb-6 mt-4">
              Your Physics mid-term is approaching. We suggest reviewing Chapter 4 today for 45 minutes to maintain your A- grade trajectory.
            </p>
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">Add to Planner</Button>
          </Card>

          <Card>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Bell size={18} className="text-slate-400" /> Recent Updates</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 mt-0.5"><CheckCircle2 size={14} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Assignment Graded</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Math Assignment 3 - Score: 95/100</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600 mt-0.5"><Folder size={14} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">New Resources Uploaded</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Prof. Smith added 3 files for Physics</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;