import api from './api';
import { mockNotifications } from '../data/mock';

/*
 * Expected backend contract:
 *   GET    /notifications        -> [{ id, text, type, time }]
 *   DELETE /notifications/:id    -> 204
 */

export async function getNotifications() {
  try {
    const { data } = await api.get('/notifications');
    return data;
  } catch (error) {
    if (!error.response) return mockNotifications;
    throw error;
  }
}

export async function dismissNotification(id) {
  try {
    await api.delete(`/notifications/${id}`);
  } catch (error) {
    if (error.response) throw error; // otherwise silently ok, local state already updated
  }
}
