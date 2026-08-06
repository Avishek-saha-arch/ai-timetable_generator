import React from 'react';
import Attendance from '../admin/Attendance';

// Teachers use the same roster-taking UI as admins, scoped server-side to their own classes.
const TeacherAttendance = () => <Attendance />;

export default TeacherAttendance;
