// DS2 style hold-to-activate button
document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.getElementById("hold-activate");
  const ring  = document.getElementById("hold-activate-progress");
  const bezel = document.getElementById("hold-activate-bezel");

  if (!btn || !ring || !bezel) return;

  // --- Low-latency SFX via Web Audio: prefetch & decode once, then play instantly ---
  let audioCtx;               // AudioContext
  let audioBuffer = null;     // decoded audio
  let currentSource = null;   // the playing BufferSource
  let sfxReady = false;

  function pickSfxUrl() {
    const a = document.createElement('audio');
    if (a.canPlayType('audio/mp4; codecs="mp4a.40.2"')) return '/sfx/activate.m4a'; // AAC if available
    return '/sfx/activate.mp3'; // fallback to MP3
  }

  // Select an audio type based on support
  // const SFX_URL = '/sfx/activate.m4a';
  const SFX_URL = pickSfxUrl();

  // Preload & decode ASAP after DOM is ready (so decoding can happen before a gesture)
  (async function preloadSfx() {
    try {
      const resp = await fetch(SFX_URL, { cache: 'force-cache' });
      const data = await resp.arrayBuffer();
      // Create a context just for decoding; we'll (re)use it for playback too.
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioBuffer = await audioCtx.decodeAudioData(data);
      // Save power; we'll resume on first user gesture
      if (audioCtx.state === 'running') await audioCtx.suspend();
      sfxReady = true;
    } catch (err) {
      console.warn('SFX preload failed, falling back later:', err);
    }
  })();

  // start immediately on press
  async function startSfx() {
    try {
      // Lazily create context if preload failed
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // On iOS the context is suspended until a user gesture; resume now
      if (audioCtx.state === 'suspended') await audioCtx.resume();

      // If we don’t have a decoded buffer yet (e.g., slow network), fetch/decode now
      if (!audioBuffer) {
        const resp = await fetch(SFX_URL, { cache: 'force-cache' });
        const data = await resp.arrayBuffer();
        audioBuffer = await audioCtx.decodeAudioData(data);
      }

      // Create a one-shot source and play
      currentSource = audioCtx.createBufferSource();
      currentSource.buffer = audioBuffer;
      currentSource.connect(audioCtx.destination);
      currentSource.start(0);
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
