import React from 'react';

const STAR = (
  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 2l1.8 4.2L16 7.2l-3.2 3 .8 4.4L10 12.6 6.4 14.6l.8-4.4L4 7.2l4.2-1z"
      fill="#4bd26a"
    />
  </svg>
);

export default function SuccessTray({ xp, onWhy, onContinue }) {
  return (
    <div className="tray" role="status" aria-live="polite">
      <div className="tray__title">
        <span className="tray__emoji" aria-hidden="true">🎉</span>
        <span>Correct!</span>
      </div>
      <div className="tray__xp">
        <span className="tray__xp-star">{STAR}</span>
        <span>+{xp} XP</span>
      </div>
      <div className="tray__spacer" />
      <button type="button" className="tray__why" onClick={onWhy}>
        Why?
      </button>
      <button type="button" className="tray__continue" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
