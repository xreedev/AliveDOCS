// Tiny server: serves index.html and turns a mic chunk into a scene decision.
// Keys stay here (from .env), never in the browser.
import http from "node:http";
import fs from "node:fs";

try { process.loadEnvFile(".env"); } catch {}
const SARVAM_KEY = process.env.SARVAM_API_KEY;
const JEV_KEY = process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY;
const PORT = process.env.PORT || 3000;

// The animation states Jev chooses between. Keys must match data-scene values in index.html.
const SCENES = {
  intro: "Title / start of the story, introducing Isaac Newton",
  garden: "Young Newton at home at Woolsthorpe in 1666, plague closed Cambridge, sitting in the garden under an apple tree",
  apple: "An apple falls from the tree to the ground",
  question: "Newton wonders why things fall straight down, what pulls the apple toward the earth",
  moon: "Newton looks up at the Moon and asks whether the same pull reaches that far",
  orbit: "The Moon is constantly falling around the Earth, cannonball thought experiment, orbits",
  law: "The law of universal gravitation, the formula, force, mass, inverse square of distance",
  principia: "Newton publishes the Principia in 1687, legacy, the end of the story",
};

// 1) Speech to text with Sarvam (saarika).
async function transcribe(audio, mimeType) {
  const form = new FormData();
  form.append("file", new Blob([audio], { type: mimeType }), "chunk");
  form.append("model", "saarika:v2.5");
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

// 2) Jev decides which state the animation should be in, given what was said.
async function decide(said, current, previous) {
  const res = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: { Authorization: `Bearer ${JEV_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "jev-latest",
      state: { current_scene: current, said_before: previous, just_said: said },
      questions: {
        scene: {
          type: "choice",
          instructions:
            "A narrator is telling the story of how Newton discovered gravity while an animation plays. " +
            "Based on `just_said` (with `said_before` as context), which scene should the animation show now? " +
            "The animation is currently on `current_scene`.",
          criteria: {
            ...SCENES,
            next: "The narrator asks to continue, move on, or go to the next part without naming it",
            back: "The narrator asks to go back to the previous part",
            none: "Filler, unclear, or nothing that points to any scene",
          },
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Jev ${res.status}: ${await res.text()}`);
  const { answers } = await res.json();
  return answers.scene; // { choice, confidence, probabilities }
}

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(fs.readFileSync("index.html"));
      }
      if (req.method === "POST" && req.url.startsWith("/listen")) {
        const q = new URL(req.url, "http://x").searchParams;
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const mime = (req.headers["content-type"] || "audio/webm").split(";")[0];

        const text = await transcribe(Buffer.concat(chunks), mime);
        const decision = text ? await decide(text, q.get("scene"), q.get("prev") || "") : null;
        console.log(JSON.stringify(text), "→", decision?.choice, decision?.confidence);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ text, choice: decision?.choice, confidence: decision?.confidence }));
      }
      res.writeHead(404).end();
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" }).end(JSON.stringify({ error: err.message }));
    }
  })
  .listen(PORT, () => console.log(`Open http://localhost:${PORT}`));
