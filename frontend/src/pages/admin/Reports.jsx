// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Download, Printer } from 'lucide-react';
// import PageHeader from '../../components/ui/PageHeader';
// import Card from '../../components/ui/Card';
// import Button from '../../components/ui/Button';

// const performanceData = [
//   { name: 'CS Sem 3', avg: 78 }, { name: 'CS Sem 4', avg: 82 }, { name: 'IT Sem 5', avg: 75 }, { name: 'Physics', avg: 88 },
// ];

// const Reports = () => (
//   <div className="space-y-6">
//     <PageHeader
//       title="Reports & Analytics"
//       description="Institution-wide performance and operational reports."
//       action={
//         <div className="flex gap-3">
//           <Button variant="outline"><Printer size={18} /> Print</Button>
//           <Button><Download size={18} /> Export CSV</Button>
//         </div>
//       }
//     />
//     <Card>
//       <h3 className="font-bold text-slate-900 mb-6">Academic Performance by Class</h3>
//       <div className="h-80 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={performanceData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
//             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
//             <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
//             <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
//             <Bar dataKey="avg" fill="#284A50" radius={[6, 6, 0, 0]} barSize={44} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//     <Card className="text-sm text-slate-500 font-medium">
//       Connect this page to a <code className="px-1.5 py-0.5 bg-slate-100 rounded">GET /reports/*</code> set of backend endpoints to replace this demo chart with live institution data (attendance, fee collection, exam results, faculty workload).
//     </Card>
//   </div>
// );

// export default Reports;
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Printer } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Catchy, vibrant color palette for the pie chart segments
const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];

// Helper to generate mock performance breakdown for 4 sections across 8 semesters for any department
const generateDepartmentData = () => {
  const semesters = {};
  for (let sem = 1; sem <= 8; sem++) {
    semesters[`Sem ${sem}`] = [
      { section: 'Section A', data: [{ name: 'Passed', value: 75 + (sem * 2) % 15 }, { name: 'Needs Improvement', value: 25 - (sem * 2) % 15 }] },
      { section: 'Section B', data: [{ name: 'Passed', value: 70 + (sem * 3) % 20 }, { name: 'Needs Improvement', value: 30 - (sem * 3) % 20 }] },
      { section: 'Section C', data: [{ name: 'Passed', value: 80 + (sem * 1) % 10 }, { name: 'Needs Improvement', value: 20 - (sem * 1) % 10 }] },
      { section: 'Section D', data: [{ name: 'Passed', value: 72 + (sem * 4) % 18 }, { name: 'Needs Improvement', value: 28 - (sem * 4) % 18 }] },
    ];
  }
  return semesters;
};

// Full institutional mock dataset (Departments with 8 Semesters, each having 4 Sections)
const hierarchicalData = {
  Computer_Science: generateDepartmentData(),
  Information_Technology: generateDepartmentData(),
  Electronics_Engineering: generateDepartmentData(),
  Mechanical_Engineering: generateDepartmentData(),
};

const Reports = () => {
  const departments = Object.keys(hierarchicalData);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  
  // Available semesters (Sem 1 to Sem 8)
  const availableSemesters = Object.keys(hierarchicalData[selectedDept]);
  const [selectedSem, setSelectedSem] = useState(availableSemesters[0]);

  // Get the 4 sections data for the selected Department and Semester
  const currentSectionsData = hierarchicalData[selectedDept]?.[selectedSem] || [];

  return (
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

      {/* Filters Section */}
      <Card className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-pink-50/30 border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Department Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-indigo-900 tracking-wide uppercase">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3.5 py-2 bg-white border border-indigo-200 rounded-xl text-sm text-slate-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown (Sem 1 to 8) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-indigo-900 tracking-wide uppercase">Semester</label>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="px-3.5 py-2 bg-white border border-indigo-200 rounded-xl text-sm text-slate-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {availableSemesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs font-medium px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
          Viewing: <span className="font-bold">{selectedDept.replace(/_/g, ' ')}</span> — <span className="font-bold">{selectedSem}</span>
        </div>
      </Card>

      {/* Grid of Separate Pie Charts for Each Section (A, B, C, D) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSectionsData.map((secObj, index) => (
          <Card key={secObj.section} className="flex flex-col border border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {secObj.section}
              </h3>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                {selectedSem}
              </span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={secObj.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={6}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {secObj.data.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={idx === 0 ? '#6366F1' : '#EC4899'} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.15)', fontWeight: 600 }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      <Card className="text-sm text-slate-500 font-medium bg-slate-50 border border-slate-200">
        Connect these filters to <code className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-indigo-600 font-semibold">GET /reports/sections?department=...&semester=...</code> to fetch real-time section data from your backend.
      </Card>
    </div>
  );
};

export default Reports;