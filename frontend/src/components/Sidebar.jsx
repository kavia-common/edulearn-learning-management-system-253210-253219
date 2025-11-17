import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation for desktop screens. */
  const navItemClass = ({ isActive }) => `${isActive ? 'active' : ''}`;
  return (
    <aside className="sidebar">
      <div className="card">
        <div className="gradient-bar" />
        <nav style={{ display: 'grid', gap: 4, paddingTop: 8 }}>
          <NavLink to="/dashboard" className={navItemClass}><span>🏠</span> Dashboard</NavLink>
          <NavLink to="/courses" className={navItemClass}><span>📚</span> Courses</NavLink>
          <NavLink to="/results" className={navItemClass}><span>📊</span> Results</NavLink>
        </nav>
      </div>
    </aside>
  );
}
