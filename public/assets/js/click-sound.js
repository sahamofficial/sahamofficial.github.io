/**
 * Click Sound
 * -----------
 * Plays a short, subtle physical "mouse click" on interactive elements. The
 * sound is synthesized with the Web Audio API (a burst of filtered noise, like a
 * real mouse-button switch), so there is no audio file to host and it works
 * offline.
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

  // A short mono buffer of white noise, reused for every click. This is the
  // raw material for the mechanical "clack" of a mouse switch.
  var noiseBuffer = null;

  function getNoiseBuffer(ac) {
    if (!noiseBuffer) {
      var length = Math.floor(ac.sampleRate * 0.05); // ~50ms of noise
      noiseBuffer = ac.createBuffer(1, length, ac.sampleRate);
      var data = noiseBuffer.getChannelData(0);
      for (var i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return noiseBuffer;
  }

  // One percussive noise transient — a single mechanical tick.
  function tick(ac, startTime, peak, freq) {
    var src = ac.createBufferSource();
    src.buffer = getNoiseBuffer(ac);

    // Band-pass shapes the noise into the "click" timbre of a plastic switch.
    var filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    filter.Q.value = 0.8;

    var gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peak, startTime + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    src.start(startTime);
    src.stop(startTime + 0.03);
  }

  function playClick() {
    if (muted) return;
    var ac = getContext();
    if (!ac) return;

    var now = ac.currentTime;

    // Two very fast transients — the button "press" and "release" — give the
    // characteristic double-snap of a real mouse click.
    tick(ac, now, 0.35, 2600);
    tick(ac, now + 0.028, 0.18, 2000);
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
