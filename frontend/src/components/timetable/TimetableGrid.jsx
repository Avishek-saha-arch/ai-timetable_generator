import React from 'react';
import { MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00'];

// Map subject/type colors safely for Tailwind JIT purging
const COLOR_MAP = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', badgeBg: 'bg-blue-100', text: 'text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', badgeBg: 'bg-emerald-100', text: 'text-emerald-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badgeBg: 'bg-purple-100', text: 'text-purple-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', badgeBg: 'bg-amber-100', text: 'text-amber-700' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', badgeBg: 'bg-indigo-100', text: 'text-indigo-700' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', badgeBg: 'bg-rose-100', text: 'text-rose-700' },
  default: { bg: 'bg-slate-50', border: 'border-slate-200', badgeBg: 'bg-slate-100', text: 'text-slate-700' },
};

/**
 * @param {object} gridData - { Monday: [...], Tuesday: [...], ... } shape from timetable.service
 * @param {(cell) => boolean} filter - optional predicate to only render matching cells
 */
const TimetableGrid = ({ gridData, filter }) => {
  // Extract data if nested inside an object (e.g., { schedule: {...} })
  const scheduleData = gridData?.schedule || gridData?.data || gridData || {};

  return (
    <Card noPadding className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Table Header */}
        <div className="flex border-b border-slate-200 bg-slate-50/80">
          <div className="w-24 shrink-0 p-4 text-center font-bold text-slate-500 text-sm">Time</div>
          {DAYS.map((d) => (
            <div key={d} className="flex-1 p-4 text-center font-bold text-slate-700 border-l border-slate-200">
              {d}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {SLOTS.map((time, sIdx) => (
          <div key={time} className="flex border-b border-slate-100 last:border-0 group">
            <div className="w-24 shrink-0 p-4 text-center font-semibold text-slate-500 text-sm flex items-center justify-center bg-slate-50/30 group-hover:bg-[#284A50]/5 transition-colors">
              {time}
            </div>

            {DAYS.map((day) => {
              const cell = scheduleData[day]?.[sIdx];

              if (!cell) {
                return <div key={day} className="flex-1 p-2 border-l border-slate-100" />;
              }

              if (cell.type === 'Break' || cell.isBreak) {
                return (
                  <div
                    key={day}
                    className="flex-1 p-3 border-l border-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase text-xs tracking-widest bg-slate-50/50"
                  >
                    Break
                  </div>
                );
              }

              if (filter && !filter(cell)) {
                return <div key={day} className="flex-1 p-2 border-l border-slate-100" />;
              }

              const theme = COLOR_MAP[cell.color] || COLOR_MAP.default;

              return (
                <div key={day} className="flex-1 p-2 border-l border-slate-100">
                  <div className={`h-full p-3.5 rounded-[14px] border ${theme.border} ${theme.bg}`}>
                    <div className="flex justify-between items-start mb-1.5">
                      <Badge className={`${theme.badgeBg} ${theme.text} border-transparent`}>
                        {cell.type || 'Lecture'}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 leading-tight">
                      {cell.subject || cell.name || 'Subject'}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {Array.isArray(cell.teacher) ? cell.teacher.join(', ') : cell.teacher || 'Unassigned'}
                    </p>
                    {cell.room && (
                      <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-slate-600">
                        <MapPin size={12} /> {cell.room}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TimetableGrid;