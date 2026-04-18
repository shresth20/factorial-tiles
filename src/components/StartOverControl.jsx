import React from 'react';

const ICON = (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M14.5 4.5a6.5 6.5 0 1 0 2 5.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M14 2.5v3.8H10.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function StartOverControl({ onClick, enabled = true }) {
  return (
    <button
      type="button"
      className={`start-over ${enabled ? '' : 'is-muted'}`}
      onClick={enabled ? onClick : undefined}
      aria-label="Start this question over"
      aria-disabled={!enabled}
    >
      <span className="start-over__icon">{ICON}</span>
      <span>Start over</span>
    </button>
  );
}
