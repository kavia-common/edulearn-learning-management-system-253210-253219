import React from 'react';
import { courses } from '../data/courses';
import { storage } from '../utils/storage';
import CourseCard from '../components/CourseCard';

// PUBLIC_INTERFACE
export default function Courses() {
  /** Lists all courses with metadata and progress. */
  const progress = storage.getProgress();

  return (
    <div className="container">
      <div className="section">
        <h2>All Courses</h2>
        <div className="grid">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} progressPercent={progress[c.id]?.percent || 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
