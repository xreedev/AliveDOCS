# AliveDOCS — slides that follow the speaker

Demo: Steve Jobs' 2007 iPhone introduction. Upload the keynote clip (or talk into the mic) and the
animated deck advances on its own, from what is being said. No clicker, no cue sheet.

## How it works

1. **Listen** (`alive.js`): the audio of the playing video, or the mic, is cut into phrases at short pauses.
2. **Transcribe** (`server.js`): each phrase goes to **Sarvam** `saaras:v4` speech-to-text.
3. **Decide**: **Jev** (TypeSafe System One, `jev-latest`) gets the deck's slide descriptions, the current
   slide, and what was just said, and answers one `choice` question: which slide should be on screen
   (or `next` / `back` / `none`). Vocabulary is free, so no fixed keywords. Answers under 0.5 confidence are ignored.

Each page sends its own slide list, so the server works for any deck.

## Run

```bash
cp .env.example .env   # add SARVAM_API_KEY and TYPESAFE_API_KEY
npm start              # no dependencies, Node >= 20.12
```

- http://localhost:3000: keynote demo (🎬 upload video, or 🎤 live mic)
- http://localhost:3000/newton.html: the original Newton story demo

Use ◀ ▶, the arrow keys, or the slide strip to move slides by hand.
