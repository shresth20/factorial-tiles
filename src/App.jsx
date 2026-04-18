import React, { useEffect, useMemo, useRef, useState } from 'react';
import AppShell from './components/AppShell.jsx';
import Header from './components/Header.jsx';
import QuestionPrompt from './components/QuestionPrompt.jsx';
import AlgebraBoard from './components/AlgebraBoard.jsx';
import FooterBar from './components/FooterBar.jsx';
import StartOverControl from './components/StartOverControl.jsx';
import ExplanationView from './components/ExplanationView.jsx';
import CompletionView from './components/CompletionView.jsx';
import FeedbackBanner from './components/FeedbackBanner.jsx';
import { QUESTIONS, XP_PER_CORRECT } from './data/questions.js';
import { isCorrectAnswer } from './utils/format.js';
import { correctMessage, wrongMessage } from './utils/feedback.js';
import {
  primeOnFirstGesture,
  playCorrect,
  playWrong,
  playComplete
} from './utils/sounds.js';

function initialBoardFor(q) {
  return { widthCount: q.initialW ?? 2, heightCount: q.initialH ?? 1 };
}

export default function App() {
  const [questions] = useState(QUESTIONS);
  const [index, setIndex] = useState(0);
  const [board, setBoard] = useState(() => initialBoardFor(QUESTIONS[0]));
  const [status, setStatus] = useState('editing'); // editing | correct | explain | complete
  const [xp, setXp] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const wrongAttemptsRef = useRef(0);
  const correctIndexRef = useRef(0);

  useEffect(() => { primeOnFirstGesture(); }, []);

  const question = questions[index];
  const total = questions.length;
  const initialBoard = initialBoardFor(question);

  const touched =
    board.widthCount !== initialBoard.widthCount ||
    board.heightCount !== initialBoard.heightCount;

  const canCheck = status === 'editing' && touched;

  const progress = useMemo(() => {
    if (status === 'complete') return 1;
    const base = index / total;
    const bump = status === 'correct' || status === 'explain' ? 1 / total : 0;
    return Math.min(1, base + bump);
  }, [index, total, status]);

  const handleBoardChange = (next) => {
    if (status !== 'editing') return;
    setBoard(next);
    if (feedback && feedback.kind === 'wrong') setFeedback(null);
  };

  const handleCheck = () => {
    if (!canCheck) return;
    const ok = isCorrectAnswer(question, board.widthCount, board.heightCount);
    if (ok) {
      wrongAttemptsRef.current = 0;
      const msg = correctMessage(correctIndexRef.current++);
      setFeedback({ kind: 'correct', title: msg.title, message: msg.message });
      setStatus('correct');
      setXp((v) => v + XP_PER_CORRECT);
      playCorrect();
    } else {
      wrongAttemptsRef.current += 1;
      const msg = wrongMessage(question, wrongAttemptsRef.current);
      setFeedback({ kind: 'wrong', title: msg.title, message: msg.message });
      setShakeKey((k) => k + 1);
      playWrong();
    }
  };

  const handleContinue = () => {
    const nextIndex = index + 1;
    if (nextIndex >= total) {
      setFeedback(null);
      setStatus('complete');
      playComplete();
      return;
    }
    setIndex(nextIndex);
    setBoard(initialBoardFor(questions[nextIndex]));
    setStatus('editing');
    setFeedback(null);
    wrongAttemptsRef.current = 0;
  };

  const handleWhy = () => setStatus('explain');

  const handleStartOver = () => {
    if (status !== 'editing') return;
    setBoard(initialBoard);
    setFeedback(null);
    wrongAttemptsRef.current = 0;
  };

  const handleRestart = () => {
    setIndex(0);
    setBoard(initialBoardFor(questions[0]));
    setStatus('editing');
    setXp(0);
    setFeedback(null);
    wrongAttemptsRef.current = 0;
    correctIndexRef.current = 0;
  };

  const handleClose = () => {
    const ok = window.confirm('Exit lesson?');
    if (ok) handleRestart();
  };

  if (status === 'complete') {
    return (
      <AppShell>
        <Header
          progress={1}
          totalSteps={total}
          currentStep={total - 1}
          xp={xp}
          onClose={handleClose}
        />
        <CompletionView xp={xp} total={total} onRestart={handleRestart} />
      </AppShell>
    );
  }

  const footerMode =
    status === 'correct' ? 'success'
      : status === 'explain' ? 'continue'
      : 'check';

  const showFeedback = feedback && status !== 'explain' && status !== 'correct';

  return (
    <AppShell>
      <Header
        progress={progress}
        totalSteps={total}
        currentStep={index}
        xp={xp}
        onClose={handleClose}
      />

      {status === 'explain' ? (
        <ExplanationView
          question={question}
          widthCount={board.widthCount}
          heightCount={board.heightCount}
        />
      ) : (
        <div className="play">
          <QuestionPrompt question={question} />
          <div className="board-area">
            <AlgebraBoard
              key={`${question.id}-${shakeKey}`}
              question={question}
              widthCount={board.widthCount}
              heightCount={board.heightCount}
              onChange={handleBoardChange}
              showCheckBadge={status === 'correct'}
              shake={shakeKey > 0 && status === 'editing'}
              interactive={status === 'editing'}
            />
            {status === 'editing' && (
              <div className="board-footer-row">
                <StartOverControl onClick={handleStartOver} enabled={touched} />
              </div>
            )}
          </div>
        </div>
      )}

      {showFeedback && (
        <FeedbackBanner
          kind={feedback.kind}
          title={feedback.title}
          message={feedback.message}
        />
      )}

      <FooterBar
        mode={footerMode}
        canCheck={canCheck}
        onCheck={handleCheck}
        onWhy={handleWhy}
        onContinue={handleContinue}
        xpReward={XP_PER_CORRECT}
      />
    </AppShell>
  );
}
