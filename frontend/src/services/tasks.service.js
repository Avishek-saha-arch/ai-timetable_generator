import api, { USE_MOCKS } from './api';
import { initialTasks } from '../data/mock';

/*
 * Expected backend contract:
 *   GET    /tasks                 -> [{ id, title, priority, date, type, status }]
 *   POST   /tasks                 -> { ...task }
 *   PATCH  /tasks/:id              { status } -> { ...task }   (used for kanban drag/drop)
 *   DELETE /tasks/:id             -> 204
 */

let localFallback = null; // keeps drag/drop working across a session with no backend

export async function getTasks() {
  if (USE_MOCKS) return structuredClone(initialTasks);
  try {
    const { data } = await api.get('/tasks');
    return data;
  } catch (error) {
    if (!error.response) {
      if (!localFallback) localFallback = structuredClone(initialTasks);
      return localFallback;
    }
    throw error;
  }
}

export async function createTask(payload) {
  try {
    const { data } = await api.post('/tasks', payload);
    return data;
  } catch (error) {
    if (!error.response) {
      const task = { id: `t${Date.now()}`, status: 'todo', ...payload };
      localFallback = [...(localFallback || []), task];
      return task;
    }
    throw error;
  }
}

export async function updateTaskStatus(id, status) {
  try {
    const { data } = await api.patch(`/tasks/${id}`, { status });
    return data;
  } catch (error) {
    if (!error.response) {
      localFallback = (localFallback || []).map((t) => (t.id === id ? { ...t, status } : t));
      return localFallback.find((t) => t.id === id);
    }
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    if (!error.response) {
      localFallback = (localFallback || []).filter((t) => t.id !== id);
      return;
    }
    throw error;
  }
}
