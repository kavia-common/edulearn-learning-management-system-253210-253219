const KEY_USER = 'lms_user';
const KEY_PROGRESS = 'lms_progress'; // { [courseId]: { completedLessons: string[], percent: number } }
const KEY_ATTEMPTS = 'lms_attempts'; // [{id, courseId, score, total, date}]

// PUBLIC_INTERFACE
export const storage = {
  /** Generic getItem wrapper with JSON parsing. */
  getItem(key) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /** Generic setItem wrapper with JSON serialization. */
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota errors for demo */
    }
  },

  // User
  // PUBLIC_INTERFACE
  getUser() { return storage.getItem(KEY_USER); },
  // PUBLIC_INTERFACE
  setUser(user) { storage.setItem(KEY_USER, user); },
  // PUBLIC_INTERFACE
  clearUser() { window.localStorage.removeItem(KEY_USER); },

  // Progress
  // PUBLIC_INTERFACE
  getProgress() { return storage.getItem(KEY_PROGRESS) || {}; },
  // PUBLIC_INTERFACE
  setProgress(progress) { storage.setItem(KEY_PROGRESS, progress); },
  // PUBLIC_INTERFACE
  markLessonCompleted(courseId, lessonId, lessonsCount) {
    const progress = storage.getProgress();
    const entry = progress[courseId] || { completedLessons: [], percent: 0 };
    if (!entry.completedLessons.includes(lessonId)) {
      entry.completedLessons.push(lessonId);
    }
    const completed = entry.completedLessons.length;
    entry.percent = Math.round((completed / lessonsCount) * 100);
    progress[courseId] = entry;
    storage.setProgress(progress);
    return entry;
  },

  // Attempts (quiz scoreboard)
  // PUBLIC_INTERFACE
  getAttempts() { return storage.getItem(KEY_ATTEMPTS) || []; },
  // PUBLIC_INTERFACE
  addAttempt(attempt) {
    const attempts = storage.getAttempts();
    attempts.unshift({ id: String(Date.now()), ...attempt });
    storage.setItem(KEY_ATTEMPTS, attempts);
    return attempts;
  },
};
