import api from './api';
import { mockStudents } from '../data/mock';

/*
 * Expected backend contract:
 *   GET  /attendance/roster?classId=&date=   -> [{ id, name, avatar, status }]
 *   POST /attendance                          { classId, date, records: [{studentId, status}] } -> 201
 *   GET  /attendance/summary?studentId=       -> { overall, byMonth: [...] }
 */

export async function getRoster(params) {
  try {
    const { data } = await api.get('/attendance/roster', { params });
    return data;
  } catch (error) {
    if (!error.response) {
      return mockStudents.slice(0, 5).map((s) => ({ id: s.id, name: s.name, avatar: s.avatar, status: 'Present' }));
    }
    throw error;
  }
}

export async function saveAttendance(payload) {
  try {
    const { data } = await api.post('/attendance', payload);
    return data;
  } catch (error) {
    if (!error.response) return { saved: true, demo: true };
    throw error;
  }
}
