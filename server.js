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

// 2) Jev picks which slide should be on screen. The page sends its own slide list,
//    so the same server drives any deck.
async function decide({ title, scenes, current, previous, said }) {
  const res = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: { Authorization: `Bearer ${JEV_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "jev-latest",
      state: { presentation: title, current_slide: current, said_before: previous, just_said: said },
      questions: {
        slide: {
          type: "choice",
          instructions:
            "A speaker is giving `presentation` while slides play behind them. " +
            "Based on `just_said` (with `said_before` as context), which slide should be on screen now? " +
            "The screen currently shows `current_slide`.",
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
  const { answers } = await res.json();

  // Forward only: moving to an earlier slide needs an explicit "go back" from the speaker.
  const order = Object.keys(scenes);
  const { choice, confidence } = answers.slide;
  const backwards = choice === "back" || order.indexOf(choice) < order.indexOf(current);
  if (backwards && answers.go_back.noul < 0.5) return { choice: "none", confidence, blocked: choice };
  return { choice, confidence };
}

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "POST" && req.url === "/listen") {
        // multipart form: audio, title, scenes (JSON), current, previous
        const form = await new Request("http://x", {
          method: "POST", headers: req.headers, body: Readable.toWeb(req), duplex: "half",
        }).formData();
        const said = await transcribe(form.get("audio"));
        const decision = said
          ? await decide({
              said,
              title: form.get("title"),
              scenes: JSON.parse(form.get("scenes")),
              current: form.get("current"),
              previous: form.get("previous") || "",
            })
          : null;
        console.log(JSON.stringify(said), "→", decision?.choice, decision?.confidence, decision?.blocked ? `(blocked going back to ${decision.blocked})` : "");
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
