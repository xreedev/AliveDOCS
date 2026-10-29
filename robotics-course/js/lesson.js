(function () {
  var C = window.COURSE, a = C.api, P = a.progress;
  var params = new URLSearchParams(location.search);
  var L = a.byId[params.get('id')] || a.nextUp();
  var sideModule = L.m;

  function $(s, r) { return (r || document).querySelector(s); }
  function prevLesson() { return a.lessons[L.i - 1]; }
  function nextLesson() { return a.lessons[L.i + 1]; }

  P.setLast(L.id);
  document.title = a.lessonTitle(L) + ' · ' + C.title;

  // ---------- sidebar ----------
  function renderSide() {
    var mod = C.modules[sideModule - 1];
    var done = 0, total = 0;
    mod.sections.forEach(function (s) { s.lessons.forEach(function (l) { total++; if (P.isDone(l.id)) done++; }); });
    var h = '<div class="side-head"><a href="index.html">← Course home</a>' +
      '<h3>' + mod.icon + ' Module ' + mod.n + ' · ' + a.esc(mod.title) + '</h3>' +
      '<div class="bar"><i style="width:' + (done / total * 100).toFixed(1) + '%"></i></div>' +
      '<div class="bar-lab"><span>' + done + ' / ' + total + ' lessons</span><span>' + Math.round(done / total * 100) + '%</span></div>' +
      '<div class="side-mods">' + C.modules.map(function (m) { return '<button data-m="' + m.n + '"' + (m.n === sideModule ? ' class="on"' : '') + '>M' + m.n + '</button>'; }).join('') + '</div></div>';
    h += '<div class="side-list">';
    mod.sections.forEach(function (sec) {
      h += '<div class="side-sec">Section ' + sec.w + ' · ' + a.esc(sec.title) + '<small>' + sec.lessons.filter(function (l) { return P.isDone(l.id); }).length + ' / ' + sec.lessons.length + ' complete</small></div>';
      var lastDay = 0;
      sec.lessons.forEach(function (l) {
        if (l.n && l.n !== lastDay) { lastDay = l.n; h += '<div class="side-day">' + a.esc(a.dayLabel(l.n)) + ' · ' + a.esc(P.dayStatus(l.n)) + '</div>'; }
        var title = l.type === 'video' ? a.dayMeta(l.n).title : a.lessonTitle(l);
        h += '<a class="side-item' + (P.isDone(l.id) ? ' done' : '') + (l.id === L.id ? ' on' : '') + '" href="' + a.lessonUrl(l) + '">' +
          '<span class="ck">' + (P.isDone(l.id) ? '✓' : '') + '</span><span>' + a.md(title) +
          '<small>' + a.typeIcon(l.type) + ' ' + a.typeName(l.type) + ' · ' + a.fmtMin(a.lessonMinutes(l)) + '</small></span></a>';
      });
    });
    h += '</div><div class="side-foot">' +
      (prevLesson() ? '<a href="' + a.lessonUrl(prevLesson()) + '">‹ Previous</a>' : '<span></span>') +
      (nextLesson() ? '<a href="' + a.lessonUrl(nextLesson()) + '">Next ›</a>' : '<span></span>') + '</div>';
    var side = $('#side');
    side.innerHTML = h;
    side.querySelectorAll('.side-mods button').forEach(function (b) {
      b.onclick = function () { sideModule = +b.dataset.m; renderSide(); };
    });
    var on = side.querySelector('.side-item.on');
    if (on && sideModule === L.m) on.scrollIntoView({ block: 'center' });
  }

  // ---------- main ----------
  function header() {
    var mod = C.modules[L.m - 1], sec = L.sec, d = L.n ? a.dayMeta(L.n) : null;
    var meta = '<span>' + a.typeIcon(L.type) + ' ' + a.typeName(L.type) + '</span><span>' + a.fmtMin(a.lessonMinutes(L)) + '</span>';
    if (d) meta += '<span>' + a.esc(d.topic) + '</span>';
    return '<div class="crumbs"><a href="index.html">Course</a> › Module ' + mod.n + ': ' + a.esc(mod.title) + ' › Section ' + sec.w + ': ' + a.esc(sec.title) + '</div>' +
      '<div class="l-title"><div><h1>' + a.md(a.lessonTitle(L)) + '</h1><div class="l-meta">' + meta + '</div></div>' +
      (d ? '<a class="notion-btn" target="_blank" rel="noopener" href="' + a.notionUrl(d) + '">Open in Notion ↗</a>' : '') + '</div>';
  }

  function footer() {
    var p = prevLesson(), n = nextLesson(), done = P.isDone(L.id);
    return '<div class="l-foot">' +
      (p ? '<a class="btn alt" href="' + a.lessonUrl(p) + '">‹ Previous</a>' : '<span></span>') +
      '<button class="btn complete' + (done ? ' is-done' : '') + '" id="complete">' + (done ? '✓ Completed' : 'Mark complete') + '</button>' +
      (n ? '<a class="btn primary" id="next" href="' + a.lessonUrl(n) + '">Next ›</a>' : '<a class="btn primary" href="index.html">Finish course ›</a>') +
      '</div>';
  }

  function bindFooter() {
    var b = $('#complete');
    b.onclick = function () {
      var v = !P.isDone(L.id);
      if (L.type === 'quiz' && v && !(P.quiz(L.id) && P.quiz(L.id).passed)) { alert('Pass the quiz (70% or more) to complete it.'); return; }
      P.setDone(L.id, v);
      setDoneUI();
    };
    var n = $('#next');
    if (n && L.type === 'article') n.addEventListener('click', function () { P.setDone(L.id, true); });
  }
  function setDoneUI() {
    var b = $('#complete'), done = P.isDone(L.id);
    b.classList.toggle('is-done', done);
    b.textContent = done ? '✓ Completed' : 'Mark complete';
    renderSide();
  }

  function resources(list, label) {
    if (!list || !list.length) return '';
    return '<h3>' + label + '</h3><ul class="res">' + list.map(function (r) {
      var host = '';
      try { host = new URL(r[1]).hostname.replace(/^www\./, ''); } catch (e) { }
      return '<li><a href="' + a.esc(r[1]) + '" target="_blank" rel="noopener"><b>' + a.esc(r[0]) + '</b>' + (r[2] ? '<span>' + a.md(r[2]) + '</span>' : '') + '<em>' + a.esc(host) + ' ↗</em></a></li>';
    }).join('') + '</ul>';
  }
  function paras(t) { return String(t).split(/\n{2,}|\n/).map(function (p) { return '<p>' + a.md(p) + '</p>'; }).join(''); }

  function renderVideo(main) {
    var d = a.dayMeta(L.n);
    main.innerHTML = header() + '<div id="player"></div>' +
      (d.goal ? '<div class="prose"><h2>About this lesson</h2><div class="goal"><b>Today\'s goal:</b> ' + a.md(d.goal) + '</div></div>' : '') +
      '<div class="transcript"><details><summary>Transcript</summary><div class="tr-body" id="tr"></div></details></div>' + footer();
    var player = new VideoPlayer($('#player'), {
      n: L.n, id: L.id,
      onComplete: function () { P.setDone(L.id, true); setDoneUI(); },
      onTime: function (i) {
        var prev = document.querySelector('.tr-sc span.now');
        var cur = document.querySelector('.tr-sc span[data-c="' + i + '"]');
        if (prev === cur) return;
        if (prev) prev.classList.remove('now');
        if (cur) cur.classList.add('now');
      }
    });
    var h = '';
    player.scenes.forEach(function (s) {
      h += '<div class="tr-sc"><h4><button data-t="' + s.cueStart + '">' + fmtT(player.startOf(s.cueStart)) + '</button>' + a.md(s.title || 'Introduction') + '</h4><p>' +
        player.cues.slice(s.cueStart, s.cueEnd).map(function (c, k) { return '<span data-c="' + (s.cueStart + k) + '">' + a.esc(c.text) + '</span>'; }).join(' ') + '</p></div>';
    });
    $('#tr').innerHTML = h;
    $('#tr').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-t]');
      var sp = e.target.closest('span[data-c]');
      var i = b ? +b.dataset.t : sp ? +sp.dataset.c : null;
      if (i == null) return;
      player.seek(player.startOf(i) + 0.001);
      if (!player.playing) player.play();
      $('#player').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    function fmtT(t) { t = Math.round(t); return Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); }
  }

  function renderArticle(main) {
    var d = a.dayMeta(L.n), h = header() + '<div class="prose">';
    if (d.goal) h += '<div class="goal"><b>🎯 Today\'s goal:</b> ' + a.md(d.goal) + '</div>';
    if (d.article) h += '<h2>Lesson notes</h2>' + paras(d.article);
    if (d.read && d.read.length) {
      h += '<h2>📖 Read from the article (exact)</h2>';
      d.read.forEach(function (r) { h += '<h3>' + a.md(r[0]) + '</h3><blockquote>' + paras(r[1]) + '</blockquote>'; });
    }
    if ((d.links && d.links.length) || (d.extra && d.extra.length)) {
      h += '<h2>🔗 Resources</h2>' + resources(d.links, 'From the article') + resources(d.extra, 'Extra (same topic)');
    }
    if (d.key && d.key.length) h += '<h2>Key takeaways</h2><ul>' + d.key.map(function (k) { return '<li>' + a.md(k) + '</li>'; }).join('') + '</ul>';
    if (d.stub) h += '<p><i>This day\'s content has not been added yet. Open it in Notion for now.</i></p>';
    h += '</div>' + footer();
    main.innerHTML = h;
  }

  function renderActivity(main) {
    var d = a.dayMeta(L.n), st = P.day(L.n), p = a.where(L.n);
    var h = header() + '<div class="prose">';
    if (d.goal) h += '<div class="goal"><b>🎯 Today\'s goal:</b> ' + a.md(d.goal) + '</div>';
    if (d.order) h += '<div class="order-box"><b>🛒 Ordering day.</b> ' + a.md(d.order) + '</div>';
    h += '<h2>✅ Do today</h2><p style="font:15px var(--sans);color:var(--ink2)">Work through the list top to bottom. Your ticks are saved in this browser.</p></div>';
    h += '<ul class="checklist" id="tasks">' + (d.tasks || []).map(function (t, i) {
      return '<li data-i="' + i + '"' + (st.tasks[i] ? ' class="on"' : '') + '><input type="checkbox"' + (st.tasks[i] ? ' checked' : '') + '><span>' + a.md(t) + '</span></li>';
    }).join('') + '</ul>';
    var statuses = ['Not started', 'In progress', 'Done', 'Stuck', 'Skipped'];
    var confs = ['', '1 - lost', '2 - shaky', '3 - ok', '4 - good', '5 - can teach it'];
    var cur = P.dayStatus(L.n);
    h += '<div class="prose"><h2>📝 Log <span class="saved" id="saved">saved</span></h2></div>' +
      '<div class="log-grid">' +
      '<label>Status<select id="f-status">' + statuses.map(function (s) { return '<option' + (s === cur ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></label>' +
      '<label>Hours spent<input id="f-hours" type="number" min="0" step="0.25" placeholder="' + (d.hours || '') + ' est" value="' + (st.hours == null ? '' : st.hours) + '"></label>' +
      '<label>Confidence<select id="f-conf">' + confs.map(function (c) { return '<option' + (c === st.conf ? ' selected' : '') + ' value="' + c + '">' + (c || '—') + '</option>'; }).join('') + '</select></label>' +
      '<label>Practice task done<select id="f-prac"><option value="0">No</option><option value="1"' + (st.practice ? ' selected' : '') + '>Yes</option></select></label>' +
      '</div><div class="log">' +
      '<label>What I did<textarea id="f-did">' + a.esc(st.log.did || '') + '</textarea></label>' +
      '<label>What broke / confused me, and how I fixed it<textarea id="f-broke">' + a.esc(st.log.broke || '') + '</textarea></label>' +
      '<label>Questions for later<textarea id="f-q">' + a.esc(st.log.q || '') + '</textarea></label></div>' + footer();
    main.innerHTML = h;

    var timer;
    function persist() {
      var s = P.day(L.n);
      s.tasks = Array.prototype.map.call(document.querySelectorAll('#tasks li'), function (li) { return li.classList.contains('on'); });
      var status = $('#f-status').value;
      s.status = status === 'Not started' ? null : status;
      s.hours = $('#f-hours').value === '' ? null : +$('#f-hours').value;
      s.conf = $('#f-conf').value;
      s.practice = $('#f-prac').value === '1';
      s.log = { did: $('#f-did').value, broke: $('#f-broke').value, q: $('#f-q').value };
      P.saveDay(L.n, s);
      $('#f-status').value = P.dayStatus(L.n);
      var sv = $('#saved'); sv.classList.add('show'); clearTimeout(timer); timer = setTimeout(function () { sv.classList.remove('show'); }, 1200);
      renderSide();
    }
    $('#tasks').addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li) return;
      var on = !li.classList.contains('on');
      li.classList.toggle('on', on);
      li.querySelector('input').checked = on;
      persist();
      var all = document.querySelectorAll('#tasks li'), ticked = document.querySelectorAll('#tasks li.on');
      if (all.length && all.length === ticked.length && !P.isDone(L.id)) { P.setDone(L.id, true); setDoneUI(); }
    });
    ['#f-status', '#f-hours', '#f-conf', '#f-prac'].forEach(function (s) { $(s).addEventListener('change', persist); });
    ['#f-did', '#f-broke', '#f-q'].forEach(function (s) { $(s).addEventListener('input', function () { clearTimeout(this.t); this.t = setTimeout(persist, 400); }); });
  }

  function renderQuiz(main) {
    var qs = a.quizFor(L.sec), saved = P.quiz(L.id) || {};
    var h = header() + '<div class="prose"><p>' + qs.length + ' questions from this section\'s lessons. Score 70% or more to complete the section.' +
      (saved.score != null ? ' Best score so far: <b>' + saved.best + '%</b>.' : '') + '</p></div><form id="quiz">';
    qs.forEach(function (q, i) {
      h += '<div class="q" data-i="' + i + '"><small>Question ' + (i + 1) + ' · from ' + a.esc(a.dayLabel(q.n)) + '</small><h3>' + a.md(q.q) + '</h3>' +
        q.a.map(function (opt, k) { return '<label><input type="radio" name="q' + i + '" value="' + k + '"><span>' + a.md(opt) + '</span></label>'; }).join('') +
        '<div class="why">' + (q.why ? a.md(q.why) : '') + '</div></div>';
    });
    if (!qs.length) h += '<p>No questions yet for this section.</p>';
    h += '<div class="l-foot" style="border:0;margin-top:10px"><span class="score" id="score"></span><span><button type="button" class="btn alt" id="retry" style="display:none">Try again</button> <button type="submit" class="btn">Submit answers</button></span></div></form>' + footer();
    main.innerHTML = h;
    var form = $('#quiz');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var right = 0;
      qs.forEach(function (q, i) {
        var box = form.querySelector('.q[data-i="' + i + '"]');
        var pick = form.querySelector('input[name="q' + i + '"]:checked');
        box.classList.add('checked');
        box.querySelectorAll('label').forEach(function (lab, k) {
          lab.classList.toggle('right', k === q.c);
          lab.classList.toggle('wrong', pick && +pick.value === k && k !== q.c);
        });
        if (pick && +pick.value === q.c) right++;
      });
      var pct = qs.length ? Math.round(right / qs.length * 100) : 100;
      var passed = pct >= 70;
      $('#score').innerHTML = right + ' / ' + qs.length + ' · ' + pct + '% ' + (passed ? '<span style="color:var(--ok)">Passed ✓</span>' : '<span style="color:var(--bad)">Not yet — review and retry</span>');
      P.quiz(L.id, { score: pct, best: Math.max(pct, saved.best || 0), passed: passed || !!saved.passed });
      saved = P.quiz(L.id);
      if (passed) { P.setDone(L.id, true); setDoneUI(); }
      $('#retry').style.display = '';
    });
    $('#retry').onclick = function () {
      form.reset();
      form.querySelectorAll('.q').forEach(function (b) { b.classList.remove('checked'); });
      form.querySelectorAll('label').forEach(function (l) { l.classList.remove('right', 'wrong'); });
      $('#score').textContent = '';
      this.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  function render() {
    renderSide();
    var main = $('#main-in');
    ({ video: renderVideo, article: renderArticle, activity: renderActivity, quiz: renderQuiz })[L.type](main);
    bindFooter();
  }

  $('#menu').onclick = function () { $('#side').classList.toggle('open'); };
  render();
})();
