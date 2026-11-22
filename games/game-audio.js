window.GameAudio = (function () {
  let ctx = null;
  let muted = localStorage.getItem('arcadedeck_muted') === '1';

  function getCtx() {
    if (muted) return null;
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
    return ctx;
  }

  function playTone(freq, duration, type, gainVal) {
    const audio = getCtx();
    if (!audio) return;
    try {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, audio.currentTime);
      gain.gain.setValueAtTime(gainVal || 0.08, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + (duration || 0.1));
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start();
      osc.stop(audio.currentTime + (duration || 0.1));
    } catch (e) {}
  }

  return {
    isMuted: function () {
      return muted;
    },
    toggleMute: function (btn) {
      muted = !muted;
      localStorage.setItem('arcadedeck_muted', muted ? '1' : '0');
      if (btn) btn.textContent = muted ? 'Sound: Off' : 'Sound: On';
      return muted;
    },
    syncButton: function (btn) {
      if (btn) btn.textContent = muted ? 'Sound: Off' : 'Sound: On';
    },
    blip: function () {
      playTone(520, 0.07, 'triangle', 0.07);
    },
    score: function () {
      playTone(660, 0.08, 'sine', 0.08);
      setTimeout(function () { playTone(880, 0.12, 'sine', 0.08); }, 55);
    },
    hit: function () {
      playTone(300, 0.06, 'square', 0.05);
    },
    win: function () {
      playTone(523, 0.09, 'triangle', 0.08);
      setTimeout(function () { playTone(659, 0.09, 'triangle', 0.08); }, 80);
      setTimeout(function () { playTone(784, 0.16, 'triangle', 0.09); }, 160);
    },
    over: function () {
      playTone(260, 0.12, 'sawtooth', 0.06);
      setTimeout(function () { playTone(180, 0.22, 'sawtooth', 0.06); }, 100);
    }
  };
})();
