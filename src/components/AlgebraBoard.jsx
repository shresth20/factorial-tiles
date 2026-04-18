import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Tile from './Tile.jsx';
import DimensionHandle from './DimensionHandle.jsx';
import { getTheme } from '../utils/themes.js';

const MIN_COUNT = 1;
const MAX_COUNT = 8;

function resolveSizes(el) {
  if (!el) return { big: 110, small: 32, gap: 4 };
  const cs = getComputedStyle(el);
  const parse = (v, fallback) => {
    const n = parseFloat(v);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  };
  return {
    big: parse(cs.getPropertyValue('--tile-big'), 110),
    small: parse(cs.getPropertyValue('--tile-small'), 32),
    gap: parse(cs.getPropertyValue('--tile-gap'), 4)
  };
}

export default function AlgebraBoard({
  question,
  widthCount,
  heightCount,
  onChange,
  showCheckBadge = false,
  shake = false,
  interactive = true
}) {
  const theme = getTheme(question.theme);
  const boardRef = useRef(null);
  const wrapRef = useRef(null);
  const [isDraggingW, setDraggingW] = useState(false);
  const [isDraggingH, setDraggingH] = useState(false);
  const [sizes, setSizes] = useState({ big: 110, small: 32, gap: 4 });

  const cssVars = useMemo(() => ({
    '--theme-square': theme.squareBg,
    '--theme-square-text': theme.squareText,
    '--theme-var': theme.varBg,
    '--theme-var-text': theme.varText,
    '--chip-bg': theme.labelBg,
    '--chip-text': theme.labelText
  }), [theme]);

  useLayoutEffect(() => {
    const update = () => setSizes(resolveSizes(wrapRef.current));
    update();
  }, []);

  useEffect(() => {
    const update = () => setSizes(resolveSizes(wrapRef.current));
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  const { big: BIG, small: SMALL, gap: GAP } = sizes;

  const stepW = SMALL + GAP;
  const stepH = SMALL + GAP;

  const gridTemplateColumns = [`${BIG}px`, ...Array(widthCount).fill(`${SMALL}px`)].join(' ');
  const gridTemplateRows = [`${BIG}px`, ...Array(heightCount).fill(`${SMALL}px`)].join(' ');

  const handleDragW = (delta, startCount) => {
    const next = Math.round(startCount + delta / stepW);
    const clamped = Math.max(MIN_COUNT, Math.min(MAX_COUNT, next));
    if (clamped !== widthCount) onChange({ widthCount: clamped, heightCount });
  };
  const handleDragH = (delta, startCount) => {
    const next = Math.round(startCount + delta / stepH);
    const clamped = Math.max(MIN_COUNT, Math.min(MAX_COUNT, next));
    if (clamped !== heightCount) onChange({ widthCount, heightCount: clamped });
  };

  return (
    <div
      ref={wrapRef}
      className={`board-wrap ${shake ? 'is-shake' : ''}`}
      style={cssVars}
    >
      <div className="axis-top">
        <span className="axis-chip">{question.v}</span>
        <span className="axis-chip is-number">{widthCount}</span>
      </div>
      <div className="axis-left">
        <span className="axis-chip">{question.v}</span>
        <span className="axis-chip is-number">{heightCount}</span>
      </div>

      <div className="board" ref={boardRef}>
        <div
          className="board__grid"
          style={{
            gridTemplateColumns,
            gridTemplateRows,
            gap: `${GAP}px`
          }}
        >
          <Tile kind="square" variable={question.v} row={1} col={1} />

          {Array.from({ length: widthCount }).map((_, i) => (
            <Tile key={`tv-${i}`} kind="var" variable={question.v} row={1} col={i + 2} />
          ))}

          {Array.from({ length: heightCount }).map((_, i) => (
            <Tile key={`lv-${i}`} kind="var" variable={question.v} row={i + 2} col={1} />
          ))}

          {Array.from({ length: heightCount }).map((_, r) =>
            Array.from({ length: widthCount }).map((__, c) => (
              <Tile
                key={`u-${r}-${c}`}
                kind="unit"
                row={r + 2}
                col={c + 2}
              />
            ))
          )}
        </div>

        {showCheckBadge && (
          <div className="board-badge" aria-label="Correct">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {interactive && (
          <>
            <DimensionHandle
              orientation="right"
              count={widthCount}
              onDrag={handleDragW}
              onDragStart={() => setDraggingW(true)}
              onDragEnd={() => setDraggingW(false)}
              label={`Adjust ${question.v} + columns`}
            />
            <DimensionHandle
              orientation="bottom"
              count={heightCount}
              onDrag={handleDragH}
              onDragStart={() => setDraggingH(true)}
              onDragEnd={() => setDraggingH(false)}
              label={`Adjust ${question.v} + rows`}
            />
            <Ticks side="right" show={isDraggingW} />
            <Ticks side="bottom" show={isDraggingH} />
          </>
        )}
      </div>
    </div>
  );
}

function Ticks({ side, show }) {
  return (
    <div className={`ticks ticks--${side} ${show ? 'is-show' : ''}`} aria-hidden="true">
      <span className="tick" />
      <span className="tick" />
      <span className="tick" />
    </div>
  );
}
