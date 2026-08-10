import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api/timetable';

export const generateTimetable = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/generate`, payload);
  return response.data; // Returns { jobId: "..." }
};

export const getGenerationStatus = async (jobId) => {
  const response = await axios.get(`${API_BASE_URL}/status/${jobId}`);
  return response.data; // Returns { status, progress, result }
};