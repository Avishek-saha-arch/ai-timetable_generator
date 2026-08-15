// src/services/attendance.service.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/attendance';

/**
 * Fetches the student roster for a specific class, section, and date.
 */
export const getRoster = async ({ className, section, date }) => {
  const params = new URLSearchParams();
  if (className) params.append('className', className);
  // if (classId) params.append('classId', classId);
  if (section) params.append('section', section);
  if (date) params.append('date', date);

  const response = await fetch(`${API_BASE_URL}/roster?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch roster (Status: ${response.status})`);
  }

  return await response.json();
};

/**
 * Saves or updates attendance records for the roster.
 */
export const saveAttendance = async (data) => {
    // console.log("========== SAVE ATTENDANCE ==========");
    // console.log("Received data:", data);

    try {
        // Support both:
        // saveAttendance(array)
        // saveAttendance({ records: array })

        const records = Array.isArray(data)
            ? data
            : data?.records;

        if (!Array.isArray(records)) {
            throw new Error(
                "Attendance records must be an array"
            );
        }

        // console.log("Records:", records);

        const payload = {
            records: records.map(student => ({
                user_id: student.user_id,
                status: student.status
            }))
        };

        // console.log("Payload being sent:", payload);

        const response = await fetch(
            `${API_BASE_URL}/save`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const text = await response.text();

        // console.log("HTTP status:", response.status);
        // console.log("Backend response:", text);

        let result;

        try {
            result = JSON.parse(text);
        } catch {
            throw new Error(
                `Backend returned invalid JSON: ${text}`
            );
        }

        if (!response.ok) {
            throw new Error(
                result.error ||
                result.message ||
                `Server returned ${response.status}`
            );
        }

        return result;

    } catch (error) {
        console.error(
            "SAVE ATTENDANCE ERROR:",
            error
        );

        throw error;
    }
};