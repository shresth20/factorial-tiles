// Each question: variable `v` and two positive integer factors `a`, `b`.
// Displayed polynomial:  v^2 + (a+b)v + (a*b)
// Accepted answers: widthCount/heightCount == {a,b} in either order.
// Optional initialW / initialH seed the starting board so each question opens
// in a slightly different layout the learner has to adjust from.
export const QUESTIONS = [
  { id: 'q1', v: 'x', a: 1, b: 3, theme: 'blue',   initialW: 2, initialH: 1 },
  { id: 'q2', v: 'x', a: 1, b: 4, theme: 'pink',   initialW: 2, initialH: 4 },
  { id: 'q3', v: 'y', a: 2, b: 4, theme: 'coral',  initialW: 2, initialH: 2 },
  { id: 'q4', v: 'z', a: 2, b: 6, theme: 'yellow', initialW: 2, initialH: 2 },
  { id: 'q5', v: 'm', a: 3, b: 5, theme: 'violet', initialW: 2, initialH: 2 },
  { id: 'q6', v: 'n', a: 2, b: 5, theme: 'teal',   initialW: 2, initialH: 2 },
  { id: 'q7', v: 'p', a: 3, b: 4, theme: 'lime',   initialW: 2, initialH: 2 }
];

export const XP_PER_CORRECT = 15;
