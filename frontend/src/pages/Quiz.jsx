import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { storage } from '../utils/storage';

// PUBLIC_INTERFACE
export default function Quiz() {
  /** Multiple choice quiz with optional 10s timer per question and scoring. */
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Top-level derived data
  const course = getCourseById(courseId);
  const questions = course?.quiz || [];
  const total = questions.length;

  // Component state hooks
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [useTimer, setUseTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // Memoized score
  const score = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    return Object.entries(answers).reduce((acc, [qid, idx]) => {
      const iq = questions.find(qq => qq.id === qid);
      return acc + (iq && iq.answer === idx ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  // Timer effect
  useEffect(() => {
    if (!useTimer || total === 0) return;
    setTimeLeft(10);
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setCurrent((c) => (c < total - 1 ? c + 1 : c));
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [current, useTimer, total]);

  // Keyboard shortcuts 1-4
  useEffect(() => {
    if (total === 0) return;
    const handler = (e) => {
      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1;
        const q = questions[current];
        if (q && idx < (q.options?.length || 0)) {
          setAnswers(prev => ({ ...prev, [q.id]: idx }));
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [questions, current, total]);

  // Safe access to current question
  const q = questions[current];

  const select = (optIdx) => {
    if (!q) return;
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
  };

  const handleNext = () => {
    if (current < total - 1) setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };
  const handleSubmit = () => {
    const finalScore = Object.keys(answers).length
      ? Object.entries(answers).reduce((acc, [qid, idx]) => {
        const iq = questions.find(qq => qq.id === qid);
        return acc + (iq && iq.answer === idx ? 1 : 0);
      }, 0)
      : 0;
    storage.addAttempt({
      courseId,
      score: finalScore,
      total,
      date: new Date().toISOString(),
      answers
    });
    navigate('/results', { state: { courseId, answers }, replace: true });
  };

  // Render for missing course/quiz
  if (!course) return <div className="container"><p>Course not found.</p></div>;
  if (total === 0) return <div className="container"><p>No quiz available.</p></div>;

  return (
    <div className="container">
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="gradient-bar" />
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <h2 style={{ margin: 0 }}>{course.title} — Quiz</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                <input type="checkbox" checked={useTimer} onChange={(e) => setUseTimer(e.target.checked)} />
                10s Timer
              </label>
              <div className="badge">Question {current + 1} / {total}</div>
            </div>
          </div>
          {useTimer && <div className="badge" style={{ borderColor: 'var(--amber)', color: 'var(--amber)', marginTop: 8 }}>Time left: {timeLeft}s</div>}

          <div style={{ marginTop: 16 }}>
            <h3 style={{ marginTop: 0 }}>{q?.question}</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              {q?.options?.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    className={`btn ${selected ? 'btn-primary' : ''}`}
                    onClick={() => select(i)}
                    aria-pressed={selected}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 16 }}>
            <button className="btn" onClick={handlePrev} disabled={current === 0}>← Previous</button>
            <div style={{ display: 'flex', gap: 8 }}>
              {current < total - 1 ? (
                <button className="btn btn-primary" onClick={handleNext}>Next →</button>
              ) : (
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </div>

          <div style={{ marginTop: 12, color: 'var(--muted)', fontSize: 14 }}>
            Current score (answered so far): {score} / {total}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>
            Press <span className="kbd">1-4</span> to select options quickly.
          </div>
        </div>
      </div>
    </div>
  );
}
