import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { storage } from '../utils/storage';

// PUBLIC_INTERFACE
export default function LessonPlayer() {
  /** Lesson player with next/prev and mark as completed logic persisted in localStorage. */
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);
  if (!course) return <div className="container"><p>Course not found.</p></div>;

  const idx = course.lessons.findIndex(l => l.id === lessonId);
  const lesson = course.lessons[idx];
  if (!lesson) return <div className="container"><p>Lesson not found.</p></div>;

  const markDone = () => {
    storage.markLessonCompleted(courseId, lessonId, course.lessons.length);
  };

  const goPrev = () => {
    if (idx > 0) navigate(`/courses/${courseId}/lesson/${course.lessons[idx - 1].id}`);
  };
  const goNext = () => {
    if (idx < course.lessons.length - 1) navigate(`/courses/${courseId}/lesson/${course.lessons[idx + 1].id}`);
  };

  return (
    <div className="container">
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="gradient-bar" />
        <div style={{ padding: 16, display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to={`/courses/${courseId}`} className="btn">← Back</Link>
            <h2 style={{ margin: 0 }}>{lesson.title}</h2>
          </div>
          <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)' }}>
            {lesson.type === 'text' ? (
              <p style={{ margin: 0 }}>{lesson.content}</p>
            ) : (
              <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 8 }} />
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={goPrev} className="btn" disabled={idx === 0} aria-disabled={idx === 0}>← Previous</button>
              <button onClick={goNext} className="btn" disabled={idx === course.lessons.length - 1} aria-disabled={idx === course.lessons.length - 1}>Next →</button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={markDone} className="btn btn-primary">Mark as Completed</button>
              <Link className="btn" to={`/courses/${courseId}/quiz`}>Go to Quiz</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
