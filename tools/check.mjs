// Loads the course data the way the browser does and reports video lengths per day.
// Usage: node tools/check.mjs [module]
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('..', import.meta.url).pathname;
const ctx = { window: {}, console, localStorage: { getItem: () => null, setItem() {} } };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['data/course.js', 'js/tts.js', 'js/course.js', 'data/m1.js', 'data/m2.js', 'data/m3.js', 'data/m4.js', 'data/m5.js', 'data/m6.js', 'data/gear.js', 'js/diagrams.js']) {
  vm.runInContext(fs.readFileSync(root + f, 'utf8'), ctx, { filename: f });
}
const C = ctx.COURSE, a = C.api, only = +process.argv[2] || 0;
let bad = 0, n = 0, total = 0;
for (let d = 1; d <= 168; d++) {
  const day = C.days[d];
  if (!day) continue;
  const m = Math.ceil(d / 28);
  if (only && m !== only) continue;
  const min = a.videoMinutes(d);
  total += min; n++;
  const v = a.buildVideo(d);
  const svgs = v.scenes.filter(s => s.visual && s.visual.type === 'svg').map(s => s.visual.text);
  const missing = svgs.filter(s => !ctx.DIAGRAMS.has(s));
  const flag = min < 5 || min > 15 ? '  <-- out of 5-15 min range' : '';
  if (flag || missing.length) bad++;
  console.log(`${String(d).padStart(3)} ${a.dayLabel(d).padEnd(8)} ${min.toFixed(1).padStart(5)} min  ${v.scenes.length} scenes ${v.cues.length} cues  q=${(day.quiz||[]).length}${flag}${missing.length ? '  missing svg: ' + missing : ''}`);
}
console.log(`\n${n} days, avg ${(total / Math.max(1, n)).toFixed(1)} min, ${bad} flagged`);
