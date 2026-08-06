# Planify.AI — Frontend

A full frontend for a school/college operations platform with three role-based
apps (Admin, Teacher, Student): AI-assisted timetable generation, an AI
document/OCR reader, student & teacher management, task/kanban planning,
attendance, performance reporting, and more.

Built with React 18, React Router, Zustand, Tailwind CSS, Recharts, Framer
Motion, and Axios. It is **fully wired for a real backend** but also works
standalone with built-in demo data, so you (or a teammate) can run it today
and swap in real endpoints incrementally.

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL to point at your backend
npm run dev
```

Open http://localhost:5173. Log in with any email/password — if no backend
is reachable yet, the app automatically falls back to a demo session so the
whole UI is explorable.

## Connecting a real backend

Every network call lives in `src/services/*.service.js`. Each file has a
comment block describing the exact endpoints, methods, and JSON shapes it
expects. Nothing else in the app needs to change — build a backend that
matches these contracts (or adjust the service files to match an existing
backend) and the UI will start using real data automatically.

`src/services/api.js` is the shared Axios instance:
- Base URL comes from `VITE_API_BASE_URL` (falls back to `/api`, proxied by
  Vite's dev server to `VITE_DEV_PROXY_TARGET`, default `localhost:8000`).
- Attaches `Authorization: Bearer <token>` from `localStorage` automatically.
- On a `401` response it clears the session and the app redirects to `/login`.

### Auth — `src/services/auth.service.js`
| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password, role }` | `{ token, user }` |
| GET | `/auth/me` | — | `{ user }` |
| POST | `/auth/logout` | — | `204` |

`user` shape: `{ id, name, email, role, avatar }` (`role` is `admin` \| `teacher` \| `student`).

### Students — `src/services/students.service.js`
`GET /students`, `GET /students/:id`, `POST /students`, `PUT /students/:id`, `DELETE /students/:id`
Student shape: `{ id, name, grade, section, attendance, gpa, status, avatar }`

### Teachers — `src/services/teachers.service.js`
`GET /teachers`, `POST /teachers`, `PUT /teachers/:id`, `DELETE /teachers/:id`
Teacher shape: `{ id, name, department, classes, workload, status, avatar }`

### Tasks (kanban) — `src/services/tasks.service.js`
`GET /tasks`, `POST /tasks`, `PATCH /tasks/:id` (`{ status }`), `DELETE /tasks/:id`
Task shape: `{ id, title, priority, date, type, status }` (`status`: `todo` \| `inProgress` \| `completed`)

### Timetable — `src/services/timetable.service.js`
- `GET /timetable?role=&userId=` → `{ Monday: [...cells], Tuesday: [...], ... }`
- `POST /timetable/generate` `{ institution, department, ... }` → `{ jobId }` (async AI solver)
- `GET /timetable/generate/:jobId` → `{ status: 'pending'|'done'|'failed', progress, result? }`

Cell shape: `{ subject, teacher, room, type, color } | { type: 'Break' } | null`

### AI Document Reader (OCR) — `src/services/documents.service.js`
- `POST /documents/extract` — multipart, field `file` → extracted field object + `confidence`
- `POST /documents/save` — the (possibly edited) extracted fields → `{ id, saved: true }`

### Notifications — `src/services/notifications.service.js`
`GET /notifications`, `DELETE /notifications/:id`

### Attendance — `src/services/attendance.service.js`
- `GET /attendance/roster?classId=&date=` → `[{ id, name, avatar, status }]`
- `POST /attendance` `{ classId, date, records: [{ studentId, status }] }`

## Project structure

```
src/
  components/
    ui/          Button, Card, Badge, Modal, Loader, PageHeader — the design system
    layout/       DashboardLayout (shared sidebar + topbar shell for all 3 roles)
    common/        ThemeToggle, NotificationBell, SearchBar
    timetable/     TimetableGrid (reusable weekly schedule renderer)
  pages/
    admin/         Admin-only pages (student/teacher management, reports, timetable generation)
    student/        Student-only pages
    teacher/        Teacher-only pages
    shared/         Pages reused across roles (TaskManager, AIDocReader, Settings, Profile)
  services/        All backend API calls — see contracts above
  store/           Zustand global store (auth/session, theme, notifications)
  data/mock.js     Demo data used only as a fallback when no backend is reachable
  utils/           Shared constants & helpers
```

## Notes

- Set `VITE_USE_MOCKS=true` in `.env` to force demo data everywhere (useful
  for a frontend-only demo/portfolio deployment).
- The build already passes (`npm run build`); the main bundle is a single
  chunk — consider route-based `React.lazy` code-splitting before shipping
  to production if bundle size matters to you.
