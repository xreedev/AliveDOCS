# Newton & Gravity — voice-driven animation

Tell the story of how Newton discovered gravity out loud; the animation follows what you say.

- **Gemini** (`gemini-3.5-transcribe`) turns each 3‑second mic chunk into text.
- **Jev** (TypeSafe System One, `jev-latest`) gets the current scene + what you said and answers one
  `choice` question: which scene (`intro, garden, apple, question, moon, orbit, law, principia`, or `next`/`back`/`none`).
  Vocabulary is free — you don't need exact keywords. Low‑confidence answers (< 0.5) are ignored.

## Run

```bash
cp .env.example .env   # add GEMINI_API_KEY and TYPESAFE_API_KEY
npm start              # no dependencies, Node >= 20.12
```

Open http://localhost:3000, click **Start mic**, and narrate. ◀ ▶ buttons work without a mic.
