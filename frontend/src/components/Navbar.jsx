import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../utils/theme';
import { storage } from '../utils/storage';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar with brand, quick links, and theme toggle. */
  const { theme, toggle } = useTheme();
  const user = storage.getUser();
  const location = useLocation();

  const handleLogout = () => {
    storage.clearUser();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="inner container">
        <div className="brand" aria-label="EduLearn LMS">
          <span className="logo">🌊</span>
          <span>EduLearn</span>
        </div>
        <div className="nav-spacer" />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {user && (
            <>
              <Link className={`btn btn-ghost ${location.pathname.startsWith('/dashboard') ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
              <Link className={`btn btn-ghost ${location.pathname.startsWith('/courses') ? 'active' : ''}`} to="/courses">Courses</Link>
              <Link className={`btn btn-ghost ${location.pathname.startsWith('/results') ? 'active' : ''}`} to="/results">Results</Link>
            </>
          )}
          <button className="btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {user ? (
            <button className="btn" onClick={handleLogout} aria-label="Logout">Logout</button>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
