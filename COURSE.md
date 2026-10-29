# Robotics in 6 Months — course site

A Skilljar-style course built from the Notion plan **Robotics in 6 Months**: 6 modules (months) → 4 sections
(weeks) → 7 days each. Every day has three lessons, and every section ends with a quiz:

| Lesson | What it is |
|---|---|
| ▶ **Video** | An animated HTML "video" (5–15 min) narrated by a robotic open-source voice, with captions, chapters, seeking, speed and a transcript |
| ☰ **Reading** | The day's goal, the exact article text from Notion, key takeaways and all resource links |
| ⚒ **Hands-on** | The Notion checklist with saved ticks, plus the log: status, hours, confidence, practice task, what broke |
| ✓ **Quiz** | Questions from the section's days; 70% to pass |

The home page (`index.html`) tracks everything: overall and per-module progress, the next lesson, hours logged,
a **Schedule** table of all 168 days (same fields as the Notion Daily Plan, no dates), the **Gear** list with
order status, and settings (voice, export/import/reset progress). Progress lives in the browser's
localStorage.

## Run it

It is a static site. Serve the folder with any static server (Web Workers don't load from `file://`):

```bash
cd AliveDOCS
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

The course is plain static files at the repo root, so Pages can serve it directly:

1. Push the branch you want to publish (for example `main`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, then pick that branch and the `/ (root)` folder.
3. Open `https://<your-user>.github.io/<repo>/`. The dashboard is `index.html`; lessons are `lesson.html?id=...`.

All paths are relative, so it works under the `/<repo>/` sub-path. The empty `.nojekyll` file tells Pages to serve the files as-is. Progress is saved in each visitor's browser (localStorage).

## How the videos work

- Each day's script is written in `data/m*.js` in a small text format: `## Scene title`, then visual lines
  (`@svg name`, `@eq formula | caption`, `@big text | sub`, `- bullet`, `| table |`, fenced code) and narration.
- `js/course.js` adds generated scenes around it: an intro with the day's goal, the article text from Notion,
  the hands-on checklist, the resources and the key takeaways.
- `js/video.js` splits narration into sentences and synthesises each one with **meSpeak** (an open-source GPL
  port of eSpeak) inside a Web Worker (`js/tts-worker.js`). Because each sentence has an exact duration,
  captions, bullet reveals, chapters and seeking stay in sync. Voices: Settings tab or the player's Voice menu.
- `js/diagrams.js` holds the animated SVG diagrams (circuits, PWM, H-bridge, PID loop, gears, TF tree, SLAM…).

`tools/check.mjs` reports every day's estimated video length (`node tools/check.mjs [module]`).
`tools/build-mespeak.sh` rebuilds `vendor/mespeak/` from npm.
