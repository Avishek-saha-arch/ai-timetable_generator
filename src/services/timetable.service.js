import api, { USE_MOCKS } from './api';
import { premiumGridData } from '../data/mock';

/*
 * Expected backend contract:
 *   GET  /timetable?role=&userId=      -> { Monday: [...slot|null|{type:'Break'}], Tuesday: [...], ... }
 *   POST /timetable/generate            { institution, faculty, constraints }
 *                                       -> { jobId } (202 Accepted, async optimizer)
 *   GET  /timetable/generate/:jobId     -> { status: 'pending'|'done'|'failed', progress, result? }
 */

export async function getTimetable(params = {}) {
  if (USE_MOCKS) return premiumGridData;
  try {
    const { data } = await api.get('/timetable', { params });
    return data;
  } catch (error) {
    if (!error.response) return premiumGridData;
    throw error;
  }
}

export async function generateTimetable(config) {
  try {
    const { data } = await api.post('/timetable/generate', config);
    return data; // { jobId }
  } catch (error) {
    if (!error.response) {
      // No backend/AI engine connected - simulate a job id, caller can poll and
      // just resolve locally with the demo grid after a short delay.
      return { jobId: 'demo-job', demo: true };
    }
    throw error;
  }
}

export async function getGenerationStatus(jobId) {
  if (jobId === 'demo-job') {
    return { status: 'done', progress: 100, result: premiumGridData };
  }
  const { data } = await api.get(`/timetable/generate/${jobId}`);
  return data;
}
