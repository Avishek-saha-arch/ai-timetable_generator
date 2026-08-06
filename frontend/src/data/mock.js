// Demo data used only as a graceful fallback when the backend is unreachable
// (or when VITE_USE_MOCKS=true). Every service in src/services/ tries the real
// API first and only falls back to this data on network failure.

export const mockStudents = Array.from({ length: 12 }, (_, i) => ({
  id: `STU${2024001 + i}`,
  name: ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Evans', 'Evan Foster', 'Fiona Garcia', 'George Harris', 'Hannah Irwin', 'Ian Jones', 'Julia King', 'Kevin Lee', 'Laura Martin'][i],
  grade: ['10th', '9th', '11th', '12th', '10th', '9th', '11th', '12th', '10th', '9th', '11th', '12th'][i],
  section: ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'B', 'A', 'B', 'C', 'A'][i],
  attendance: Math.floor(Math.random() * 20) + 80,
  gpa: (Math.random() * 1.5 + 2.5).toFixed(1),
  status: Math.random() > 0.8 ? 'Warning' : 'Active',
  avatar: `https://i.pravatar.cc/150?u=${i}`,
}));

export const mockTeachers = Array.from({ length: 8 }, (_, i) => ({
  id: `FAC${101 + i}`,
  name: ['Dr. Alan Turing', 'Marie Curie', 'Albert Einstein', 'Isaac Newton', 'Ada Lovelace', 'Nikola Tesla', 'Grace Hopper', 'Charles Darwin'][i],
  department: ['Computer Science', 'Physics', 'Physics', 'Mathematics', 'Computer Science', 'Engineering', 'Computer Science', 'Biology'][i],
  classes: Math.floor(Math.random() * 3) + 3,
  workload: Math.floor(Math.random() * 40) + 60,
  status: Math.random() > 0.8 ? 'Overloaded' : 'Optimal',
  avatar: `https://i.pravatar.cc/150?u=fac${i}`,
}));

export const initialTasks = [
  { id: 't1', title: 'Calculus Chapter 4 Assignment', priority: 'High', date: 'Today, 5:00 PM', type: 'Homework', status: 'todo' },
  { id: 't2', title: 'Physics Lab Report', priority: 'Medium', date: 'Tomorrow', type: 'Project', status: 'todo' },
  { id: 't3', title: 'Review Literature Essay', priority: 'High', date: 'Oct 15', type: 'Review', status: 'inProgress' },
  { id: 't4', title: 'Mid-term Exam Prep', priority: 'Medium', date: 'Oct 20', type: 'Study', status: 'inProgress' },
  { id: 't5', title: 'Submit Permission Slip', priority: 'Low', date: 'Oct 10', type: 'Admin', status: 'completed' },
];

export const premiumGridData = {
  Monday: [
    { subject: 'Advanced Math', teacher: 'Prof. A. Smith', room: 'Room 101', type: 'Lecture', color: 'blue' },
    { subject: 'Data Structures', teacher: 'Dr. B. Jones', room: 'Lab 2', type: 'Lab', color: 'indigo' },
    { type: 'Break' },
    { subject: 'Physics', teacher: 'Prof. C. White', room: 'Room 204', type: 'Lecture', color: 'sky' },
    { subject: 'English Lit.', teacher: 'Ms. D. Brown', room: 'Room 105', type: 'Lecture', color: 'amber' },
    null,
    { subject: 'Physical Ed.', teacher: 'Mr. E. Wilson', room: 'Gym', type: 'Activity', color: 'emerald' },
  ],
  Tuesday: [
    { subject: 'English Lit.', teacher: 'Ms. D. Brown', room: 'Room 105', type: 'Lecture', color: 'amber' },
    { subject: 'Advanced Math', teacher: 'Prof. A. Smith', room: 'Room 101', type: 'Lecture', color: 'blue' },
    { type: 'Break' },
    { subject: 'History', teacher: 'Dr. F. Davis', room: 'Room 302', type: 'Lecture', color: 'violet', conflict: true },
    { subject: 'Chemistry', teacher: 'Prof. C. White', room: 'Lab 1', type: 'Lab', color: 'sky' },
    { subject: 'Art & Design', teacher: 'Mrs. G. Taylor', room: 'Studio', type: 'Activity', color: 'pink' },
    null,
  ],
};

export const mockNotifications = [
  { id: 1, text: 'Teacher Sarah absent today. Substitute required for Room 302.', type: 'warning', time: '10 mins ago' },
  { id: 2, text: 'AI Document analysis complete for 15 admission forms.', type: 'success', time: '1 hour ago' },
  { id: 3, text: 'System update scheduled for 2:00 AM tonight.', type: 'info', time: '2 hours ago' },
];
