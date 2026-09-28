// Tiny server: serves the pages and turns one spoken phrase into a slide decision.
// Keys stay here (from .env), never in the browser.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";

try { process.loadEnvFile(".env"); } catch {}
const SARVAM_KEY = process.env.SARVAM_API_KEY;
const JEV_KEY = process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY;
const PORT = process.env.PORT || 3000;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };

// 1) Speech to text with Sarvam (saaras:v4 — adds global English accents; REST takes ≤30 s clips).
async function transcribe(audio) {
  // Browsers label recordings "audio/webm;codecs=opus"; Sarvam only accepts the bare type.
  const file = new Blob([await audio.arrayBuffer()], { type: audio.type.split(";")[0] || "audio/webm" });
  const form = new FormData();
  form.append("file", file, "phrase.webm");
  form.append("model", "saaras:v4");
  form.append("mode", "transcribe");
  form.append("language_code", "en-IN");
  const res = await fetch("https://api.sarvam.ai/speech-to-text", {
    method: "POST",
    headers: { "api-subscription-key": SARVAM_KEY },
    body: form,
  });
  if (!res.ok) throw new Error(`Sarvam ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.transcript || "").trim();
}

// 2) Jev reads what was said and scores every slide. The page sends its own ordered slide list
//    (descriptions may be strings or {what, not_for, examples}), so the same server drives any deck.
async function askJev({ title, scenes, current, previous, said }) {
  const order = Object.keys(scenes);
  const res = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: { Authorization: `Bearer ${JEV_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "jev-latest",
      state: {
        presentation: title,
        current_slide: current,
        upcoming_slide: order[order.indexOf(current) + 1] || "none, this is the last slide",
        said_before: previous,
        just_said: said,
      },
      questions: {
        slide: {
          type: "choice",
          instructions:
            "A speaker is giving `presentation` while slides play behind them. " +
            "Based on `just_said` (with `said_before` as context), which slide should be on screen now? " +
            "The screen currently shows `current_slide`; talks usually move on to `upcoming_slide` next.",
          criteria: {
            ...scenes,
            next: "The speaker asks to continue, move on, or go to the next part without naming it",
            back: "The speaker asks to go back to the previous part",
            none: "Filler, applause, unclear, or nothing that points to any slide",
          },
        },
        go_back: {
          type: "noul",
          instructions: "In `just_said`, is the speaker explicitly asking to go back to, return to, or show again an earlier slide or part?",
          criteria: {
            true: "A clear request to go back or revisit something, e.g. 'go back', 'let's return to', 'show that again'",
            false: "Just continuing the talk, even if it mentions or recaps something covered earlier",
          },
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Jev ${res.status}: ${await res.text()}`);
  return (await res.json()).answers;
}

// 3) Code, not the model, decides whether to move. Every rule below exists to handle ambiguity.
const MIN_CONFIDENCE = 0.5;   // Jev's own certainty about its pick
const MIN_MARGIN = 0.2;       // top slide must beat the runner-up by this much
const BIG_JUMP = 2;           // skipping more than this many slides ahead needs…
const BIG_JUMP_CONFIDENCE = 0.75, BIG_JUMP_MARGIN = 0.4;  // …a much clearer cue

export function resolve(answers, order, current) {
  const i = order.indexOf(current);
  // "next"/"back" are the same thing as naming that slide, so merge their votes before comparing.
  const p = { ...answers.slide.probabilities };
  const merge = (from, to) => { if (to) p[to] = (p[to] || 0) + (p[from] || 0); delete p[from]; };
  merge("next", order[i + 1]);
  merge("back", order[i - 1]);
  const [[top, p1], [second, p2] = ["none", 0]] = Object.entries(p).sort((a, b) => b[1] - a[1]);
  const confidence = answers.slide.confidence;
  const candidates = [[top, p1], [second, p2]];
  const stay = (reason) => ({ action: "stay", reason, confidence, candidates });

  if (top === "none") return stay("nothing that points to a slide");
  if (top === current) return stay("already on this slide");
  if (confidence < MIN_CONFIDENCE) return stay("not sure enough");
  if (p1 - p2 < MIN_MARGIN) return stay(`too close to call: ${top} vs ${second}`);
  const jump = order.indexOf(top) - i;
  if (jump < 0 && answers.go_back.noul < 0.5) return stay(`no explicit “go back” (wanted ${top})`);
  if (jump > BIG_JUMP && (confidence < BIG_JUMP_CONFIDENCE || p1 - p2 < BIG_JUMP_MARGIN))
    return stay(`big jump to ${top} needs a clearer cue`);
  return { action: "go", slide: top, reason: jump < 0 ? "asked to go back" : "matches what was said", confidence, candidates };
}

// Only start the server when run directly (tests import resolve()).
if (process.argv[1] === import.meta.filename) http
  .createServer(async (req, res) => {
    try {
      if (req.method === "POST" && req.url === "/listen") {
        // multipart form: audio, title, scenes (JSON), current, previous
        const form = await new Request("http://x", {
          method: "POST", headers: req.headers, body: Readable.toWeb(req), duplex: "half",
        }).formData();
        const said = await transcribe(form.get("audio"));
        const scenes = JSON.parse(form.get("scenes")), current = form.get("current");
        const decision = said
          ? resolve(await askJev({ said, scenes, current, title: form.get("title"), previous: form.get("previous") || "" }),
              Object.keys(scenes), current)
          : null;
        console.log(JSON.stringify(said), "→", decision?.action, decision?.slide || "", `(${decision?.reason})`);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ text: said, ...decision }));
      }

      // static files from this folder
      const file = path.join(import.meta.dirname, path.normalize(req.url === "/" ? "/index.html" : req.url.split("?")[0]));
      if (req.method === "GET" && TYPES[path.extname(file)] && file.startsWith(import.meta.dirname) && fs.existsSync(file)) {
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] });
        return res.end(fs.readFileSync(file));
      }
      res.writeHead(404).end();
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" }).end(JSON.stringify({ error: err.message }));
    }
  })
  .listen(PORT, () => console.log(`Open http://localhost:${PORT}`));
