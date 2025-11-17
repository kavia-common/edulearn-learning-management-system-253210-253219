import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login screen with basic form validation and localStorage auth. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr('');
    if (!email || !password) {
      setErr('Please enter email and password');
      return;
    }
    if (!/.+@.+\..+/.test(email)) {
      setErr('Enter a valid email');
      return;
    }
    const user = { id: 'u-' + Date.now(), email };
    storage.setUser(user);
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <div className="card" style={{ width: '100%', maxWidth: 440, padding: 20 }}>
        <div className="gradient-bar" />
        <h2 style={{ marginTop: 10 }}>Welcome back</h2>
        <p style={{ color: 'var(--muted)' }}>Log in to continue your learning journey.</p>
        {err && <div className="badge" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>{err}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <label>
            <div>Email</div>
            <input
              aria-label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            <div>Password</div>
            <input
              aria-label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
        <p style={{ color: 'var(--muted)' }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
