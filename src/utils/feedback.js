import { polynomialParts } from './format.js';

const CORRECT_CYCLE = [
  { title: 'Great job!', message: 'You found the factors.' },
  { title: 'Nice work!', message: 'Your rectangle matches the polynomial.' },
  { title: 'Excellent!', message: 'That is a correct factorization.' },
  { title: 'You got it!', message: 'Clean break down of the polynomial.' }
];

const WRONG_CYCLE = [
  'Not quite. Check the side lengths again.',
  'Almost there — try adjusting the other dimension.',
  'Close! Make sure the corner tiles line up.',
  'Keep going. Review both factors before you submit.'
];

export function correctMessage(index) {
  return CORRECT_CYCLE[index % CORRECT_CYCLE.length];
}

/**
 * Returns a calm, hint-forward message for a wrong answer.
 * The hint uses the underlying polynomial's numbers so it nudges
 * the learner toward the standard "sum / product" strategy.
 */
export function wrongMessage(question, attempt) {
  const { v, middle, constant } = polynomialParts(question);
  if (attempt <= 1) {
    return {
      title: 'Almost there.',
      message: WRONG_CYCLE[0]
    };
  }
  if (attempt === 2) {
    return {
      title: 'Try again.',
      message: `Hint: find two numbers that add to ${middle} and multiply to ${constant}.`
    };
  }
  return {
    title: 'Keep going.',
    message: `Hint: the side lengths should be ${v} + a and ${v} + b where a + b = ${middle} and a × b = ${constant}.`
  };
}
