import api, { USE_MOCKS } from './api';
import { mockTeachers } from '../data/mock';

/*
 * Expected backend contract:
 *   GET    /teachers            -> [{ id, name, department, classes, workload, status, avatar }]
 *   GET    /teachers/:id        -> { ...teacher }
 *   POST   /teachers            -> { ...teacher }
 *   PUT    /teachers/:id        -> { ...teacher }
 *   DELETE /teachers/:id        -> 204
 */

export async function getTeachers() {
  if (USE_MOCKS) return mockTeachers;
  try {
    const { data } = await api.get('/teachers');
    return data;
  } catch (error) {
    if (!error.response) return mockTeachers;
    throw error;
  }
}

export async function createTeacher(payload) {
  const { data } = await api.post('/teachers', payload);
  return data;
}

export async function updateTeacher(id, payload) {
  const { data } = await api.put(`/teachers/${id}`, payload);
  return data;
}

export async function deleteTeacher(id) {
  await api.delete(`/teachers/${id}`);
}
