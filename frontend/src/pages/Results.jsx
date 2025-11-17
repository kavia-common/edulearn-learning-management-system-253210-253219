import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { getCourseById } from '../data/courses';

// PUBLIC_INTERFACE
export default function Results() {
  /** Shows latest score, per-question correctness, and attempts scoreboard. */
  const location = useLocation();
  const attempts = storage.getAttempts();
  const latest = attempts[0];
  const answers = location.state?.answers || latest?.answers || {};
  const courseId = location.state?.courseId || latest?.courseId;
  const course = courseId ? getCourseById(courseId) : null;

  let details = [];
  if (course && course.quiz) {
    details = course.quiz.map(q => ({
      id: q.id,
      question: q.question,
      correctIndex: q.answer,
      chosenIndex: answers[q.id]
    }));
  }

  const scoreText = latest ? `${latest.score} / ${latest.total}` : 'No attempts yet';

  return (
    <div className="container">
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="gradient-bar" />
        <div style={{ padding: 16 }}>
          <h2 style={{ margin: 0 }}>Results</h2>
          {latest ? (
            <>
              <p style={{ color: 'var(--muted)' }}>
                Latest attempt on <strong>{new Date(latest.date).toLocaleString()}</strong> — Score: <strong>{scoreText}</strong>
              </p>
              {course ? (
                <>
                  <h3 style={{ marginBottom: 8 }}>{course.title}</h3>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {details.map((d, idx) => {
                      const correct = d.chosenIndex === d.correctIndex;
                      return (
                        <div key={d.id} className="card" style={{ padding: 12, borderColor: correct ? 'var(--teal)' : 'var(--error)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><strong>Q{idx+1}.</strong> {d.question}</div>
                            <div className="badge" style={{ color: correct ? 'var(--teal)' : 'var(--error)', borderColor: correct ? 'var(--teal)' : 'var(--error)' }}>
                              {correct ? 'Correct' : 'Wrong'}
                            </div>
                          </div>
                          {!correct && (
                            <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                              Your answer: {d.chosenIndex != null ? String.fromCharCode(65 + d.chosenIndex) : '—'} • Correct: {String.fromCharCode(65 + d.correctIndex)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
              {course && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Link className="btn" to={`/courses/${course.id}`}>Back to Course</Link>
                  <Link className="btn btn-primary" to={`/courses/${course.id}/quiz`}>Retake Quiz</Link>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: 'var(--muted)' }}>Take a quiz to see your results here.</p>
          )}
        </div>
      </div>

      <div className="section">
        <h3>Scoreboard</h3>
        {attempts.length === 0 ? (
          <div className="card" style={{ padding: 16 }}>
            <p style={{ margin: 0, color: 'var(--muted)' }}>No attempts recorded yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {attempts.map(a => (
              <div key={a.id} className="card" style={{ padding: 12, display: 'grid', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>{getCourseById(a.courseId)?.title || a.courseId}</strong></div>
                  <div className="badge">{new Date(a.date).toLocaleString()}</div>
                </div>
                <div style={{ color: 'var(--muted)' }}>Score: {a.score} / {a.total}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
