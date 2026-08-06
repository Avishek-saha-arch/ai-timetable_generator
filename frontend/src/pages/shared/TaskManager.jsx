import React, { useEffect, useState } from 'react';
import { CalendarDays, Sparkles, PlayCircle, Clock, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import * as tasksService from '../../services/tasks.service';

const priorityVariant = { High: 'error', Medium: 'warning', Low: 'default' };

const Column = ({ title, status, colorClass, tasks, onAdvance }) => {
  const items = tasks.filter((t) => t.status === status);
  const nextStatus = { todo: 'inProgress', inProgress: 'completed', completed: null };
  return (
    <Card noPadding className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex items-center gap-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
        <h3 className="font-bold text-slate-800">{title}</h3>
        <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{items.length}</span>
      </div>
      <div className="p-4 space-y-3 flex-1 min-h-[200px]">
        {items.map((t) => (
          <div key={t.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <Badge variant={priorityVariant[t.priority] || 'default'}>{t.priority}</Badge>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t.type}</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 leading-snug mb-2">{t.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Clock size={12} /> {t.date}</span>
              {nextStatus[t.status] && (
                <button onClick={() => onAdvance(t.id, nextStatus[t.status])} className="text-xs font-bold text-[#284A50] flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  Move <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs font-medium text-slate-400 text-center py-8">No tasks here yet.</p>}
      </div>
    </Card>
  );
};

const TaskManager = () => {
  const [view, setView] = useState('kanban');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tasksService.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const handleAdvance = async (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t))); // optimistic
    await tasksService.updateTaskStatus(id, status);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task & Study Planner"
        description="Organize assignments and let AI optimize your schedule."
        action={
          <div className="flex bg-slate-100 p-1 rounded-[14px]">
            <button onClick={() => setView('kanban')} className={`px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${view === 'kanban' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Kanban</button>
            <button onClick={() => setView('calendar')} className={`px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Calendar</button>
          </div>
        }
      />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          {loading ? (
            <Loader label="Loading tasks..." />
          ) : view === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Column title="To Do" status="todo" colorClass="bg-slate-400" tasks={tasks} onAdvance={handleAdvance} />
              <Column title="In Progress" status="inProgress" colorClass="bg-[#284A50]" tasks={tasks} onAdvance={handleAdvance} />
              <Column title="Completed" status="completed" colorClass="bg-emerald-500" tasks={tasks} onAdvance={handleAdvance} />
            </div>
          ) : (
            <Card className="h-[600px] flex items-center justify-center flex-col text-slate-400">
              <CalendarDays size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-lg">Calendar view configuration...</p>
            </Card>
          )}
        </div>

        <div className="w-full xl:w-80 shrink-0 space-y-6">
          <Card className="bg-gradient-to-b from-[#284A50]/5 to-white border-[#284A50]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={64} className="text-[#284A50]" /></div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 flex items-center gap-2"><Sparkles className="text-[#284A50]" size={18} /> AI Study Planner</h3>
            <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed">Based on your upcoming deadlines, AI suggests the following focus sessions today.</p>
            <div className="space-y-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#284A50]/20 shadow-sm flex items-start gap-3">
                <div className="p-2 bg-[#284A50]/10 text-[#284A50] rounded-lg mt-0.5"><PlayCircle size={16} /></div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Calculus Chap 4</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Suggested: 4:00 PM - 5:30 PM</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3 opacity-70">
                <div className="p-2 bg-slate-100 text-slate-500 rounded-lg mt-0.5"><Clock size={16} /></div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Physics Lab Prep</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Suggested: 6:00 PM - 7:00 PM</p>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6">Start Focus Session</Button>
          </Card>

          <Card>
            <h3 className="font-bold text-slate-900 mb-4">Productivity</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#284A50" strokeWidth="3" strokeDasharray="75, 100" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-slate-900">75%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Efficiency</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-center font-medium text-slate-500">You complete tasks 15% faster this week.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
