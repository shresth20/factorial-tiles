import React, { useCallback, useRef, useState } from 'react';

const HANDLE_ICON = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <circle cx="3" cy="3" r="0.9" fill="currentColor" />
    <circle cx="7" cy="3" r="0.9" fill="currentColor" />
    <circle cx="3" cy="7" r="0.9" fill="currentColor" />
    <circle cx="7" cy="7" r="0.9" fill="currentColor" />
  </svg>
);

export default function DimensionHandle({
  orientation, // 'right' | 'bottom'
  count,
  onDrag,
  onDragStart,
  onDragEnd,
  label
}) {
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0, count: 0 });

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      e.target.setPointerCapture?.(e.pointerId);
      startRef.current = { x: e.clientX, y: e.clientY, count };
      setIsDragging(true);
      onDragStart?.();
    },
    [count, onDragStart]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const delta = orientation === 'right'
        ? e.clientX - startRef.current.x
        : e.clientY - startRef.current.y;
      onDrag(delta, startRef.current.count);
    },
    [isDragging, onDrag, orientation]
  );

  const finish = useCallback(
    (e) => {
      if (!isDragging) return;
      e?.target?.releasePointerCapture?.(e.pointerId);
      setIsDragging(false);
      onDragEnd?.();
    },
    [isDragging, onDragEnd]
  );

  // Keyboard fallback: arrow keys step the count by 1
  const handleKeyDown = (e) => {
    const inc = (orientation === 'right')
      ? (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0)
      : (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0);
    if (inc !== 0) {
      e.preventDefault();
      // simulate one step via the onDrag API
      const stepPx = 28;
      onDrag(inc * stepPx, count);
    }
  };

  return (
    <button
      type="button"
      className={`handle handle--${orientation} ${isDragging ? 'is-dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={handleKeyDown}
      aria-label={label}
      aria-valuenow={count}
    >
      <span className="handle__icon">{HANDLE_ICON}</span>
    </button>
  );
}
