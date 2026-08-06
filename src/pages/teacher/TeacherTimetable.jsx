import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import useAppStore from '../../store/useAppStore';
import * as timetableService from '../../services/timetable.service';

const TeacherTimetable = () => {
  const { currentUser } = useAppStore();
  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    timetableService.getTimetable({ role: 'teacher', userId: currentUser.id }).then(setGridData);
  }, [currentUser.id]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Timetable"
        description="Your personalized weekly schedule."
        action={<Button variant="outline"><Download size={18} /> Download PDF</Button>}
      />
      {gridData ? <TimetableGrid gridData={gridData} filter={(cell) => cell.teacher === currentUser.name} /> : <Loader label="Loading your schedule..." />}
    </div>
  );
};

export default TeacherTimetable;
