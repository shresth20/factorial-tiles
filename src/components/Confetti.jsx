import React, { useMemo } from 'react';

/**
 * Pure-CSS confetti overlay. Generates `count` particles with random
 * horizontal start positions, rotation, color, and fall duration.
 * Uses absolutely positioned divs with a keyframed animation defined
 * in index.css. Cleans up naturally via `animation-fill-mode: forwards`
 * and will be unmounted when the parent hides it.
 */
const COLORS = [
  '#4B6CFA',
  '#F36D5B',
  '#F3B547',
  '#2bb94a',
  '#8B6DFA',
  '#56C9E6'
];

export default function Confetti({ count = 46, active = true }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.9;
      const duration = 2.4 + Math.random() * 1.6;
      const rotate = Math.floor(Math.random() * 360);
      const size = 6 + Math.random() * 8;
      const hDrift = (Math.random() - 0.5) * 120;
      const color = COLORS[i % COLORS.length];
      const shape = Math.random() > 0.45 ? 'rect' : 'circle';
      return { left, delay, duration, rotate, size, hDrift, color, shape, id: i };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`confetti__piece confetti__piece--${p.shape}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * (p.shape === 'rect' ? 0.5 : 1)}px`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--r': `${p.rotate}deg`,
            '--dx': `${p.hDrift}px`
          }}
        />
      ))}
    </div>
  );
}
