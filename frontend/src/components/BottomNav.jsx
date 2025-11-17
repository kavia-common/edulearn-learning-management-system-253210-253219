import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function BottomNav() {
  /** Bottom navigation shown on small screens. */
  const navItemClass = ({ isActive }) => `${isActive ? 'active' : ''}`;
  return (
    <div className="bottom-nav">
      <NavLink to="/dashboard" className={navItemClass}>🏠<div style={{ fontSize: 12 }}>Home</div></NavLink>
      <NavLink to="/courses" className={navItemClass}>📚<div style={{ fontSize: 12 }}>Courses</div></NavLink>
      <NavLink to="/results" className={navItemClass}>📊<div style={{ fontSize: 12 }}>Results</div></NavLink>
      <NavLink to="/login" className={navItemClass}>👤<div style={{ fontSize: 12 }}>Profile</div></NavLink>
    </div>
  );
}
