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

  // Select an audio type based on support
  function pickSfxUrl() {
    const a = document.createElement('audio');
    return a.canPlayType('audio/mp4; codecs="mp4a.40.2"')
      ? '/sfx/activate.m4a'
      : '/sfx/activate.mp3';
  }

  // Preload immediately after DOM is ready: fetch + offline decode (no gesture needed)
  (async function preloadSfx() {
    try {
      const resp = await fetch(pickSfxUrl(), { cache: 'force-cache' });
      audioArrayBuffer = await resp.arrayBuffer();

      // Decode without spinning up a real AudioContext (works before a gesture)
      if ('OfflineAudioContext' in window) {
        const oac = new OfflineAudioContext(1, 1, 44100);
        // .slice() to give decode a standalone buffer and avoid neutering our cached one
        audioBuffer = await oac.decodeAudioData(audioArrayBuffer.slice(0));
      }
    } catch (err) {
      console.warn('SFX preload failed:', err);
    }
  })();

  async function ensureContextResumed() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state !== 'running') {
      await audioCtx.resume(); // iOS requires this inside a gesture
    }
  }

  // start immediately on press
  async function startSfx() {
    try {
      await ensureContextResumed();

      // If we don’t have a decoded buffer yet (e.g., slow network), fetch/decode now on the live context
      if (!audioBuffer) {
        if (!audioArrayBuffer) {
          const resp = await fetch(pickSfxUrl(), { cache: 'force-cache' });
          audioArrayBuffer = await resp.arrayBuffer();
        }
        audioBuffer = await audioCtx.decodeAudioData(audioArrayBuffer.slice(0));
      }

      // Create a one-shot source and start slightly in the future to avoid clipped attack
      currentSource = audioCtx.createBufferSource();
      currentSource.buffer = audioBuffer;
      currentSource.connect(audioCtx.destination);
      currentSource.start(audioCtx.currentTime + 0.02); // 20ms scheduling cushion
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
      
      // Let the SFX finish. If it already ended, navigate now.
      const go = () => (window.location.href = '/app/');
      
      if (currentSource) {
        // if still playing, wait for buffer finish, then vámonos!
        const src = currentSource;
        src.onended = () => {
          if (src === currentSource) currentSource = null;
          go();
        };      
        // safety timeout in case 'onended' doesn't fire (edge cases); go shortly after duration
        const ms = Math.ceil((audioBuffer?.duration ?? 1.3) * 1000) + 50;
        setTimeout(go, ms);
      } else {
        go(); // SFX already finished → navigate immediately
      }

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
    startSfx();   // <— start sound immediately, just like in DS2
    raf = requestAnimationFrame(tick);
  };

  // pointer up/cancel before completion: cancel hold + stop SFX
  const up = (e) => {
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
    const wasHolding = holding;         // to decide SFX stop
    stop(true);
    if (!completed && wasHolding) stopSfx();   // <— cut sound instantly if released early
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
