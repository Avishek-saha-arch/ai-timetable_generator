import api, { USE_MOCKS } from './api';
import { mockStudents } from '../data/mock';

/*
 * Expected backend contract:
 *   GET    /students            -> [{ id, name, grade, section, attendance, gpa, status, avatar }]
 *   GET    /students/:id        -> { ...student }
 *   POST   /students            -> { ...student }
 *   PUT    /students/:id        -> { ...student }
 *   DELETE /students/:id        -> 204
 */

export async function getStudents() {
  if (USE_MOCKS) return mockStudents;
  try {
    const { data } = await api.get('/students');
    return data;
  } catch (error) {
    if (!error.response) return mockStudents; // backend not connected yet
    throw error;
  }
}

export async function getStudent(id) {
  try {
    const { data } = await api.get(`/students/${id}`);
    return data;
  } catch (error) {
    if (!error.response) return mockStudents.find((s) => s.id === id) || null;
    throw error;
  }
}

export async function createStudent(payload) {
  const { data } = await api.post('/students', payload);
  return data;
}

export async function updateStudent(id, payload) {
  const { data } = await api.put(`/students/${id}`, payload);
  return data;
}

export async function deleteStudent(id) {
  await api.delete(`/students/${id}`);
}
