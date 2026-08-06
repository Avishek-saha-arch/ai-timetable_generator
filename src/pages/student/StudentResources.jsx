import React from 'react';
import { FileText, Video, Link2, Download } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const resources = [
  { title: 'Chapter 4 - Integrals', sub: 'Advanced Mathematics', type: 'PDF', icon: FileText },
  { title: 'Newton\'s Laws Explained', sub: 'Physics', type: 'Video', icon: Video },
  { title: 'Recommended Reading List', sub: 'English Literature', type: 'Link', icon: Link2 },
  { title: 'Lab Safety Guidelines', sub: 'Chemistry', type: 'PDF', icon: FileText },
];

const StudentResources = () => (
  <div className="space-y-6">
    <PageHeader title="Resources" description="Study materials shared by your teachers." />
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resources.map((r, i) => (
        <Card key={i} hover className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#284A50]/10 text-[#284A50] shrink-0"><r.icon size={22} /></div>
          <div className="flex-1 min-w-0">
            <Badge className="mb-2">{r.type}</Badge>
            <h3 className="font-bold text-slate-900 leading-tight truncate">{r.title}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">{r.sub}</p>
            <Button size="sm" variant="outline" className="mt-4"><Download size={14} /> Access</Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default StudentResources;
