import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function CourseCard({ course, progressPercent = 0 }) {
  /** Displays a course thumbnail, meta, and progress with CTA. */
  return (
    <div className="card course-card scale-in" aria-label={`${course.title} card`}>
      <div className="thumb" style={{ background: `linear-gradient(135deg, ${course.color}, var(--secondary))` }}>
        {/* image overlay */}
        {course.image ? (
          <img src={course.image} alt={`${course.title} thumbnail`} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay' }} />
        ) : null}
      </div>
      <div className="body">
        <div className="course-meta">
          <span className="badge">{course.lessons.length} lessons</span>
          <span className="badge">Quiz</span>
        </div>
        <h3 style={{ margin: '4px 0 0 0' }}>{course.title}</h3>
        <p style={{ color: 'var(--muted)', margin: 0 }}>{course.short}</p>
        <div className="progress" aria-label="Course progress">
          <div className="bar" style={{ width: `${progressPercent}%` }} />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <Link className="btn btn-primary" to={`/courses/${course.id}`}>Start / Continue</Link>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
}
