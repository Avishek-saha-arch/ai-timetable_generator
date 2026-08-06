import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Printer } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const performanceData = [
  { name: 'CS Sem 3', avg: 78 }, { name: 'CS Sem 4', avg: 82 }, { name: 'IT Sem 5', avg: 75 }, { name: 'Physics', avg: 88 },
];

const Reports = () => (
  <div className="space-y-6">
    <PageHeader
      title="Reports & Analytics"
      description="Institution-wide performance and operational reports."
      action={
        <div className="flex gap-3">
          <Button variant="outline"><Printer size={18} /> Print</Button>
          <Button><Download size={18} /> Export CSV</Button>
        </div>
      }
    />
    <Card>
      <h3 className="font-bold text-slate-900 mb-6">Academic Performance by Class</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="avg" fill="#284A50" radius={[6, 6, 0, 0]} barSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
    <Card className="text-sm text-slate-500 font-medium">
      Connect this page to a <code className="px-1.5 py-0.5 bg-slate-100 rounded">GET /reports/*</code> set of backend endpoints to replace this demo chart with live institution data (attendance, fee collection, exam results, faculty workload).
    </Card>
  </div>
);

export default Reports;
