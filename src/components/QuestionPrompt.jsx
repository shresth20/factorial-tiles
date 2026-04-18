import React from 'react';
import { polynomialParts } from '../utils/format.js';

export default function QuestionPrompt({ question, leadWord = 'Factor' }) {
  const { v, middle, constant } = polynomialParts(question);
  return (
    <p className="prompt">
      {leadWord}{' '}
      <span className="poly">
        {v}<sup>2</sup> + {middle}{v} + {constant}
      </span>
      .
    </p>
  );
}
