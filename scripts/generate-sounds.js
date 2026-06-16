/* eslint-disable */
/**
 * generate-sounds.js
 * ------------------
 * Procedurally synthesizes the two retro game sound effects used by the
 * website and writes them as MP3 files into /public/sounds/:
 *
 *   - static.mp3 : a "broken TV / no-signal" white-noise + low hum burst
 *                  used by PageTransition when the site redirects to a
 *                  new page.
 *   - click.mp3  : a short two-stage "beep + click" retro game button
 *                  sound used everywhere a button is clicked.
 *   - hover.mp3  : a very short, soft "tick" used as the hover sound
 *                  on links and buttons throughout the site.
 *
 * The script is fully self-contained: it uses lamejs (pure-JS MP3
 * encoder, no native deps) to encode Float32 PCM -> MP3. It is meant
 * to be run ONCE during initial setup and re-run whenever the sound
 * design needs to change. It is safe to delete the script after use
 * (the generated MP3s are the only artifact the app needs).
 *
 * Usage:
 *     npm install --no-save @breezystack/lamejs
 *     node scripts/generate-sounds.js
 */

const fs = require("fs");
const path = require("path");

// @breezystack/lamejs is an ESM-only module (an actively maintained fork
// of the abandoned "lamejs" package that fixes a ReferenceError in the
// upstream code). We dynamically import it so this CommonJS script can
// keep using require() for the rest of its dependencies.
const lamejsPromise = import("@breezystack/lamejs").then((m) => m.Mp3Encoder);

// ---------- shared config ----------
const SAMPLE_RATE = 44100; // 44.1 kHz
const BITRATE_KBPS = 128; // 128 kbps mono MP3
const OUT_DIR = path.join(__dirname, "..", "public", "sounds");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ---------- tiny math helpers ----------
const TAU = Math.PI * 2;

function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

// Linear-interpolated envelope: shape = array of {t, v} in seconds, returns
// the value v at time t. Past the last point it returns the last value.
function envelope(t, shape) {
  if (t <= shape[0].t) return shape[0].v;
  if (t >= shape[shape.length - 1].t) return shape[shape.length - 1].v;
  for (let i = 0; i < shape.length - 1; i++) {
    const a = shape[i],
      b = shape[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t);
      return a.v + (b.v - a.v) * k;
    }
  }
  return 0;
}

// Mulberry32 — tiny, deterministic PRNG. We seed it so the static
// noise sounds the same every time the script is run (handy when
// comparing tweaks).
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- MP3 encoder wrapper ----------
// `Mp3Encoder` is resolved asynchronously (the package is ESM). We
// keep the synchronous-looking encodeMp3() API by awaiting the
// constructor once and caching it on the module.
let Mp3EncoderCtor = null;
async function getEncoderCtor() {
  if (!Mp3EncoderCtor) Mp3EncoderCtor = await lamejsPromise;
  return Mp3EncoderCtor;
}

async function encodeMp3(float32Samples, sampleRate = SAMPLE_RATE, kbps = BITRATE_KBPS) {
  const Mp3Encoder = await getEncoderCtor();
  const encoder = new Mp3Encoder(1, sampleRate, kbps);
  const CHUNK = 1152; // MP3 frame size for mono
  const buffer = [];
  for (let i = 0; i < float32Samples.length; i += CHUNK) {
    const slice = float32Samples.slice(i, i + CHUNK);
    // Convert float32 [-1, 1] to int16
    const int16 = new Int16Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      const s = clamp(slice[j], -1, 1);
      int16[j] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const mp3buf = encoder.encodeBuffer(int16);
    if (mp3buf.length > 0) buffer.push(Buffer.from(mp3buf));
  }
  const tail = encoder.flush();
  if (tail.length > 0) buffer.push(Buffer.from(tail));
  return Buffer.concat(buffer);
}

// ---------- 1) static.mp3 : broken TV / no-signal burst ----------
/**
 * Layered sound design:
 *   1. White noise — wide-band, the "snow" of a detuned TV
 *   2. Low-frequency hum (60 Hz + 120 Hz) — CRT flyback whine
 *   3. Occasional "click/pop" transients — the signal breaking up
 *   4. A gentle high-pass sweep near the end — "tuning out"
 *
 * Total length: ~0.55s (matches the 450 ms exit + a small tail).
 */
function synthesizeStatic(durationSec = 0.55) {
  const N = Math.floor(durationSec * SAMPLE_RATE);
  const out = new Float32Array(N);
  const rng = mulberry32(0xc0ffee);

  // Pre-generate a buffer of band-limited pinkish noise (white noise
  // averaged across 3 samples gives a slightly warmer, less harsh
  // "static" — closer to what an analog TV sounded like).
  const noise = new Float32Array(N);
  let last = 0;
  for (let i = 0; i < N; i++) {
    const w = rng() * 2 - 1; // white [-1, 1]
    const s = (w + last) * 0.5; // 1-pole LPF ~3 kHz-ish feel
    last = w;
    noise[i] = s;
  }

  // Crackle / pop transients — sparse, loud, short clicks.  Pre-roll
  // a list of (time, amplitude) pairs and add a tiny exponentially
  // decaying click at each.
  const pops = [];
  const popCount = 6;
  for (let i = 0; i < popCount; i++) {
    pops.push({
      t: 0.05 + rng() * (durationSec - 0.15),
      amp: 0.25 + rng() * 0.35,
      decay: 0.002 + rng() * 0.004,
    });
  }

  for (let i = 0; i < N; i++) {
    const t = i / SAMPLE_RATE;

    // White noise, slightly band-limited, with a quick fade-in/out so
    // the burst doesn't click at its boundaries.
    const fade = envelope(t, [
      { t: 0.0, v: 0.0 },
      { t: 0.01, v: 1.0 },
      { t: durationSec - 0.05, v: 1.0 },
      { t: durationSec, v: 0.0 },
    ]);
    const noisePart = noise[i] * 0.55 * fade;

    // CRT flyback hum: 60 Hz fundamental + 120 Hz harmonic, slowly
    // detuned for a "broken" feel.
    const detune = 1 + 0.01 * Math.sin(t * 9.0); // ±1% wobble
    const hum60 = Math.sin(TAU * 60 * detune * t) * 0.18;
    const hum120 = Math.sin(TAU * 120 * detune * t) * 0.08;
    const humPart = (hum60 + hum120) * fade * 0.7;

    // Crackle layer
    let popPart = 0;
    for (const p of pops) {
      const dt = t - p.t;
      if (dt >= 0 && dt < 0.02) {
        popPart += p.amp * Math.exp(-dt / p.decay) * (rng() * 2 - 1);
      }
    }

    // Mix
    out[i] = noisePart + humPart + popPart * 0.7;
  }

  // Soft-clip to keep peaks from clipping when summed
  for (let i = 0; i < N; i++) {
    out[i] = Math.tanh(out[i] * 1.1) * 0.9;
  }

  return out;
}

// ---------- 2) click.mp3 : two-stage game-button sound ----------
/**
 * Layered sound design:
 *   Stage A (0 - 25 ms): a short 1 kHz "beep" with a quick pitch
 *                        down-glide (classic NES / arcade confirm).
 *   Stage B (20 - 90 ms): a noise burst with a band-pass-like
 *                        spectral shape, the "click" of a tactile
 *                        button being pressed.
 *   Master envelope: very fast attack, fast decay, total ~90 ms.
 *
 * Designed to feel punchy but not annoying when fired many times in
 * a row (e.g. navigating the nav menu).
 */
function synthesizeClick(durationSec = 0.1) {
  const N = Math.floor(durationSec * SAMPLE_RATE);
  const out = new Float32Array(N);
  const rng = mulberry32(0xbadc0de);

  let beepPhase = 0;

  // Pre-generate white noise for the click stage.
  const noise = new Float32Array(N);
  for (let i = 0; i < N; i++) noise[i] = rng() * 2 - 1;

  for (let i = 0; i < N; i++) {
    const t = i / SAMPLE_RATE;

    // ---- Beep (sine sweep) ----
    // Start at 1100 Hz, glide down to 800 Hz over 25 ms.
    const f0 = 1100;
    const f1 = 800;
    const sweep = 0.025;
    const fk = t < sweep ? f0 + (f1 - f0) * (t / sweep) : f1;
    beepPhase += (TAU * fk) / SAMPLE_RATE;
    const beep = Math.sin(beepPhase) * 0.55;

    // Envelope for beep: attack 2 ms, hold 6 ms, decay 30 ms
    const beepEnv = envelope(t, [
      { t: 0.0, v: 0.0 },
      { t: 0.002, v: 1.0 },
      { t: 0.008, v: 0.8 },
      { t: 0.04, v: 0.0 },
    ]);

    // ---- Click (filtered noise burst) ----
    // Single-pole high-pass via a 2-tap differentiator: y[n] = x[n] - x[n-1]
    // Approximates "brighter" noise that sits in the 2-8 kHz region.
    const hp =
      i === 0
        ? noise[i]
        : (noise[i] - noise[i - 1]) * 0.7;
    // The click attack is delayed 2 ms so the beep leads slightly,
    // giving the ear two distinct events.
    const clickDelay = 0.002;
    const tc = t - clickDelay;
    const click = tc < 0 ? 0 : hp * 0.45;

    // Envelope for click: attack 1 ms, decay 40 ms
    const clickEnv =
      tc < 0
        ? 0
        : envelope(tc, [
            { t: 0.0, v: 0.0 },
            { t: 0.001, v: 1.0 },
            { t: 0.05, v: 0.0 },
          ]);

    // ---- Master envelope (short overall fade-out to avoid edge pops) ----
    const master = envelope(t, [
      { t: 0.0, v: 0.0 },
      { t: 0.001, v: 1.0 },
      { t: durationSec - 0.005, v: 1.0 },
      { t: durationSec, v: 0.0 },
    ]);

    out[i] = (beep * beepEnv + click * clickEnv) * master;
  }

  // Soft-clip + small DC bias removal
  let sum = 0;
  for (let i = 0; i < N; i++) sum += out[i];
  const dc = sum / N;
  for (let i = 0; i < N; i++) {
    out[i] = Math.tanh((out[i] - dc) * 1.2) * 0.9;
  }

  return out;
}

// ---------- 3) hover.mp3 : soft "tick" for link/button hover ----------
/**
 * Layered sound design:
 *   Stage A: a high-pitched triangle-wave blip (~1.8 kHz) with a
 *            quick downward pitch glide over ~15 ms. Triangle waves
 *            have a soft, "blippy" character that reads as UI
 *            feedback rather than a musical note.
 *   Stage B: a tiny burst of high-passed noise to give the blip a
 *            tactile "edge" (so it doesn't sound like a pure synth
 *            tone).
 *   Master envelope: very short attack, fast decay, total ~55 ms.
 *   Amplitude: kept LOW (~0.35) so it can fire many times in a row
 *            (e.g. sweeping across a nav menu) without being
 *            annoying.
 *
 * The useSound hook enforces an additional cooldown on its end to
 * prevent retriggering when the mouse wiggles inside one element.
 */
function synthesizeHover(durationSec = 0.055) {
  const N = Math.floor(durationSec * SAMPLE_RATE);
  const out = new Float32Array(N);
  const rng = mulberry32(0xfeed);

  let blipPhase = 0;

  // Pre-generate white noise for the click stage.
  const noise = new Float32Array(N);
  for (let i = 0; i < N; i++) noise[i] = rng() * 2 - 1;

  for (let i = 0; i < N; i++) {
    const t = i / SAMPLE_RATE;

    // ---- Triangle blip with downward pitch glide ----
    // Start at 1.8 kHz, glide down to 1.2 kHz over 15 ms. A triangle
    // wave at these frequencies is perceived as a clean UI blip.
    const f0 = 1800;
    const f1 = 1200;
    const sweep = 0.015;
    const fk = t < sweep ? f0 + (f1 - f0) * (t / sweep) : f1;
    blipPhase += (TAU * fk) / SAMPLE_RATE;
    
    const triRaw = Math.sin(blipPhase);
    const tri = (2 / Math.PI) * Math.asin(triRaw) * 0.45;

    // Envelope for blip: attack 1 ms, hold 3 ms, decay 25 ms
    const blipEnv = envelope(t, [
      { t: 0.0, v: 0.0 },
      { t: 0.001, v: 1.0 },
      { t: 0.004, v: 0.7 },
      { t: 0.03, v: 0.0 },
    ]);

    // ---- Noise "edge" ----
    // High-passed noise delayed 1 ms so the blip leads.
    const hp =
      i === 0
        ? noise[i]
        : (noise[i] - noise[i - 1]) * 0.6;
    const edgeDelay = 0.001;
    const tc = t - edgeDelay;
    const edge = tc < 0 ? 0 : hp * 0.18;

    const edgeEnv =
      tc < 0
        ? 0
        : envelope(tc, [
            { t: 0.0, v: 0.0 },
            { t: 0.0005, v: 1.0 },
            { t: 0.025, v: 0.0 },
          ]);

    // ---- Master envelope (avoid edge pops) ----
    const master = envelope(t, [
      { t: 0.0, v: 0.0 },
      { t: 0.0005, v: 1.0 },
      { t: durationSec - 0.005, v: 1.0 },
      { t: durationSec, v: 0.0 },
    ]);

    out[i] = (tri * blipEnv + edge * edgeEnv) * master;
  }

  // Soft-clip + small DC bias removal. Note: tanh drive kept low
  // (0.8) so the soft character of the blip is preserved.
  let sum = 0;
  for (let i = 0; i < N; i++) sum += out[i];
  const dc = sum / N;
  for (let i = 0; i < N; i++) {
    out[i] = Math.tanh((out[i] - dc) * 0.8) * 0.55;
  }

  return out;
}

// ---------- run ----------
async function writeMp3(filename, samples) {
  const buf = await encodeMp3(samples);
  const full = path.join(OUT_DIR, filename);
  fs.writeFileSync(full, buf);
  console.log(
    `  ✔ wrote ${filename}  (${(buf.length / 1024).toFixed(1)} kB, ${(samples.length / SAMPLE_RATE).toFixed(3)}s @ ${BITRATE_KBPS}kbps)`,
  );
}

(async () => {
  console.log("Generating retro game sound effects →", OUT_DIR);
  await writeMp3("static.mp3", synthesizeStatic(0.55));
  await writeMp3("click.mp3", synthesizeClick(0.1));
  await writeMp3("hover.mp3", synthesizeHover(0.055));
  console.log("Done.");
})().catch((err) => {
  console.error("Sound generation failed:", err);
  process.exit(1);
});
