import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, CalendarClock, ScanLine, KanbanSquare,
  ClipboardCheck, BarChart3, Settings as SettingsIcon, User,
  FileQuestion, Megaphone, FolderOpen, Sparkles,
} from 'lucide-react';

import useAppStore from './store/useAppStore';
import DashboardLayout from './components/layout/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

import DashboardOverview from './pages/admin/DashboardOverview';
import StudentManagement from './pages/admin/StudentManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import SmartTimetable from './pages/admin/SmartTimetable';
import AdminAttendance from './pages/admin/Attendance';
import Reports from './pages/admin/Reports';

import TaskManager from './pages/shared/TaskManager';
import AIDocReader from './pages/shared/AIDocReader';
import Settings from './pages/shared/Settings';
import Profile from './pages/shared/Profile';

import StudentDashboardHome from './pages/student/StudentDashboardHome';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentExams from './pages/student/StudentExams';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentPerformance from './pages/student/StudentPerformance';
import StudentResources from './pages/student/StudentResources';
import StudentOnboarding from './pages/student/StudentOnboarding';

import TeacherDashboardHome from './pages/teacher/TeacherDashboardHome';
import TeacherTimetable from './pages/teacher/TeacherTimetable';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherQuestionPapers from './pages/teacher/TeacherQuestionPapers';
import TeacherPerformance from './pages/teacher/TeacherPerformance';
import TeacherAnnouncements from './pages/teacher/TeacherAnnouncements';
import TeacherMaterials from './pages/teacher/TeacherMaterials';
import AITeachingAssistant from './pages/teacher/AITeachingAssistant';
import TeacherOnboarding from './pages/teacher/TeacherOnboarding';

// ---- Role menu configs -----------------------------------------------

const adminMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'timetable', label: 'Smart Timetable', icon: CalendarClock, badge: 'AI' },
  { id: 'doc-reader', label: 'AI Doc Reader', icon: ScanLine, badge: 'AI' },
  { id: 'tasks', label: 'Task Manager', icon: KanbanSquare },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'profile', label: 'Profile', icon: User },
];

const studentMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'timetable', label: 'Timetable', icon: CalendarClock },
  { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
  { id: 'exams', label: 'Exams', icon: FileQuestion },
  { id: 'attendance', label: 'Attendance', icon: BarChart3 },
  { id: 'performance', label: 'Performance', icon: Sparkles },
  { id: 'resources', label: 'Resources', icon: FolderOpen },
  { id: 'tasks', label: 'Task Planner', icon: KanbanSquare },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'profile', label: 'Profile', icon: User },
];

const teacherMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'timetable', label: 'Timetable', icon: CalendarClock },
  { id: 'classes', label: 'My Classes', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
  { id: 'question-papers', label: 'Question Papers', icon: FileQuestion, badge: 'AI' },
  { id: 'materials', label: 'Materials', icon: FolderOpen },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'performance', label: 'Class Performance', icon: BarChart3 },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
  { id: 'doc-reader', label: 'AI Doc Reader', icon: ScanLine, badge: 'AI' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'profile', label: 'Profile', icon: User },
];

// ---- Route protection ---------------------------------------------------

const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated, userRole } = useAppStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to={`/${userRole}`} replace />;
  return children;
};

// ---- Generic role shell: maps a menu id to a page and drives the URL ----

const RoleShell = ({ basePath, menuItems, brandLabel, routeMap }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeMenu = location.pathname.split('/')[2] || menuItems[0].id;

  const handleSelect = (id) => navigate(`${basePath}/${id}`);

  const ActivePage = routeMap[activeMenu] || routeMap[menuItems[0].id];

  return (
    <DashboardLayout menuItems={menuItems} activeMenu={activeMenu} onMenuSelect={handleSelect} brandLabel={brandLabel}>
      <ActivePage />
    </DashboardLayout>
  );
};

// ---- App ------------------------------------------------------------

const adminRouteMap = {
  dashboard: DashboardOverview,
  students: StudentManagement,
  teachers: TeacherManagement,
  timetable: SmartTimetable,
  'doc-reader': AIDocReader,
  tasks: TaskManager,
  attendance: AdminAttendance,
  reports: Reports,
  settings: Settings,
  profile: Profile,
};

const studentRouteMap = {
  dashboard: StudentDashboardHome,
  timetable: StudentTimetable,
  assignments: StudentAssignments,
  exams: StudentExams,
  attendance: StudentAttendance,
  performance: StudentPerformance,
  resources: StudentResources,
  tasks: TaskManager,
  settings: Settings,
  profile: Profile,
};

const teacherRouteMap = {
  dashboard: TeacherDashboardHome,
  timetable: TeacherTimetable,
  classes: TeacherClasses,
  attendance: TeacherAttendance,
  assignments: TeacherAssignments,
  'question-papers': TeacherQuestionPapers,
  materials: TeacherMaterials,
  announcements: TeacherAnnouncements,
  performance: TeacherPerformance,
  'ai-assistant': AITeachingAssistant,
  'doc-reader': AIDocReader,
  settings: Settings,
  profile: Profile,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/student/onboarding"
        element={
          <ProtectedRoute role="student">
            <StudentOnboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/onboarding"
        element={
          <ProtectedRoute role="teacher">
            <TeacherOnboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <RoleShell basePath="/admin" menuItems={adminMenu} brandLabel="Planify Admin" routeMap={adminRouteMap} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <RoleShell basePath="/student" menuItems={studentMenu} brandLabel="Planify" routeMap={studentRouteMap} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <RoleShell basePath="/teacher" menuItems={teacherMenu} brandLabel="Planify" routeMap={teacherRouteMap} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
