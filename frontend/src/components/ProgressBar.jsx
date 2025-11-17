import React from 'react';

// PUBLIC_INTERFACE
export default function ProgressBar({ value, label }) {
  /** Simple horizontal progress bar with label. */
  return (
    <div>
      {label && <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>{label}</div>}
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div className="bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}
