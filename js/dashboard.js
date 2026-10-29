(function () {
  var C = window.COURSE, a = C.api, P = a.progress;
  var app = document.getElementById('app');
  var openMods = {};
  var filters = { m: '', status: '', topic: '', q: '' };

  function tab() { return (location.hash || '#modules').slice(1); }

  function totals() {
    var t = { lessons: a.lessons.length, done: 0, videos: 0, videosDone: 0, minLeft: 0, hours: 0, daysDone: 0 };
    a.lessons.forEach(function (l) {
      var d = P.isDone(l.id);
      if (d) t.done++;
      if (l.type === 'video') { t.videos++; if (d) t.videosDone++; }
      if (!d && !(l.n && P.dayStatus(l.n) === 'Skipped')) t.minLeft += a.lessonMinutes(l);
    });
    for (var n = 1; n <= 168; n++) {
      var s = P.day(n);
      if (s.hours) t.hours += s.hours;
      if (P.dayStatus(n) === 'Done') t.daysDone++;
    }
    return t;
  }

  function ring(pct) {
    var r = 86, c = 2 * Math.PI * r;
    return '<div class="ring"><svg width="200" height="200"><circle cx="100" cy="100" r="' + r + '" stroke="#f0efec" stroke-width="16" fill="none"/>' +
      '<circle cx="100" cy="100" r="' + r + '" stroke="url(#g)" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pct)).toFixed(1) + '"/>' +
      '<defs><linearGradient id="g"><stop offset="0" stop-color="#ea580c"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs></svg>' +
      '<div class="ring-txt"><div><b>' + Math.round(pct * 100) + '%</b><span>course complete</span></div></div></div>';
  }

  function hero() {
    var t = totals(), nx = a.nextUp();
    var started = t.done > 0;
    return '<section class="hero"><div><div class="kicker">Self-paced course · 6 modules · 168 days</div>' +
      '<h1>' + a.esc(C.title) + '</h1><p>' + a.esc(C.goal) + '</p>' +
      '<a class="btn primary" href="' + a.lessonUrl(nx) + '">' + (started ? 'Continue' : 'Start the course') + ' ›</a> ' +
      '<a class="btn alt" target="_blank" rel="noopener" href="' + C.notion + '">Open the Notion plan ↗</a>' +
      '<div class="resume-sub">Up next: <b>' + a.md(a.lessonTitle(nx)) + '</b> · ' + a.typeName(nx.type) + ' · ' + a.fmtMin(a.lessonMinutes(nx)) + '</div>' +
      '</div>' + ring(t.done / t.lessons) + '</section>' +
      '<div class="stats">' +
      '<div class="stat"><b>' + t.done + ' / ' + t.lessons + '</b><span>lessons complete</span></div>' +
      '<div class="stat"><b>' + t.daysDone + ' / 168</b><span>days done</span></div>' +
      '<div class="stat"><b>' + (Math.round(t.hours * 10) / 10) + ' h</b><span>hours logged</span></div>' +
      '<div class="stat"><b>' + Math.round(t.minLeft / 60) + ' h</b><span>estimated work left</span></div>' +
      '</div>';
  }

  function tabs() {
    var cur = tab();
    return '<div class="tabs">' + [['modules', 'Modules'], ['schedule', 'Schedule'], ['gear', 'Gear & software'], ['settings', 'Settings']].map(function (x) {
      return '<button data-tab="' + x[0] + '"' + (cur === x[0] ? ' class="on"' : '') + '>' + x[1] + '</button>';
    }).join('') + '</div>';
  }

  function modules() {
    var nx = a.nextUp();
    if (!Object.keys(openMods).length) openMods[nx.m] = true;
    var h = '<div class="callout"><b>How to use this course</b><ol>' + C.rules.map(function (r) { return '<li>' + a.esc(r) + '</li>'; }).join('') + '</ol></div>';
    C.modules.forEach(function (mod) {
      var all = [], done = 0;
      mod.sections.forEach(function (s) { s.lessons.forEach(function (l) { all.push(l); if (P.isDone(l.id)) done++; }); });
      var pct = done / all.length * 100;
      var vids = all.filter(function (l) { return l.type === 'video'; }).reduce(function (s, l) { return s + a.lessonMinutes(l); }, 0);
      h += '<section class="module' + (openMods[mod.n] ? ' open' : '') + '" data-m="' + mod.n + '">' +
        '<div class="mod-head"><div class="mod-icon">' + mod.icon + '</div><div><div class="kicker" style="margin:0">Module ' + mod.n + '</div><h3>' + a.esc(mod.title) + '</h3><p>' + a.esc(mod.goal) + '</p></div>' +
        '<div class="mod-prog"><div class="bar"><i style="width:' + pct.toFixed(1) + '%"></i></div><div class="bar-lab"><span>' + done + ' / ' + all.length + ' lessons</span><span>' + Math.round(vids / 60 * 10) / 10 + ' h video</span></div></div>' +
        '<div class="mod-chev">›</div></div><div class="mod-body">';
      mod.sections.forEach(function (sec) {
        var sd = sec.lessons.filter(function (l) { return P.isDone(l.id); }).length;
        h += '<div class="sec"><div class="sec-head"><h4>Section ' + sec.w + ' · ' + a.esc(sec.title) + '</h4><span>' + sd + ' / ' + sec.lessons.length + ' complete</span></div>';
        for (var k = 0; k < 7; k++) {
          var n = (mod.n - 1) * 28 + (sec.w - 1) * 7 + k + 1, d = a.dayMeta(n), st = P.dayStatus(n);
          var ls = sec.lessons.filter(function (l) { return l.n === n; });
          h += '<div class="day-row"><div class="day-lab">' + a.esc(a.dayLabel(n)) + '</div>' +
            '<div class="day-title"><a href="' + a.lessonUrl(ls[0]) + '">' + a.md(d.title) + '</a><small>' + a.esc(d.topic) + ' · ' + a.fmtMin(a.lessonMinutes(ls[0])) + ' video · ' + (d.hours || 2) + ' h hands-on</small></div>' +
            '<div class="pills">' + ls.map(function (l) {
              return '<a class="pill' + (P.isDone(l.id) ? ' done' : '') + '" title="' + a.esc(a.typeName(l.type)) + '" href="' + a.lessonUrl(l) + '">' + a.typeIcon(l.type) + '</a>';
            }).join('') + '</div><span class="status st-' + st.split(' ')[0] + '">' + st + '</span></div>';
        }
        var q = sec.lessons[sec.lessons.length - 1], qs = P.quiz(q.id);
        h += '<div class="quiz-row"><a class="pill' + (P.isDone(q.id) ? ' done' : '') + '" href="' + a.lessonUrl(q) + '">✓</a><a href="' + a.lessonUrl(q) + '">' + a.esc(a.lessonTitle(q)) + '</a>' +
          (qs ? '<span class="status st-' + (qs.passed ? 'Done' : 'Stuck') + '">best ' + qs.best + '%</span>' : '') + '</div></div>';
      });
      h += '</div></section>';
    });
    return '<div id="modules">' + h + '</div>';
  }

  function schedule() {
    var topics = {};
    C.titles.forEach(function (t, i) { topics[a.dayMeta(i + 1).topic] = 1; });
    var statuses = ['Not started', 'In progress', 'Done', 'Stuck', 'Skipped'];
    var confs = ['', '1 - lost', '2 - shaky', '3 - ok', '4 - good', '5 - can teach it'];
    var h = '<p class="gear-note">Every day of the plan in order — no dates. Status updates automatically from the lessons you complete; set Stuck or Skipped by hand. Same fields as the Notion Daily Plan.</p>' +
      '<div class="sched-tools">' +
      '<select data-f="m"><option value="">All modules</option>' + C.modules.map(function (m) { return '<option value="' + m.n + '"' + (filters.m == m.n ? ' selected' : '') + '>Module ' + m.n + '</option>'; }).join('') + '</select>' +
      '<select data-f="status"><option value="">Any status</option>' + statuses.map(function (s) { return '<option' + (filters.status === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
      '<select data-f="topic"><option value="">All topics</option>' + Object.keys(topics).map(function (t) { return '<option' + (filters.topic === t ? ' selected' : '') + '>' + a.esc(t) + '</option>'; }).join('') + '</select>' +
      '<input data-f="q" type="search" placeholder="Search days…" value="' + a.esc(filters.q) + '"></div>' +
      '<div class="sched-scroll"><table class="sched"><thead><tr><th>#</th><th>Day</th><th>Topic</th><th>Section</th><th>Est h</th><th>Status</th><th>Hours</th><th>Confidence</th></tr></thead><tbody>';
    for (var n = 1; n <= 168; n++) {
      var d = a.dayMeta(n), p = a.where(n), st = P.dayStatus(n), s = P.day(n);
      if (filters.m && +filters.m !== p.m) continue;
      if (filters.status && filters.status !== st) continue;
      if (filters.topic && filters.topic !== d.topic) continue;
      if (filters.q && (d.title + ' ' + d.topic).toLowerCase().indexOf(filters.q.toLowerCase()) < 0) continue;
      h += '<tr data-n="' + n + '"><td>' + n + '</td><td><a href="lesson.html?id=d' + a.pad(n, 3) + '-v">' + a.esc(a.dayLabel(n)) + ' · ' + a.md(d.title) + '</a></td>' +
        '<td>' + a.esc(d.topic) + '</td><td>M' + p.m + ' · S' + p.w + '</td><td>' + (d.hours || '') + '</td>' +
        '<td><select data-k="status">' + statuses.map(function (x) { return '<option' + (x === st ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></td>' +
        '<td><input data-k="hours" type="number" min="0" step="0.25" style="width:70px" value="' + (s.hours == null ? '' : s.hours) + '"></td>' +
        '<td><select data-k="conf">' + confs.map(function (c) { return '<option value="' + c + '"' + (c === s.conf ? ' selected' : '') + '>' + (c || '—') + '</option>'; }).join('') + '</select></td></tr>';
    }
    return h + '</tbody></table></div>';
  }

  function gear() {
    var statuses = ['To buy / install', 'Ordered', 'Got it / installed', 'Not needed'];
    var h = '<p class="gear-note">From the Notion Gear & Software database. Ordering rule: Day 22 of each module is when you order the next module\'s gear; Module 1 gear is ordered on Day 1.</p>';
    C.modules.forEach(function (mod) {
      var rows = C.gear.map(function (g, i) { return { g: g, i: i }; }).filter(function (x) { return x.g[0] === mod.n; });
      if (!rows.length) return;
      var cost = rows.reduce(function (s, x) { return s + (x.g[3] === 'Must have' && x.g[4] ? x.g[4] : 0); }, 0);
      h += '<h3 style="font:700 20px var(--serif);margin:24px 0 8px">' + mod.icon + ' Module ' + mod.n + ' · ' + a.esc(mod.title) + ' <span class="gear-note">· must-haves ≈ $' + Math.round(cost) + '</span></h3>' +
        '<div class="sched-scroll"><table class="sched"><thead><tr><th>Item</th><th>Type</th><th>Priority</th><th>Price</th><th>Needed by</th><th>Status</th></tr></thead><tbody>';
      rows.forEach(function (x) {
        var g = x.g, st = P.kv('gear' + x.i) || 'To buy / install';
        h += '<tr><td>' + (g[6] ? '<a target="_blank" rel="noopener" href="' + a.esc(g[6]) + '">' + a.esc(g[1]) + ' ↗</a>' : '<b>' + a.esc(g[1]) + '</b>') +
          (g[7] ? '<div class="gear-note">' + a.esc(g[7]) + '</div>' : '') + '</td><td>' + g[2] + '</td><td>' + g[3] + '</td><td>' + (g[4] == null ? '—' : g[4] === 0 ? 'Free' : '$' + g[4]) + '</td>' +
          '<td>' + (g[5] ? 'Day ' + g[5] : '—') + '</td><td><select data-gear="' + x.i + '">' + statuses.map(function (s) { return '<option' + (s === st ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></td></tr>';
      });
      h += '</tbody></table></div>';
    });
    return h;
  }

  function settings() {
    return '<div class="prose" style="font-family:var(--sans);font-size:16px"><h2>Narrator voice</h2>' +
      '<p>Videos are narrated by <b>meSpeak</b>, an open-source (GPL) JavaScript port of the eSpeak speech synthesiser. It runs entirely in your browser — no server, no API key.</p>' +
      '<p><select id="voice">' + Object.keys(TTS.PRESETS).map(function (k) { return '<option value="' + k + '"' + (TTS.settings.preset === k ? ' selected' : '') + '>' + a.esc(TTS.PRESETS[k].label) + '</option>'; }).join('') + '</select> ' +
      '<button class="btn small" id="test">▶ Test voice</button></p>' +
      '<h2>Your progress</h2><p>Progress is saved in this browser (localStorage). Export it to back it up or move it to another device.</p>' +
      '<p><button class="btn small" id="exp">Export progress</button> <label class="btn small alt" style="cursor:pointer">Import progress<input type="file" id="imp" accept="application/json" hidden></label> ' +
      '<button class="btn small alt" id="reset" style="color:var(--bad)">Reset all progress</button></p></div>';
  }

  function render() {
    var t = tab(), body = { modules: modules, schedule: schedule, gear: gear, settings: settings }[t] || modules;
    app.innerHTML = hero() + tabs() + body();
    document.querySelectorAll('.nav a').forEach(function (n) { n.classList.toggle('on', n.dataset.tab === t); });
    bind();
  }

  function bind() {
    app.querySelectorAll('.tabs button').forEach(function (b) { b.onclick = function () { location.hash = b.dataset.tab; }; });
    app.querySelectorAll('.mod-head').forEach(function (hd) {
      hd.onclick = function () { var m = hd.parentNode.dataset.m; openMods[m] = !openMods[m]; hd.parentNode.classList.toggle('open', !!openMods[m]); };
    });
    app.querySelectorAll('[data-f]').forEach(function (f) {
      f.addEventListener(f.tagName === 'INPUT' ? 'input' : 'change', function () {
        filters[f.dataset.f] = f.value;
        var pos = f.selectionStart;
        render();
        var again = app.querySelector('[data-f="' + f.dataset.f + '"]');
        if (again && again.tagName === 'INPUT') { again.focus(); try { again.setSelectionRange(pos, pos); } catch (e) { } }
      });
    });
    app.querySelectorAll('tr[data-n] [data-k]').forEach(function (f) {
      f.addEventListener('change', function () {
        var n = +f.closest('tr').dataset.n, s = P.day(n);
        if (f.dataset.k === 'status') s.status = f.value === 'Not started' ? null : f.value;
        if (f.dataset.k === 'hours') s.hours = f.value === '' ? null : +f.value;
        if (f.dataset.k === 'conf') s.conf = f.value;
        P.saveDay(n, s);
        render();
      });
    });
    app.querySelectorAll('[data-gear]').forEach(function (s) { s.onchange = function () { P.kv('gear' + s.dataset.gear, s.value); }; });
    var v = document.getElementById('voice');
    if (v) {
      v.onchange = function () { TTS.setPreset(v.value); };
      document.getElementById('test').onclick = function () {
        TTS.unlock();
        TTS.prepare('Hello. I am your robotics narrator. Voltage equals current times resistance.').then(function (c) { c.play(0, 1); });
      };
      document.getElementById('exp').onclick = function () {
        var blob = new Blob([P.exportJSON()], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob); link.download = 'robotics-6mo-progress.json'; link.click();
      };
      document.getElementById('imp').onchange = function (e) {
        var f = e.target.files[0]; if (!f) return;
        f.text().then(function (t) { try { P.importJSON(t); alert('Progress imported.'); render(); } catch (err) { alert('That file is not a valid progress export.'); } });
      };
      document.getElementById('reset').onclick = function () { if (confirm('Delete all progress in this browser?')) { P.reset(); render(); } };
    }
  }

  window.addEventListener('hashchange', render);
  render();
})();
