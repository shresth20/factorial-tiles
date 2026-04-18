import React from 'react';

/**
 * Inline banner shown above the footer after a wrong answer and before
 * the success tray slides up on a correct answer. Tone is supportive.
 */
const HINT_ICON = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 3a5 5 0 0 1 3 9v2H7v-2a5 5 0 0 1 3-9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M8 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function FeedbackBanner({ kind, title, message }) {
  return (
    <div
      className={`feedback feedback--${kind}`}
      role="status"
      aria-live="polite"
    >
      <span className="feedback__icon">{HINT_ICON}</span>
      <div className="feedback__text">
        <strong className="feedback__title">{title}</strong>
        <span className="feedback__message">{message}</span>
      </div>
    </div>
  );
}
