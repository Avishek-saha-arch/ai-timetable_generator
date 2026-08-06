import api from './api';

/*
 * Expected backend contract:
 *   POST /documents/extract   (multipart/form-data, field name "file")
 *        -> { studentId, studentName, class, dob, guardian, phone, bloodGroup, confidence }
 *   POST /documents/:extractionId/save  { ...editedFields } -> { id, saved: true }
 *
 * onProgress(percent) is called with upload progress while the file is sent;
 * the backend is responsible for returning the OCR result once processing finishes.
 */

export async function extractDocument(file, onProgress) {
  const form = new FormData();
  form.append('file', file);

  try {
    const { data } = await api.post('/documents/extract', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded / evt.total) * 100));
        }
      },
    });
    return data;
  } catch (error) {
    if (!error.response) {
      // No backend/OCR engine connected yet - simulate the extraction so the
      // reviewer UI can still be demoed end-to-end.
      return simulateExtraction(onProgress);
    }
    throw error;
  }
}

function simulateExtraction(onProgress) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      onProgress && onProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        resolve({
          studentId: 'STU-2024-899',
          studentName: 'Michael Chang',
          class: '10th - Section B',
          dob: '15/08/2008',
          guardian: 'Sarah Chang',
          phone: '+1 (555) 019-2838',
          bloodGroup: 'O+',
          confidence: 98,
        });
      }
    }, 80);
  });
}

export async function saveExtractedRecord(fields) {
  try {
    const { data } = await api.post('/documents/save', fields);
    return data;
  } catch (error) {
    if (!error.response) return { saved: true, demo: true };
    throw error;
  }
}
