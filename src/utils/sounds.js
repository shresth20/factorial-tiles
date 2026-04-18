/**
 * Lightweight sound engine using the Web Audio API.
 * No external assets. Sounds are synthesized on demand.
 * Lazy-initialized on the first user interaction to satisfy autoplay policies.
 */

let ctx = null;
let masterGain = null;
let muted = false;
let unlockHandler = null;

function ensureCtx() {
  if (ctx) return ctx;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  ctx = new AudioCtor();
  masterGain = ctx.createGain();
  masterGain.gain.value = muted ? 0 : 1.0;
  masterGain.connect(ctx.destination);
  return ctx;
}

function resume() {
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

export function primeOnFirstGesture() {
  if (unlockHandler) return;
  unlockHandler = () => {
    ensureCtx();
    resume();
    window.removeEventListener('pointerdown', unlockHandler);
    window.removeEventListener('keydown', unlockHandler);
    unlockHandler = null;
  };
  window.addEventListener('pointerdown', unlockHandler, { once: true });
  window.addEventListener('keydown', unlockHandler, { once: true });
}

export function setMuted(m) {
  muted = m;
  if (masterGain) masterGain.gain.value = muted ? 0 : 1.0;
}

export function isMuted() {
  return muted;
}

function envelope(node, t0, { attack = 0.005, decay = 0.25, peak = 1, sustain = 0 } = {}) {
  node.gain.cancelScheduledValues(t0);
  node.gain.setValueAtTime(0, t0);
  node.gain.linearRampToValueAtTime(peak, t0 + attack);
  node.gain.exponentialRampToValueAtTime(Math.max(0.0001, sustain || 0.0001), t0 + attack + decay);
}

function tone(freq, { t = 0, duration = 0.3, type = 'sine', peak = 0.5, attack = 0.005, decay } = {}) {
  const c = ensureCtx();
  if (!c) return;
  resume();
  const start = c.currentTime + t;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  osc.connect(gain);
  gain.connect(masterGain);
  envelope(gain, start, { attack, decay: decay ?? duration, peak });
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function noiseBurst({ t = 0, duration = 0.08, peak = 0.35, filterFreq = 2000 } = {}) {
  const c = ensureCtx();
  if (!c) return;
  resume();
  const start = c.currentTime + t;
  const bufferSize = Math.max(1, Math.floor(c.sampleRate * duration));
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = filterFreq;
  filter.Q.value = 0.8;
  const gain = c.createGain();
  src.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  envelope(gain, start, { attack: 0.003, decay: duration, peak });
  src.start(start);
  src.stop(start + duration + 0.05);
}

export function playCorrect() {
  ensureCtx();
  if (!ctx) return;
  tone(659.26, { t: 0, duration: 0.28, type: 'triangle', peak: 0.55, attack: 0.003, decay: 0.28 });
  tone(987.77, { t: 0.11, duration: 0.36, type: 'triangle', peak: 0.45, attack: 0.004, decay: 0.36 });
  tone(1318.51, { t: 0.22, duration: 0.5, type: 'sine', peak: 0.38, attack: 0.004, decay: 0.5 });
}

export function playWrong() {
  const c = ensureCtx();
  if (!c) return;
  resume();
  // Classic game-show-style buzzer: two short, harsh, low-pitched blasts.
  // Square + saw through a lowpass filter reads unmistakably as "wrong"
  // without being shrill.
  const start = c.currentTime;
  const buzz = (t0, duration) => {
    const osc = c.createOscillator();
    const osc2 = c.createOscillator();
    const filter = c.createBiquadFilter();
    const gain = c.createGain();
    osc.type = 'square';
    osc2.type = 'sawtooth';
    osc.frequency.setValueAtTime(155, t0);
    osc2.frequency.setValueAtTime(78, t0);
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 1.2;
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.42, t0 + 0.008);
    gain.gain.setValueAtTime(0.42, t0 + duration - 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.start(t0);
    osc2.start(t0);
    osc.stop(t0 + duration + 0.02);
    osc2.stop(t0 + duration + 0.02);
  };
  buzz(start, 0.16);
  buzz(start + 0.22, 0.32);
}

export function playComplete() {
  ensureCtx();
  if (!ctx) return;
  // Cheerful rising arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  notes.forEach((f, i) => {
    tone(f, { t: i * 0.08, duration: 0.45, type: 'triangle', peak: 0.4, attack: 0.004, decay: 0.45 });
  });
  // Synthesized applause: a scatter of filtered noise bursts
  const total = 24;
  for (let i = 0; i < total; i++) {
    const jitter = Math.random() * 0.03;
    const filt = 1400 + Math.random() * 1600;
    noiseBurst({
      t: 0.42 + i * 0.055 + jitter,
      duration: 0.07 + Math.random() * 0.04,
      peak: 0.22 + Math.random() * 0.14,
      filterFreq: filt
    });
  }
}
