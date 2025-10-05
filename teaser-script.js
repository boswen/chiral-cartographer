// DS2 style hold-to-activate button
document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.getElementById("hold-activate");
  const ring  = document.getElementById("hold-activate-progress");
  const bezel = document.getElementById("hold-activate-bezel");

  if (!btn || !ring || !bezel) return;

  // --- Instant SFX with offline decode preload (mobile + desktop safe) ---
  let audioCtx = null;            // live AudioContext for playback
  let audioBuffer = null;         // decoded, ready-to-play buffer
  let audioArrayBuffer = null;    // raw file bytes (fallback if offline decode fails)
  let currentSource = null;       // currently playing source node
  let audioFetchPromise = null;   // tracks outstanding fetch
  let audioDecodePromise = null;  // tracks outstanding decode
  let fallbackAudioEl = null;     // HTMLAudioElement fallback when buffer is not ready

  // Select an audio type based on support
  function pickSfxUrl() {
    const a = document.createElement('audio');
    return a.canPlayType('audio/mp4; codecs="mp4a.40.2"')
      ? '/sfx/activate.m4a'
      : '/sfx/activate.mp3';
  }
  const sfxUrl = pickSfxUrl();

  function ensureSfxFetch() {
    if (audioFetchPromise) return audioFetchPromise;
    audioFetchPromise = fetch(sfxUrl, { cache: 'force-cache' })
      .then(r => r.arrayBuffer())
      .then(bytes => {
        audioArrayBuffer = bytes;
        return bytes;
      })
      .catch(err => {
        console.warn('SFX preload fetch failed:', err);
        audioArrayBuffer = null;
        throw err;
      });
    return audioFetchPromise;
  }

  function ensureFallbackAudio() {
    if (!fallbackAudioEl) {
      fallbackAudioEl = new Audio(sfxUrl);
      fallbackAudioEl.preload = 'auto';
      fallbackAudioEl.crossOrigin = 'anonymous';
      fallbackAudioEl.playsInline = true;
    }
    return fallbackAudioEl;
  }

  function decodeWithAudioContext() {
    if (!audioCtx) return Promise.resolve(null);
    if (audioBuffer) return Promise.resolve(audioBuffer);
    if (audioDecodePromise) return audioDecodePromise;

    const sourcePromise = audioArrayBuffer
      ? Promise.resolve(audioArrayBuffer)
      : ensureSfxFetch();

    audioDecodePromise = sourcePromise
      .then(bytes => {
        if (!bytes) return null;
        return audioCtx.decodeAudioData(bytes.slice(0));
      })
      .then(buffer => {
        audioBuffer = buffer;
        return buffer;
      })
      .catch(err => {
        console.warn('SFX decode failed:', err);
        audioBuffer = null;
        return null;
      })
      .finally(() => {
        audioDecodePromise = null;
      });

    return audioDecodePromise;
  }

  // Preload immediately after DOM is ready: fetch raw bytes only
  (function preloadSfx() {
    ensureSfxFetch().catch(() => {});
  })();

  // start immediately on press - FIXED for mobile
  function startSfx() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      const playBuffer = (buffer) => {
        if (!buffer || !audioCtx) return false;

        if (fallbackAudioEl && !fallbackAudioEl.paused) {
          try {
            fallbackAudioEl.pause();
            fallbackAudioEl.currentTime = 0;
          } catch {}
        }

        if (currentSource) {
          try {
            currentSource.stop(0);
            currentSource.disconnect();
          } catch {}
        }

        currentSource = audioCtx.createBufferSource();
        currentSource.buffer = buffer;
        currentSource.connect(audioCtx.destination);
        currentSource.start(0);
        return true;
      };

      const resumePromise = (audioCtx.state === 'suspended' && typeof audioCtx.resume === 'function')
        ? audioCtx.resume().catch(err => {
            console.warn('Audio resume failed:', err);
            return null;
          })
        : Promise.resolve();

      // Kick off fetch early (does nothing if already started)
      ensureSfxFetch();

      if (playBuffer(audioBuffer)) {
        return;
      }

      resumePromise.then(() => {
        decodeWithAudioContext()
          .then(buffer => {
            if (!buffer) return;
            if (!holding) return;
            if (fallbackAudioEl && !fallbackAudioEl.paused) return;
            playBuffer(buffer);
          })
          .catch(() => {});
      });

      const fallback = ensureFallbackAudio();
      fallback.currentTime = 0;
      const playPromise = fallback.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(err => console.warn('Fallback audio failed:', err));
      }
    } catch (err) {
      console.warn('SFX start failed:', err);
    }
  }

  // stop immediately (for early release)
  function stopSfx() {
    try {
      if (currentSource) {
        // stop now; no error if it already ended
        currentSource.stop(0);
        currentSource.disconnect();
        currentSource = null;
      }
      if (fallbackAudioEl && !fallbackAudioEl.paused) {
        fallbackAudioEl.pause();
        fallbackAudioEl.currentTime = 0;
      }
    } catch {}
  }

  // ---- geometry (keep in sync with SVG) ----
  const RADIUS = 30;                          // matches r in the SVG
  const CIRC   = 2 * Math.PI * RADIUS;

  // ---- Bezel: 5 segments with thin gaps + rounded caps ----
  const SEGMENTS = 5;
  const STROKE   = 6;           // must match the SVG stroke-width on the bezel
  // Choose how thin you want the gaps (smaller = thinner). Start with 1/60 of the circumference.
  let gap = CIRC / 60;

  // With stroke-linecap="round", each end adds ~STROKE/2 roundness,
  // which visually eats into the gap from both sides.
  // If your gaps look too thin, bump the gap a bit to compensate:
  gap += STROKE * 1;          // tweak or remove if not needed

  const seg = (CIRC / SEGMENTS) - gap;  // fill the rest of each fifth with the segment
  bezel.style.strokeDasharray = `${seg} ${gap}`;
  bezel.style.strokeLinecap   = 'round';

  // Optional: center a gap at the 12 o'clock marker (under the triangle)
  bezel.style.strokeDashoffset = gap / 2;

  // Progress ring start (fully hidden)
  ring.style.strokeDasharray  = CIRC;
  ring.style.strokeDashoffset = CIRC;

  // Hold behavior
  const HOLD_MS = 1500;                       // Under two seconds, like in DS2
  let completed = false;
  let raf = null, t0 = 0, holding = false;

  const setFifthProgress = (frac) => {
    // snap to 0, .25, .5, .75, 1
    const q = Math.min(Math.floor(frac * 5) / 5, 1);
    ring.style.strokeDashoffset = CIRC * (1 - q);

    // subtle color ramp (disabled; change colors as desired)
    ring.style.stroke =
      q >= 1   ? "rgb(70 165 242)"    // "APAS Blue"
    : q >= 0.8 ? "rgb(70 165 242)"    // APAS Blue
    : q >= 0.6 ? "rgb(70 165 242)"    // APAS Blue
    : q >= 0.4 ? "rgb(70 165 242)"    // APAS Blue
    : q >= 0.2 ? "rgb(70 165 242)"    // APAS Blue
               : "rgb(70 165 242)";   // APAS Blue
  };

  const stop = (reset=true) => {
    holding = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null; t0 = 0;
    if (reset) setFifthProgress(0);
  };

  // Animation frame loop
  const tick = (t) => {
    if (!holding) return;
    if (!t0) t0 = t;
    const frac = Math.min((t - t0) / HOLD_MS, 1);
    setFifthProgress(frac);

    if (frac >= 1) {
      completed = true;
      try { navigator.vibrate?.(15); } catch {}
      
      // go now; optional tiny cushion so the click isn't cut instantly
      setTimeout(() => { window.location.href = '/app/'; }, 75);

      stop(false);
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  // pointer down: begin hold + start SFX
  const down = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
    if (holding) return;
    holding = true; t0 = 0; completed = false;
    startSfx();   // start sound immediately (async covers mobile first-press)
  
    // temp fix w/ basic audio element
    // let audioEl = new Audio(sfxUrl);
    // audioEl.preload = 'auto';
    // audioEl.currentTime = 0;
    // audioEl.play();
  
    raf = requestAnimationFrame(tick);
  };

  // pointer up/cancel before completion: cancel hold + stop SFX
  const up = (e) => {
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
    const wasHolding = holding;         // to decide SFX stop
    stop(true);
    if (!completed && wasHolding) stopSfx();   // cut sound instantly if the hold ends early
  };

  // Pointer + keyboard (Space/Enter) listeners
  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointercancel", up);
  btn.addEventListener('pointerleave', () => { if (!completed) { stop(true); stopSfx(); } });

  // keyboard (Space/Enter) can mimic the same behavior:
  btn.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "Space" || e.code === "Enter") {
      if (!holding) { holding = true; t0 = 0; completed = false; startSfx(); raf = requestAnimationFrame(tick); }
      e.preventDefault();
    }
  });
  btn.addEventListener("keyup", (e) => {
    if (e.code === 'Space' || e.code === 'Enter') { const wasHolding = holding; stop(true); if (!completed && wasHolding) stopSfx(); e.preventDefault(); }
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
