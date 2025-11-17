import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form that stores user in localStorage and redirects to dashboard. */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr('');
    if (!name || !email || !pw1 || !pw2) return setErr('Please fill all fields');
    if (!/.+@.+\..+/.test(email)) return setErr('Enter a valid email');
    if (pw1.length < 6) return setErr('Password must be at least 6 characters');
    if (pw1 !== pw2) return setErr('Passwords do not match');

    storage.setUser({ id: 'u-' + Date.now(), name, email });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <div className="card" style={{ width: '100%', maxWidth: 480, padding: 20 }}>
        <div className="gradient-bar" />
        <h2 style={{ marginTop: 10 }}>Create your account</h2>
        <p style={{ color: 'var(--muted)' }}>Join EduLearn and start learning today.</p>
        {err && <div className="badge" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>{err}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <label>
            <div>Name</div>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe"
                   style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </label>
          <label>
            <div>Email</div>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"
                   style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </label>
          <label>
            <div>Password</div>
            <input type="password" value={pw1} onChange={(e)=>setPw1(e.target.value)} placeholder="••••••••" minLength={6}
                   style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </label>
          <label>
            <div>Confirm Password</div>
            <input type="password" value={pw2} onChange={(e)=>setPw2(e.target.value)} placeholder="••••••••" minLength={6}
                   style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }} />
          </label>
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>
        <p style={{ color: 'var(--muted)' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
