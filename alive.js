// AliveDOCS listener: cut any audio stream (mic or a playing video) into phrases on short pauses,
// send each phrase to the server, and report which slide Jev picked.
const SILENCE = 0.04, PAUSE_MS = 450, MAX_MS = 5000, MIN_MS = 300;

// deck() → { title, scenes: {id: description}, current }
// onResult({ text, choice, confidence, error }), onLevel(0..1) for a meter.
export function listen(stream, analyser, { deck, onResult, onLevel = () => {} }) {
  const buf = new Float32Array(analyser.fftSize);
  let on = true, rec = null, parts, started, lastLoud, sent = 0, applied = 0, previous = "";

  // Start recording when the level rises; stop on a short pause (or MAX_MS) and send that phrase.
  const meter = setInterval(() => {
    if (!on) { clearInterval(meter); if (rec) rec.stop(); return; }
    analyser.getFloatTimeDomainData(buf);
    let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v));
    onLevel(peak);
    const now = performance.now();
    if (peak > SILENCE) lastLoud = now;
    if (!rec && peak > SILENCE) {
      rec = new MediaRecorder(stream); parts = []; started = now;
      const r = rec, p = parts;
      r.ondataavailable = (e) => p.push(e.data);
      r.onstop = () => { if (r.spoke >= MIN_MS) send(new Blob(p, { type: r.mimeType })); };
      r.start();
    } else if (rec && (now - lastLoud > PAUSE_MS || now - started > MAX_MS)) {
      rec.spoke = lastLoud - started; rec.stop(); rec = null;
    }
  }, 50);

  async function send(blob) {
    const id = ++sent;
    const { title, scenes, current } = deck();
    const form = new FormData();
    form.append("audio", blob);
    form.append("title", title);
    form.append("scenes", JSON.stringify(scenes));
    form.append("current", current);
    form.append("previous", previous);
    const result = await fetch("/listen", { method: "POST", body: form }).then((r) => r.json()).catch((e) => ({ error: e.message }));
    if (id < applied) return;                 // a newer phrase already moved the slide
    applied = id;
    if (result.text) previous = result.text;
    onResult(result);
  }

  return () => { on = false; };
}
