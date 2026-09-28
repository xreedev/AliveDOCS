// The slide-change rules, checked against the tricky moments of the iPad clip.
import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "../server.js";

const order = ["reveal", "home", "web", "rotate", "mail", "photos", "calendar", "maps", "music", "store", "video", "outro"];
const jev = (probabilities, confidence, goBack = 0.05) => ({ slide: { probabilities, confidence }, go_back: { noul: goBack } });

test("close call between two slides holds", () => {
  const r = resolve(jev({ photos: 0.46, home: 0.4, none: 0.14 }, 0.55), order, "home");
  assert.equal(r.action, "stay");
  assert.match(r.reason, /too close/);
});

test("'next' votes count toward the next slide", () => {
  const r = resolve(jev({ photos: 0.45, next: 0.4, mail: 0.1, none: 0.05 }, 0.58), order, "mail");
  assert.deepEqual([r.action, r.slide], ["go", "photos"]);
});

test("early 'overview' does not jump to the closing slide", () => {
  const r = resolve(jev({ outro: 0.55, home: 0.3, none: 0.15 }, 0.6), order, "reveal");
  assert.equal(r.action, "stay");
  assert.match(r.reason, /big jump/);
});

test("recapping an earlier slide does not go back", () => {
  const r = resolve(jev({ web: 0.8, rotate: 0.15, none: 0.05 }, 0.85), order, "rotate");
  assert.equal(r.action, "stay");
});

test("explicit 'go back' does go back", () => {
  const r = resolve(jev({ maps: 0.85, music: 0.1, none: 0.05 }, 0.9, 0.92), order, "music");
  assert.deepEqual([r.action, r.slide], ["go", "maps"]);
});

test("clear forward cue moves", () => {
  const r = resolve(jev({ video: 0.62, store: 0.3, none: 0.08 }, 0.7), order, "store");
  assert.deepEqual([r.action, r.slide], ["go", "video"]);
});

test("applause / filler stays", () => {
  assert.equal(resolve(jev({ none: 0.9, mail: 0.1 }, 0.9), order, "mail").action, "stay");
});
