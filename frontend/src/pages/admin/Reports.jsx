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
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Download, Printer } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B'];

// Generate data for ONE class
const generateClassData = () => {
  const sections = [
    'Section A',
    'Section B',
    'Section C',
    'Section D',
  ];

  return sections.map((section) => {
    // Random passed percentage between 65 and 95
    const passed = Math.floor(Math.random() * 31) + 65;

    return {
      section,
      data: [
        {
          name: 'Passed',
          value: passed,
        },
        {
          name: 'Needs Improvement',
          value: 100 - passed,
        },
      ],
    };
  });
};

// Generate data for Classes 6-12
const classData = {
  'Class 6': generateClassData(),
  'Class 7': generateClassData(),
  'Class 8': generateClassData(),
  'Class 9': generateClassData(),
  'Class 10': generateClassData(),
  'Class 11': generateClassData(),
  'Class 12': generateClassData(),
};

const Reports = () => {
  const classes = Object.keys(classData);

  const [selectedClass, setSelectedClass] = useState(classes[0]);

  // This is now an ARRAY
  const currentSectionsData = classData[selectedClass] || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        title="Reports & Analytics"
        description="Institution-wide performance and operational reports."
        action={
          <div className="flex gap-3">
            <Button variant="outline">
              <Printer size={18} />
              Print
            </Button>

            <Button>
              <Download size={18} />
              Export CSV
            </Button>
          </div>
        }
      />

      {/* Class Filter */}
      <Card className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-pink-50/30 border border-indigo-100 shadow-sm">

        <div className="flex items-center gap-4 flex-wrap">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-indigo-900 tracking-wide uppercase">
              Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3.5 py-2 bg-white border border-indigo-200 rounded-xl text-sm text-slate-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="text-xs font-medium px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
          Viewing:{' '}
          <span className="font-bold">
            {selectedClass}
          </span>
        </div>

      </Card>

      {/* Section Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {currentSectionsData.map((secObj, index) => (
          <Card
            key={secObj.section}
            className="flex flex-col border border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-200"
          >

            {/* Section Header */}
            <div className="flex justify-between items-center mb-2">

              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">

                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                {secObj.section}

              </h3>

            </div>

            {/* Pie Chart */}
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
                    label={({ name, value }) =>
                      `${name}: ${value}%`
                    }
                  >

                    {secObj.data.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={
                          idx === 0
                            ? '#6366F1'
                            : '#EC4899'
                        }
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow:
                        '0 10px 15px -3px rgb(0 0 0 / 0.15)',
                      fontWeight: 600,
                    }}
                  />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </Card>
        ))}

      </div>

    </div>
  );
};

export default Reports;