import React from 'react';
import CheckButton from './CheckButton.jsx';
import SuccessTray from './SuccessTray.jsx';

export default function FooterBar({
  mode,           // 'check' | 'success' | 'continue'
  canCheck,
  onCheck,
  onWhy,
  onContinue,
  xpReward
}) {
  return (
    <footer className={`footer ${mode === 'success' ? 'is-success' : ''}`}>
      {mode === 'check' && (
        <CheckButton enabled={canCheck} onClick={onCheck} />
      )}
      {mode === 'success' && (
        <SuccessTray xp={xpReward} onWhy={onWhy} onContinue={onContinue} />
      )}
      {mode === 'continue' && (
        <CheckButton enabled onClick={onContinue} label="Continue" />
      )}
    </footer>
  );
}
