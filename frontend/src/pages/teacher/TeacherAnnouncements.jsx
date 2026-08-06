import React, { useState } from 'react';
import { Send, Megaphone } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initial = [
  { title: 'Mid-term exam schedule released', time: '2 hours ago', class: 'All Sections' },
  { title: 'Lab safety briefing tomorrow', time: '1 day ago', class: 'Chemistry Lab' },
];

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(initial);
  const [text, setText] = useState('');

  const handlePost = () => {
    if (!text.trim()) return;
    setAnnouncements((prev) => [{ title: text, time: 'Just now', class: 'All Sections' }, ...prev]);
    setText('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Post updates to your students." />
      <Card>
        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write an announcement..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
          />
          <Button onClick={handlePost}><Send size={16} /> Post</Button>
        </div>
      </Card>
      <div className="space-y-4">
        {announcements.map((a, i) => (
          <Card key={i} className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#284A50]/10 text-[#284A50] shrink-0"><Megaphone size={18} /></div>
            <div>
              <h4 className="font-bold text-slate-900">{a.title}</h4>
              <p className="text-xs font-semibold text-slate-500 mt-1">{a.class} • {a.time}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherAnnouncements;
