import React from 'react';

export default function CheckButton({ enabled, onClick, label = 'Check' }) {
  return (
    <button
      type="button"
      className={`check-btn ${enabled ? 'is-enabled' : ''}`}
      disabled={!enabled}
      aria-disabled={!enabled}
      onClick={enabled ? onClick : undefined}
    >
      {label}
    </button>
  );
}
