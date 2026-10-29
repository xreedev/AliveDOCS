/* Course model: modules (months) → sections (weeks) → lessons (video, article, activity per day + a weekly quiz).
   Day content lives in data/m*.js and is registered with D({...}). Progress is kept in localStorage. */
(function () {
  var C = window.COURSE;
  C.days = C.days || {};
  window.D = function (d) { C.days[d.n] = d; };

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // **bold**, `code`, [text](url) → HTML (input is escaped first)
  function md(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function plain(s) { return String(s || '').replace(/\*\*|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); }
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function words(s) { return (String(s || '').match(/\S+/g) || []).length; }

  // ---------- structure ----------
  function where(n) {
    var m = Math.ceil(n / 28), dm = (n - 1) % 28 + 1;
    return { m: m, w: Math.ceil(dm / 7), dm: dm };
  }
  function dayLabel(n) { var p = where(n); return p.m === 1 ? 'D' + pad(p.dm, 2) : 'M' + p.m + '·D' + pad(p.dm, 2); }
  function dayMeta(n) {
    var d = C.days[n];
    if (d) return d;
    var t = C.titles[n - 1] || ['Day ' + n, 'Review', 2];
    return { n: n, title: t[0], topic: t[1], hours: t[2], stub: true };
  }

  var LESSONS = [], BY_ID = {};
  function add(l) { l.i = LESSONS.length; LESSONS.push(l); BY_ID[l.id] = l; }
  C.modules.forEach(function (mod) {
    mod.sections.forEach(function (sec, wi) {
      var w = wi + 1;
      sec.m = mod.n; sec.w = w; sec.id = 'm' + mod.n + 'w' + w; sec.lessons = [];
      for (var k = 0; k < 7; k++) {
        var n = (mod.n - 1) * 28 + wi * 7 + k + 1;
        ['video', 'article', 'activity'].forEach(function (type) {
          var l = { id: 'd' + pad(n, 3) + '-' + { video: 'v', article: 'a', activity: 'x' }[type], type: type, n: n, m: mod.n, w: w, sec: sec };
          add(l); sec.lessons.push(l);
        });
      }
      var q = { id: 'q-' + sec.id, type: 'quiz', m: mod.n, w: w, sec: sec };
      add(q); sec.lessons.push(q);
    });
  });

  function lessonTitle(l) {
    if (l.type === 'quiz') return 'Quiz: ' + l.sec.title;
    var d = dayMeta(l.n), lab = dayLabel(l.n);
    if (l.type === 'video') return lab + ' · ' + d.title;
    if (l.type === 'article') return 'Reading: ' + (d.readTitle || d.title);
    return 'Hands-on: ' + (d.taskTitle || d.title);
  }

  // ---------- video script ----------
  // Authoring DSL (one scene per "## Title"):
  //   @eq formula | caption     @big text | sub     @svg name     - bullet     1. step
  //   | table | row |           ```lang ... ```     any other line = narration
  function parseScript(src) {
    var scenes = [], cur = null, inCode = false;
    String(src || '').split('\n').forEach(function (raw) {
      var line = raw.replace(/\s+$/, '');
      if (inCode) {
        if (/^```/.test(line.trim())) { inCode = false; return; }
        cur.visual.code += (cur.visual.code ? '\n' : '') + raw.replace(/^ {0,2}/, '');
        return;
      }
      var t = line.trim();
      if (!t) return;
      if (/^## /.test(t)) { cur = { title: t.slice(3).trim(), visual: null, bullets: [], say: [] }; scenes.push(cur); return; }
      if (!cur) { cur = { title: '', visual: null, bullets: [], say: [] }; scenes.push(cur); }
      var m;
      if ((m = t.match(/^```(\w*)/))) { inCode = true; cur.visual = { type: 'code', lang: m[1] || '', code: '' }; return; }
      if ((m = t.match(/^@(eq|big|svg)\s+(.*)$/))) {
        var parts = m[2].split(' | ');
        cur.visual = { type: m[1], text: parts[0].trim(), sub: (parts[1] || '').trim() };
        return;
      }
      if ((m = t.match(/^(-|\d+\.)\s+(.*)$/))) { cur.bullets.push({ text: m[2], num: m[1] !== '-' }); return; }
      if (/^\|.*\|$/.test(t)) {
        if (!cur.visual || cur.visual.type !== 'table') cur.visual = { type: 'table', rows: [] };
        if (/^\|[\s:|-]+\|$/.test(t)) return;
        cur.visual.rows.push(t.slice(1, -1).split('|').map(function (c) { return c.trim(); }));
        return;
      }
      cur.say.push(t);
    });
    return scenes;
  }

  function sentences(text) {
    var s = String(text).replace(/\s+/g, ' ').trim();
    if (!s) return [];
    var parts = s.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g) || [s];
    var out = [];
    parts.forEach(function (p) {
      p = p.trim();
      if (!p) return;
      // keep decimals and abbreviations glued: "3.3 V", "e.g. this"
      if (out.length && (/\d\.$/.test(out[out.length - 1]) && /^\d/.test(p) || /\b(e\.g|i\.e|vs|etc|Dr|approx|Fig|No)\.$/i.test(out[out.length - 1]))) {
        out[out.length - 1] += (/^\d/.test(p) ? '' : ' ') + p; return;
      }
      if (out.length && words(p) < 3) { out[out.length - 1] += ' ' + p; return; }
      out.push(p);
    });
    // split very long sentences at ; or , so captions stay readable
    var res = [];
    out.forEach(function (p) {
      if (words(p) <= 38) { res.push(p); return; }
      var chunks = p.split(/(?<=[;:,])\s+/), buf = '';
      chunks.forEach(function (c) {
        if (buf && words(buf + ' ' + c) > 30) { res.push(buf); buf = c; } else buf = buf ? buf + ' ' + c : c;
      });
      if (buf) res.push(buf);
    });
    return res;
  }

  function videoScenes(n) {
    var d = dayMeta(n), p = where(n), mod = C.modules[p.m - 1], sec = mod.sections[p.w - 1];
    var scenes = [];
    var review = d.topic === 'Review' || d.topic === 'Milestone';
    scenes.push({
      kind: 'intro', title: d.title, visual: { type: 'intro' },
      say: [(p.dm === 1 ? 'Welcome to module ' + p.m + ': ' + mod.title + '. ' : '') +
        'This is ' + dayLabel(n).replace('·', ', ').replace(/^M(\d)/, 'month $1').replace(/D0?(\d+)/, 'day $1') + ': ' + plain(d.title) + '.',
        d.goal ? 'Today\'s goal. ' + plain(d.goal) : '']
    });
    parseScript(d.video).forEach(function (s) { s.kind = 'teach'; scenes.push(s); });
    if (review) {
      var first = (p.m - 1) * 28 + (p.w - 1) * 7 + 1;
      var recap = [];
      for (var k = first; k < n; k++) {
        var dd = C.days[k];
        if (dd && dd.key && dd.key.length) recap.push({ n: k, d: dd });
      }
      recap.forEach(function (r) {
        scenes.push({
          kind: 'recap', title: 'Recap · ' + dayLabel(r.n) + ' · ' + r.d.title,
          bullets: r.d.key.map(function (k) { return { text: k }; }),
          say: ['Looking back at ' + plain(r.d.title) + '.'].concat(r.d.key.map(plain))
        });
      });
    }
    (d.read || []).forEach(function (r) {
      scenes.push({
        kind: 'article', title: 'From the article · ' + r[0], visual: { type: 'quote', text: r[1] },
        say: ['Here is what the article says about ' + plain(r[0]).toLowerCase().replace(/^\d+\\?\.\s*/, '') + '.', plain(r[1]).replace(/\n+/g, ' ')]
      });
    });
    if (d.tasks && d.tasks.length) {
      var nth = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];
      scenes.push({
        kind: 'tasks', title: 'Your hands-on work for today', bullets: d.tasks.map(function (t) { return { text: t, num: true }; }),
        say: ['Now the hands-on part. You will find this checklist in the activity that follows this video.'].concat(
          d.tasks.map(function (t, i) { return (nth[i] || 'Next') + '. ' + plain(t).replace(/\.?$/, '.'); }))
      });
    }
    var links = (d.links || []).concat(d.extra || []);
    if (links.length) {
      scenes.push({
        kind: 'links', title: 'Resources for today', bullets: links.map(function (l) { return { text: l[0] + (l[2] ? ' — ' + l[2] : '') }; }),
        say: ['Your resources are listed in the reading lesson, with links.'].concat(
          links.slice(0, 8).map(function (l) { return plain(l[0]) + (l[2] ? ': ' + plain(l[2]) : '') + '.'; }))
      });
    }
    if (d.key && d.key.length) {
      scenes.push({
        kind: 'summary', title: 'Key takeaways', bullets: d.key.map(function (k) { return { text: k }; }),
        say: ['Let\'s lock in the key takeaways.'].concat(d.key.map(plain)).concat([
          'That\'s the end of this video. Mark it complete, then continue to the reading.'])
      });
    }
    return scenes;
  }

  function buildVideo(n) {
    var scenes = videoScenes(n), cues = [];
    scenes.forEach(function (s, si) {
      s.cueStart = cues.length;
      var ss = [];
      s.say.forEach(function (para) { ss = ss.concat(sentences(para)); });
      if (!ss.length) ss = [s.title || '…'];
      ss.forEach(function (text) { cues.push({ s: si, text: text }); });
      s.cueEnd = cues.length;
    });
    return { scenes: scenes, cues: cues };
  }

  var estCache = {};
  function videoMinutes(n) {
    if (estCache[n]) return estCache[n];
    var v = buildVideo(n), sec = 0;
    v.cues.forEach(function (c) { sec += (window.TTS ? TTS.estimate(c.text) : words(c.text) / 150 * 60 * 1.08) + 0.35; });
    return (estCache[n] = sec / 60);
  }
  function lessonMinutes(l) {
    if (l.type === 'quiz') return Math.max(3, quizFor(l.sec).length);
    var d = dayMeta(l.n);
    if (l.type === 'video') return d.stub ? 0 : videoMinutes(l.n);
    if (l.type === 'article') {
      var w = words(d.goal) + (d.read || []).reduce(function (a, r) { return a + words(r[1]); }, 0) + words(d.article);
      return Math.max(3, w / 200 + ((d.links || []).length + (d.extra || []).length) * 1.5);
    }
    return (d.hours || 2) * 60;
  }
  function fmtMin(m) {
    if (m >= 60) { var h = Math.floor(m / 60), r = Math.round(m % 60); return h + ' h' + (r ? ' ' + r + ' min' : ''); }
    return Math.max(1, Math.round(m)) + ' min';
  }

  function quizFor(sec) {
    var qs = [];
    var first = (sec.m - 1) * 28 + (sec.w - 1) * 7 + 1;
    for (var n = first; n < first + 7; n++) {
      var d = C.days[n];
      (d && d.quiz || []).forEach(function (q, i) { qs.push({ id: n + '-' + i, n: n, q: q[0], a: q[1], c: q[2], why: q[3] || '' }); });
    }
    return qs;
  }

  // ---------- progress ----------
  var KEY = 'r6m.progress.v1';
  var state = (function () {
    try { return Object.assign({ items: {}, days: {}, video: {}, quiz: {}, last: null }, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return { items: {}, days: {}, video: {}, quiz: {}, last: null }; }
  })();
  var listeners = [];
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable: keep in memory */ }
    listeners.forEach(function (f) { f(); });
  }
  var P = {
    state: function () { return state; },
    onChange: function (f) { listeners.push(f); },
    isDone: function (id) { return !!(state.items[id] && state.items[id].done); },
    setDone: function (id, v) {
      if (v) state.items[id] = { done: true, at: Date.now() }; else delete state.items[id];
      var l = BY_ID[id];
      if (l && l.n) P.touchDay(l.n);
      save();
    },
    day: function (n) { return Object.assign({ status: null, hours: null, conf: '', tasks: [], log: {}, practice: false }, state.days[n] || {}); },
    saveDay: function (n, d) { state.days[n] = d; save(); },
    touchDay: function (n) { var d = P.day(n); if (!d.status) { state.days[n] = d; } },
    dayStatus: function (n) {
      var d = state.days[n] || {};
      if (d.status === 'Stuck' || d.status === 'Skipped' || d.status === 'Done') return d.status;
      var ids = ['v', 'a', 'x'].map(function (t) { return 'd' + pad(n, 3) + '-' + t; });
      var done = ids.filter(P.isDone).length;
      if (done === 3) return 'Done';
      if (done || (d.tasks || []).some(Boolean) || d.status === 'In progress') return 'In progress';
      return 'Not started';
    },
    setLast: function (id) { state.last = id; save(); },
    videoPos: function (id, t) { if (t === undefined) return state.video[id] || 0; state.video[id] = t; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } },
    quiz: function (id, v) { if (v === undefined) return state.quiz[id]; state.quiz[id] = v; save(); },
    kv: function (k, v) { state.kv = state.kv || {}; if (v === undefined) return state.kv[k]; state.kv[k] = v; save(); },
    exportJSON: function () { return JSON.stringify(state, null, 2); },
    importJSON: function (txt) { var s = JSON.parse(txt); state = Object.assign({ items: {}, days: {}, video: {}, quiz: {}, last: null }, s); save(); },
    reset: function () { state = { items: {}, days: {}, video: {}, quiz: {}, last: null }; save(); }
  };

  function nextUp() {
    if (state.last && BY_ID[state.last] && !P.isDone(state.last)) return BY_ID[state.last];
    for (var i = 0; i < LESSONS.length; i++) if (!P.isDone(LESSONS[i].id) && !(LESSONS[i].n && P.dayStatus(LESSONS[i].n) === 'Skipped')) return LESSONS[i];
    return LESSONS[LESSONS.length - 1];
  }

  C.api = {
    esc: esc, md: md, plain: plain, pad: pad, where: where, dayLabel: dayLabel, dayMeta: dayMeta,
    lessons: LESSONS, byId: BY_ID, lessonTitle: lessonTitle, lessonMinutes: lessonMinutes, fmtMin: fmtMin,
    buildVideo: buildVideo, videoMinutes: videoMinutes, quizFor: quizFor, progress: P, nextUp: nextUp,
    lessonUrl: function (l) { return 'lesson.html?id=' + encodeURIComponent(l.id); },
    notionUrl: function (d) { return d.notion ? 'https://www.notion.so/' + d.notion.replace(/-/g, '') : C.notion; },
    typeIcon: function (t) { return { video: '▶', article: '☰', activity: '⚒', quiz: '✓' }[t]; },
    typeName: function (t) { return { video: 'Video', article: 'Reading', activity: 'Hands-on activity', quiz: 'Quiz' }[t]; }
  };
})();
