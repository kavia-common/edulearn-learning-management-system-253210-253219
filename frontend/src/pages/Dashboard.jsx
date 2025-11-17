import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';
import { storage } from '../utils/storage';
import { courses } from '../data/courses';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard shows enrolled, continue learning and recommendations. */
  const progress = storage.getProgress();
  const enrolled = courses.slice(0, 2);
  const recommended = courses.slice(1);

  const completed = courses.filter(c => (progress[c.id]?.percent || 0) === 100);

  return (
    <div className="container">
      <div className="section">
        <h2>Continue Learning</h2>
        <div className="grid">
          {enrolled.map(c => (
            <CourseCard key={c.id} course={c} progressPercent={progress[c.id]?.percent || 0} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Completed Courses</h2>
        {completed.length === 0 ? (
          <div className="card" style={{ padding: 16 }}>
            <div className="gradient-bar" />
            <p style={{ marginTop: 10, color: 'var(--muted)' }}>No courses completed yet. Keep going! 🎯</p>
          </div>
        ) : (
          <div className="grid">
            {completed.map(c => (
              <CourseCard key={c.id} course={c} progressPercent={100} />
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h2>Recommended for you</h2>
        <div className="grid">
          {recommended.map(c => (
            <div key={c.id} className="card scale-in" style={{ overflow: 'hidden' }}>
              <div className="gradient-bar" />
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: '0 0 6px 0' }}>{c.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 0 }}>{c.short}</p>
                <ProgressBar value={progress[c.id]?.percent || 0} label="Progress" />
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <Link className="btn btn-primary" to={`/courses/${c.id}`}>View details</Link>
                  <Link className="btn" to="/courses">Explore all</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
