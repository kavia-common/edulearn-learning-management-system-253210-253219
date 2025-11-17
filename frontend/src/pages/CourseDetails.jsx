import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { storage } from '../utils/storage';
import ProgressBar from '../components/ProgressBar';

// PUBLIC_INTERFACE
export default function CourseDetails() {
  /** Displays course info and lessons list with completion indicators. */
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);
  const progress = storage.getProgress()[courseId] || { completedLessons: [], percent: 0 };
  if (!course) return <div className="container"><p>Course not found.</p></div>;

  const startLessonId = course.lessons[0]?.id;

  return (
    <div className="container">
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="gradient-bar" />
        <div style={{ padding: 16, display: 'grid', gap: 10 }}>
          <h2 style={{ margin: 0 }}>{course.title}</h2>
          <p style={{ color: 'var(--muted)' }}>{course.description}</p>
          <ProgressBar value={progress.percent} label="Completion" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {startLessonId && (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/courses/${course.id}/lesson/${startLessonId}`)}
              >
                Start Learning
              </button>
            )}
            <Link className="btn" to={`/courses/${course.id}/quiz`}>Take Quiz</Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Lessons</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {course.lessons.map((l, idx) => {
            const done = progress.completedLessons.includes(l.id);
            return (
              <div key={l.id} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="badge" style={{ background: 'transparent' }}>#{idx + 1}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{l.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{l.type === 'text' ? 'Reading' : 'Video'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {done ? <span className="badge" style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}>Completed</span> : null}
                  <Link className="btn" to={`/courses/${course.id}/lesson/${l.id}`}>Open</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
