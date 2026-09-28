# AliveDOCS — slides that follow the speaker

Demo decks: Steve Jobs introducing the **iPad (2010)** and the **iPhone (2007)**. Upload the keynote clip
(or talk into the mic) and the animated deck advances on its own, from what is being said. No clicker, no cue sheet.

Suggested clip for the iPad deck: https://www.youtube.com/watch?v=eZ87BRCrh0w (not included; upload your own copy).

## How it works

1. **Listen** (`alive.js`): the audio of the playing video, or the mic, is cut into phrases at short pauses.
2. **Transcribe** (`server.js`): each phrase goes to **Sarvam** `saaras:v4` speech-to-text.
3. **Score**: **Jev** (TypeSafe System One, `jev-latest`) gets the deck's slide descriptions, the current and
   upcoming slide, the previous phrase and the new one, and returns a probability for every slide
   (plus `next` / `back` / `none`) and whether the speaker explicitly asked to go back.
4. **Decide** (`resolve()` in `server.js`): code, not the model, decides whether to move. The deck holds when:
   - the top two slides are within 0.2 of each other (a close call; the next phrase usually settles it),
   - Jev's confidence is under 0.5, or the best answer is "nothing",
   - it would skip more than 2 slides ahead without a very clear cue,
   - it would go backwards without an explicit "go back".
   `next`/`back` votes are merged into the slide they point to before comparing.

Slide descriptions can be contrastive (`{what, not_for, examples}`) to separate slides that sound alike.

Each page sends its own slide list, so the server works for any deck.

## Run

```bash
cp .env.example .env   # add SARVAM_API_KEY and TYPESAFE_API_KEY
npm start              # no dependencies, Node >= 20.12
```

- http://localhost:3000: keynote demo (🎬 upload video, or 🎤 live mic)
- http://localhost:3000/newton.html: the original Newton story demo

Use ◀ ▶, the arrow keys, or the slide strip to move slides by hand. Switch decks in the header.

`npm test` checks the slide-change rules against the clip's ambiguous moments.
