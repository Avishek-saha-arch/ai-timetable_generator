// Turns "studentName" into "Student Name"
export function camelToLabel(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

// Safely unwraps an axios error into a human-readable message.
export function apiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  return error?.response?.data?.message || error?.message || fallback;
}
