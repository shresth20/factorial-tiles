import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BOLT_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M13.5 2 4 13.5h6L9 22l10.5-12.5h-6L15.5 2Z"
      fill="currentColor"
      stroke="#0f1114"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header({ progress, totalSteps, currentStep, xp, onClose }) {
  const remainingDots = Math.max(0, totalSteps - currentStep - 1);
  return (
    <header className="header" role="banner">
      <button type="button" className="close-btn" aria-label="Exit lesson" onClick={onClose}>
        {CLOSE_ICON}
      </button>
      <ProgressBar value={progress} />
      <div className="step-dots" aria-hidden="true">
        {Array.from({ length: Math.min(remainingDots, 4) }).map((_, i) => (
          <span key={i} className="step-dots__dot" />
        ))}
      </div>
      <div className="energy" aria-label={`${xp} XP`}>
        <span>{xp}</span>
        <span className="energy__bolt">{BOLT_ICON}</span>
      </div>
    </header>
  );
}
