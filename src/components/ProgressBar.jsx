import React from 'react';

export default function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={clamped}
    >
      <div className="progress__fill" style={{ '--p': clamped }} />
    </div>
  );
}
