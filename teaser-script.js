// DS2 style hold-to-activate button
document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.getElementById("hold-activate");
  const ring  = document.getElementById("hold-activate-progress");
  const bezel = document.getElementById("hold-activate-bezel");
  if (!btn || !ring || !bezel) return;

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
  const HOLD_MS = 1500;                       // ~2s like DS2
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

  const tick = (t) => {
    if (!holding) return;
    if (!t0) t0 = t;
    const frac = Math.min((t - t0) / HOLD_MS, 1);
    setFifthProgress(frac);
    if (frac >= 1) {
      try { navigator.vibrate?.(15); } catch {}
      stop(false);
      window.location.href = "/app/";         // success → go to app
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const down = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
    if (holding) return;
    holding = true; t0 = 0;
    raf = requestAnimationFrame(tick);
  };
  const up = (e) => {
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
    stop(true);
  };

  // Pointer + keyboard (Space/Enter)
  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointercancel", up);
  btn.addEventListener("pointerleave", () => stop(true));

  btn.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "Space" || e.code === "Enter") {
      if (!holding) { holding = true; t0 = 0; raf = requestAnimationFrame(tick); }
      e.preventDefault();
    }
  });
  btn.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.code === "Enter") { stop(true); e.preventDefault(); }
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
