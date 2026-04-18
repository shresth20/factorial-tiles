export function polynomialParts(q) {
  const { v, a, b } = q;
  return { v, middle: a + b, constant: a * b };
}

export function formatPolynomial(q) {
  const { v, middle, constant } = polynomialParts(q);
  return { v, middle, constant };
}

export function formatFactors(q) {
  return `(${q.v} + ${q.a})(${q.v} + ${q.b})`;
}

export function isCorrectAnswer(q, widthCount, heightCount) {
  const pair = [widthCount, heightCount].sort((x, y) => x - y);
  const expected = [q.a, q.b].sort((x, y) => x - y);
  return pair[0] === expected[0] && pair[1] === expected[1];
}
