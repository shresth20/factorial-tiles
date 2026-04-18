import React from 'react';
import Confetti from './Confetti.jsx';

export default function CompletionView({ xp, total, onRestart }) {
  return (
    <section className="complete" aria-live="polite">
      <Confetti count={52} />
      <div className="complete__burst" aria-hidden="true">🎉</div>
      <h2 className="complete__title">Lesson complete</h2>
      <p className="complete__subtitle">
        Nicely done. You broke each polynomial into a pair of factors.
      </p>
      <div className="complete__stats">
        <div className="complete__stat">
          <span className="complete__stat-value">{total}</span>
          <span className="complete__stat-label">Questions</span>
        </div>
        <div className="complete__stat">
          <span className="complete__stat-value">{xp}</span>
          <span className="complete__stat-label">XP earned</span>
        </div>
      </div>
      <button type="button" className="complete__cta" onClick={onRestart}>
        Practice again
      </button>
    </section>
  );
}
