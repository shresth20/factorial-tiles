import React from 'react';

export default function Tile({ kind, variable, row, col }) {
  const style = { gridRow: row, gridColumn: col };
  const cls = `tile is-${kind} is-enter`;
  let label = null;
  if (kind === 'square') {
    label = (
      <span>
        {variable}<sup>2</sup>
      </span>
    );
  } else if (kind === 'var') {
    label = variable;
  }
  return (
    <div className={cls} style={style} role="presentation">
      {label}
    </div>
  );
}
