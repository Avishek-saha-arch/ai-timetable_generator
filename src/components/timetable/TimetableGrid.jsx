import React from 'react';
import { MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00'];

/**
 * @param {object} gridData - { Monday: [...], Tuesday: [...] } shape from timetable.service
 * @param {(cell) => boolean} filter - optional predicate to only render matching cells (e.g. a teacher's own classes)
 */
const TimetableGrid = ({ gridData, filter }) => (
  <Card noPadding className="overflow-x-auto">
    <div className="min-w-[800px]">
      <div className="flex border-b border-slate-200 bg-slate-50/80">
        <div className="w-24 shrink-0 p-4 text-center font-bold text-slate-500 text-sm">Time</div>
        {DAYS.map((d) => (
          <div key={d} className="flex-1 p-4 text-center font-bold text-slate-700 border-l border-slate-200">{d}</div>
        ))}
      </div>
      {SLOTS.map((time, sIdx) => (
        <div key={time} className="flex border-b border-slate-100 last:border-0 group">
          <div className="w-24 shrink-0 p-4 text-center font-semibold text-slate-500 text-sm flex items-center justify-center bg-slate-50/30 group-hover:bg-[#284A50]/5 transition-colors">{time}</div>
          {['Monday', 'Tuesday'].map((day) => {
            const cell = gridData[day]?.[sIdx];
            if (!cell) return <div key={day} className="flex-1 p-2 border-l border-slate-100" />;
            if (cell.type === 'Break') {
              return (
                <div key={day} className="flex-1 p-3 border-l border-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase text-xs tracking-widest bg-slate-50/50">
                  Break
                </div>
              );
            }
            if (filter && !filter(cell)) return <div key={day} className="flex-1 p-2 border-l border-slate-100" />;

            return (
              <div key={day} className="flex-1 p-2 border-l border-slate-100">
                <div className={`h-full p-3.5 rounded-[14px] border border-${cell.color}-200 bg-${cell.color}-50`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <Badge className={`bg-${cell.color}-100 text-${cell.color}-700 border-transparent`}>{cell.type}</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 leading-tight">{cell.subject}</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{cell.teacher}</p>
                  <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-slate-600">
                    <MapPin size={12} /> {cell.room}
                  </div>
                </div>
              </div>
            );
          })}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 p-2 border-l border-slate-100 bg-slate-50/20" />
          ))}
        </div>
      ))}
    </div>
  </Card>
);

export default TimetableGrid;
