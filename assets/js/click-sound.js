/**
 * Click Sound
 * -----------
 * Plays a short, subtle UI "click" on interactive elements. The sound is
 * synthesized with the Web Audio API, so there is no audio file to host and it
 * works offline.
 *
 * - The AudioContext is created lazily on the first user gesture (required by
 *   browser autoplay policies).
 * - A mute preference is stored in localStorage under "clickSound". Toggle it
 *   from the console or a button with:  window.clickSound.toggle()
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'clickSound';
  var ctx = null;
  var muted = false;

  try {
    muted = localStorage.getItem(STORAGE_KEY) === 'off';
  } catch (e) { /* localStorage unavailable — default to on */ }

  function getContext() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playClick() {
    if (muted) return;
    var ac = getContext();
    if (!ac) return;

    var now = ac.currentTime;

    // A crisp, high tick with a very fast decay.
    var osc = ac.createOscillator();
    var gain = ac.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // One handler for the whole page — plays on any click, anywhere.
  document.addEventListener('click', function () {
    playClick();
  }, true);

  // Small public API for muting/unmuting.
  window.clickSound = {
    mute: function () { setMuted(true); },
    unmute: function () { setMuted(false); },
    toggle: function () { setMuted(!muted); return !muted; },
    isMuted: function () { return muted; }
  };

  function setMuted(value) {
    muted = value;
    try { localStorage.setItem(STORAGE_KEY, value ? 'off' : 'on'); } catch (e) { /* ignore */ }
  }
})();
