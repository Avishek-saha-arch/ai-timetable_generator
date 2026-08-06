import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import * as timetableService from '../../services/timetable.service';

const StudentTimetable = () => {
  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    timetableService.getTimetable({ role: 'student' }).then(setGridData);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Timetable"
        description="View and download your weekly academic schedule."
        action={<Button variant="outline"><Download size={18} /> Download PDF</Button>}
      />
      {gridData ? <TimetableGrid gridData={gridData} /> : <Loader label="Loading your schedule..." />}
    </div>
  );
};

export default StudentTimetable;
