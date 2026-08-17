import api, { USE_MOCKS } from './api';
import { mockStudents } from '../data/mock';

/*
Backend contracts:

GET    /students/get-students
       -> {
            success: true,
            students: [...]
          }

GET    /students/count
       -> {
            success: true,
            student_count: 100
          }

GET    /students/average-attendance
       -> {
            success: true,
            average_attendance: 87.5
          }

POST   /students
       -> {
            success: true,
            student: {...}
          }

PUT    /students/:id
       -> {
            success: true,
            student: {...}
          }

DELETE /students/:id
*/

export async function getStudents() {
  if (USE_MOCKS) {
    return mockStudents;
  }

  try {
    const response = await api.get('/students/get-students');

    return Array.isArray(response.students)
      ? response.students
      : [];

  } catch (error) {
    console.error(
      'GET STUDENTS ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function getStudent(id) {
  try {
    const response = await api.get(`/students/${id}`);

    return response.student || response;

  } catch (error) {
    console.error(
      'GET STUDENT ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function getStudentCount() {
  try {
    const response = await api.get('/students/count');

    return response.student_count ?? 0;

  } catch (error) {
    console.error(
      'GET STUDENT COUNT ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function getAverageAttendance() {
  try {
    const response = await api.get(
      '/students/average-attendance'
    );
    
    return response.average_attendance ?? 0;

  } catch (error) {
    console.error(
      'GET AVERAGE ATTENDANCE ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function createStudent(payload) {
  try {
    const response = await api.post(
      '/students',
      payload
    );

    return response.student || response;

  } catch (error) {
    console.error(
      'CREATE STUDENT ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function updateStudent(id, payload) {
  try {
    const response = await api.put(
      `/students/${id}`,
      payload
    );

    return response.student || response;

  } catch (error) {
    console.error(
      'UPDATE STUDENT ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}


export async function deleteStudent(id) {
  try {
    return await api.delete(`/students/${id}`);

  } catch (error) {
    console.error(
      'DELETE STUDENT ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
}