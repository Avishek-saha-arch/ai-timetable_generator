import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://planify-backend-o8py.onrender.com/api';
const TIMETABLE_URL = `${API_BASE_URL}/timetable`;

export const generateTimetable = async (payload) => {
  const response = await axios.post(`${TIMETABLE_URL}/generate`, payload);
  return response.data;
};

export const getGenerationStatus = async (jobId) => {
  const response = await axios.get(`${TIMETABLE_URL}/status/${jobId}`);
  return response.data;
};