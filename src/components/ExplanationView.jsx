import React from 'react';
import AlgebraBoard from './AlgebraBoard.jsx';
import { polynomialParts } from '../utils/format.js';
import { getTheme } from '../utils/themes.js';

export default function ExplanationView({ question, widthCount, heightCount }) {
  const { v, middle, constant } = polynomialParts(question);
  const theme = getTheme(question.theme);
  const [w, h] = [widthCount, heightCount];

  const tokenStyle = {
    '--chip-bg': theme.labelBg,
    '--chip-text': theme.labelText
  };

  return (
    <section className="explain" aria-label="Explanation">
      <p className="explain__para">
        <strong>Factoring</strong> a polynomial like{' '}
        <span className="poly">
          {v}<sup>2</sup> + {middle}{v} + {constant}
        </span>{' '}
        is like distributing in reverse.
      </p>

      <div className="explain__board">
        <AlgebraBoard
          question={question}
          widthCount={w}
          heightCount={h}
          onChange={() => {}}
          interactive={false}
        />
      </div>

      <p className="explain__para">
        When the polynomial is represented by the area of a rectangle, the{' '}
        <strong>factors</strong> are the rectangle's side lengths.
      </p>

      <div className="explain__equation" style={tokenStyle}>
        <div>
          <span className="token">{v}</span>
          <sup style={{ marginRight: 4 }}>2</sup>
          {' + '}
          {middle}
          <span className="token">{v}</span>
          {' + '}
          {constant}
        </div>
        <div style={{ marginTop: 4 }}>
          {'= '}
          <span className="muted-eq">(</span>
          <span className="token">{v}</span>
          {` + ${w}`}
          <span className="muted-eq">)(</span>
          <span className="token">{v}</span>
          {` + ${h}`}
          <span className="muted-eq">)</span>
        </div>
      </div>
    </section>
  );
}
