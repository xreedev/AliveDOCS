/* HTML "video" player: renders animated scenes and narrates them sentence by sentence with the robotic TTS.
   Each sentence (cue) is synthesised separately, so captions, bullet reveals and seeking stay in sync. */
(function () {
  var api = function () { return window.COURSE.api; };
  var GAP = 0.35; // pause after each sentence, seconds

  function fmt(t) {
    t = Math.max(0, Math.round(t));
    var m = Math.floor(t / 60), s = t % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function Player(root, opts) {
    var a = api(), self = this;
    this.opts = opts;
    this.n = opts.n;
    this.day = a.dayMeta(opts.n);
    var v = a.buildVideo(opts.n);
    this.scenes = v.scenes;
    this.cues = v.cues;
    this.dur = this.cues.map(function (c) { return TTS.estimate(c.text) + GAP; });
    this.exact = this.cues.map(function () { return false; });
    this.heard = {};
    this.i = 0; this.offset = 0; this.playing = false; this.token = 0; this.rate = 1;
    this.cc = true; this.sceneShown = -1;
    this.build(root);
    var saved = a.progress.videoPos(opts.id);
    if (saved > 0 && saved < this.total() - 5) this.seek(saved, true); else this.renderCue(0);
    this.updateTime();
    TTS.warm();
    this.raf = function () { self.tick(); requestAnimationFrame(self.raf); };
    requestAnimationFrame(this.raf);
  }

  Player.prototype.total = function () { return this.dur.reduce(function (s, d) { return s + d; }, 0); };
  Player.prototype.startOf = function (i) { var s = 0; for (var k = 0; k < i; k++) s += this.dur[k]; return s; };
  Player.prototype.position = function () {
    var p = this.startOf(this.i) + this.offset;
    if (this.playing && this.t0 != null) p += (performance.now() - this.t0) / 1000 * this.rate;
    return Math.min(p, this.startOf(this.i) + this.dur[this.i] || p);
  };

  Player.prototype.build = function (root) {
    var self = this, a = api();
    root.innerHTML = '';
    var wrap = el('div', 'vp');
    wrap.tabIndex = 0;
    var stage = el('div', 'vp-stage');
    this.sceneEl = el('div', 'vp-scene');
    this.ccEl = el('div', 'vp-cc');
    this.avatar = el('div', 'vp-avatar', '<div class="vp-face"><i></i><i></i><b><s></s><s></s><s></s><s></s><s></s></b></div>');
    this.big = el('button', 'vp-bigplay', '<span>▶</span><em>Play lesson</em>');
    this.loading = el('div', 'vp-loading', '<div class="vp-spin"></div><span>Warming up the narrator…</span>');
    this.badge = el('div', 'vp-badge', a.esc(a.dayLabel(this.n)) + ' · ' + a.esc(this.day.topic));
    stage.appendChild(this.sceneEl); stage.appendChild(this.badge); stage.appendChild(this.avatar); stage.appendChild(this.ccEl);
    stage.appendChild(this.loading); stage.appendChild(this.big);
    stage.addEventListener('click', function (e) { if (e.target.closest('.vp-menu')) return; self.toggle(); });

    var bar = el('div', 'vp-bar');
    this.track = el('div', 'vp-track', '<div class="vp-fill"></div><div class="vp-head"></div>');
    this.fill = this.track.firstChild; this.head = this.track.lastChild;
    this.ticks = el('div', 'vp-ticks');
    this.track.appendChild(this.ticks);
    this.tip = el('div', 'vp-tip');
    this.track.appendChild(this.tip);
    this.track.addEventListener('click', function (e) {
      var r = self.track.getBoundingClientRect();
      self.seek((e.clientX - r.left) / r.width * self.total());
    });
    this.track.addEventListener('mousemove', function (e) {
      var r = self.track.getBoundingClientRect(), t = (e.clientX - r.left) / r.width * self.total();
      var i = self.cueAt(t).i, sc = self.scenes[self.cues[i].s];
      self.tip.textContent = fmt(t) + ' · ' + (sc.title || '');
      self.tip.style.left = Math.min(Math.max(0, e.clientX - r.left), r.width) + 'px';
    });
    var row = el('div', 'vp-row');
    this.btnPlay = el('button', 'vp-btn', '▶'); this.btnPlay.title = 'Play / pause (space)';
    var back = el('button', 'vp-btn', '⟲'); back.title = 'Back one sentence (←)';
    var fwd = el('button', 'vp-btn', '⟳'); fwd.title = 'Forward one sentence (→)';
    this.timeEl = el('span', 'vp-time', '0:00 / 0:00');
    this.btnPlay.onclick = function () { self.toggle(); };
    back.onclick = function () { self.step(-1); };
    fwd.onclick = function () { self.step(1); };
    var sp = el('span', 'vp-grow');
    this.chapBtn = el('button', 'vp-btn vp-txt', 'Chapters');
    this.speedBtn = el('button', 'vp-btn vp-txt', '1×');
    this.voiceBtn = el('button', 'vp-btn vp-txt', 'Voice');
    this.ccBtn = el('button', 'vp-btn vp-txt on', 'CC');
    var fs = el('button', 'vp-btn', '⛶'); fs.title = 'Fullscreen (f)';
    this.chapBtn.onclick = function (e) { e.stopPropagation(); self.menu('chapters', self.chapBtn); };
    this.speedBtn.onclick = function (e) { e.stopPropagation(); self.menu('speed', self.speedBtn); };
    this.voiceBtn.onclick = function (e) { e.stopPropagation(); self.menu('voice', self.voiceBtn); };
    this.ccBtn.onclick = function () { self.cc = !self.cc; self.ccBtn.classList.toggle('on', self.cc); self.ccEl.style.display = self.cc ? '' : 'none'; };
    fs.onclick = function () {
      if (document.fullscreenElement) document.exitFullscreen(); else if (wrap.requestFullscreen) wrap.requestFullscreen();
    };
    [this.btnPlay, back, fwd, this.timeEl, sp, this.chapBtn, this.speedBtn, this.voiceBtn, this.ccBtn, fs].forEach(function (b) { row.appendChild(b); });
    bar.appendChild(this.track); bar.appendChild(row);
    wrap.appendChild(stage); wrap.appendChild(bar);
    root.appendChild(wrap);
    this.wrap = wrap;
    wrap.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); self.toggle(); }
      else if (e.key === 'ArrowLeft' || e.key === 'j') { e.preventDefault(); self.step(-1); }
      else if (e.key === 'ArrowRight' || e.key === 'l') { e.preventDefault(); self.step(1); }
      else if (e.key === 'f') fs.onclick();
      else if (e.key === 'c') self.ccBtn.onclick();
    });
    document.addEventListener('click', function () { self.closeMenu(); });
    this.drawTicks();
  };

  Player.prototype.drawTicks = function () {
    var self = this, T = this.total();
    this.ticks.innerHTML = '';
    this.scenes.forEach(function (s, si) {
      if (!si) return;
      var t = el('i');
      t.style.left = (self.startOf(s.cueStart) / T * 100) + '%';
      self.ticks.appendChild(t);
    });
  };

  Player.prototype.menu = function (kind, anchor) {
    var self = this;
    if (this.menuEl && this.menuEl.dataset.kind === kind) { this.closeMenu(); return; }
    this.closeMenu();
    var m = el('div', 'vp-menu');
    m.dataset.kind = kind;
    m.addEventListener('click', function (e) { e.stopPropagation(); });
    if (kind === 'chapters') {
      this.scenes.forEach(function (s) {
        var b = el('button', '', '<span>' + fmt(self.startOf(s.cueStart)) + '</span>' + api().esc(s.title || 'Intro'));
        if (self.cues[self.i] && self.cues[self.i].s === self.scenes.indexOf(s)) b.className = 'on';
        b.onclick = function () { self.seek(self.startOf(s.cueStart) + 0.01); self.closeMenu(); };
        m.appendChild(b);
      });
    } else if (kind === 'speed') {
      [0.75, 1, 1.25, 1.5, 1.75, 2].forEach(function (r) {
        var b = el('button', r === self.rate ? 'on' : '', r + '×');
        b.onclick = function () { self.setRate(r); self.closeMenu(); };
        m.appendChild(b);
      });
    } else {
      Object.keys(TTS.PRESETS).forEach(function (k) {
        var b = el('button', TTS.settings.preset === k ? 'on' : '', api().esc(TTS.PRESETS[k].label));
        b.onclick = function () { self.setVoice(k); self.closeMenu(); };
        m.appendChild(b);
      });
      var vol = el('label', 'vp-vol', 'Volume <input type="range" min="0" max="1.5" step="0.05" value="' + TTS.settings.volume + '">');
      vol.querySelector('input').oninput = function (e) { TTS.setVolume(+e.target.value); };
      m.appendChild(vol);
      m.appendChild(el('p', 'vp-note', 'Narration by meSpeak, an open-source port of eSpeak, synthesised in your browser. Engine: ' + TTS.engine()));
    }
    this.wrap.appendChild(m);
    var r = anchor.getBoundingClientRect(), w = this.wrap.getBoundingClientRect();
    m.style.right = Math.max(8, w.right - r.right) + 'px';
    this.menuEl = m;
  };
  Player.prototype.closeMenu = function () { if (this.menuEl) { this.menuEl.remove(); this.menuEl = null; } };

  Player.prototype.setRate = function (r) {
    var pos = this.position();
    this.rate = r;
    this.speedBtn.textContent = r + '×';
    if (this.playing) this.seek(pos);
  };
  Player.prototype.setVoice = function (k) {
    var pos = this.position();
    TTS.setPreset(k);
    var self = this;
    this.cues.forEach(function (c, i) { if (!self.exact[i]) self.dur[i] = TTS.estimate(c.text) + GAP; });
    this.exact = this.exact.map(function () { return false; });
    if (this.playing) this.seek(pos);
  };

  Player.prototype.cueAt = function (t) {
    var s = 0;
    for (var i = 0; i < this.cues.length; i++) {
      if (t < s + this.dur[i]) return { i: i, off: t - s };
      s += this.dur[i];
    }
    return { i: this.cues.length - 1, off: Math.max(0, this.dur[this.cues.length - 1] - 0.01) };
  };

  Player.prototype.toggle = function () { if (this.playing) this.pause(); else this.play(); };
  Player.prototype.play = function () {
    TTS.unlock();
    this.big.style.display = 'none';
    if (this.i >= this.cues.length - 1 && this.offset >= this.dur[this.i] - 0.05) { this.i = 0; this.offset = 0; }
    this.playing = true;
    this.btnPlay.textContent = '❚❚';
    this.wrap.classList.add('playing');
    this.run(this.i, this.offset);
  };
  Player.prototype.pause = function () {
    this.offset = this.position() - this.startOf(this.i);
    this.playing = false;
    this.token++;
    this.t0 = null;
    if (this.handle) { this.handle.stop(); this.handle = null; }
    this.btnPlay.textContent = '▶';
    this.wrap.classList.remove('playing');
    this.loading.style.display = 'none';
    api().progress.videoPos(this.opts.id, this.position());
  };
  Player.prototype.seek = function (t, silent) {
    t = Math.max(0, Math.min(t, this.total() - 0.01));
    var c = this.cueAt(t);
    var was = this.playing;
    if (was) { this.token++; if (this.handle) { this.handle.stop(); this.handle = null; } }
    this.i = c.i; this.offset = c.off; this.t0 = null;
    this.renderCue(c.i);
    this.updateTime();
    if (was) this.run(c.i, c.off);
    else if (!silent) this.big.style.display = 'none';
  };
  Player.prototype.step = function (d) {
    var i = Math.max(0, Math.min(this.cues.length - 1, this.i + d));
    if (d < 0 && this.position() - this.startOf(this.i) > 1.5) i = this.i;
    this.seek(this.startOf(i) + 0.001);
  };

  Player.prototype.prefetch = function (from) {
    for (var k = from; k < Math.min(this.cues.length, from + 4); k++) this.clip(k);
  };
  Player.prototype.clip = function (i) {
    var self = this;
    return TTS.prepare(this.cues[i].text).then(function (clip) {
      if (clip.exact && !self.exact[i]) {
        self.exact[i] = true;
        self.dur[i] = clip.duration + GAP;
        self.drawTicks();
      }
      return clip;
    });
  };

  Player.prototype.run = function (i, offset) {
    var self = this, my = ++this.token;
    function next(i, offset) {
      if (my !== self.token || !self.playing) return;
      if (i >= self.cues.length) { self.finish(); return; }
      self.i = i; self.offset = offset; self.t0 = null;
      self.renderCue(i);
      self.prefetch(i + 1);
      var spin = setTimeout(function () { if (my === self.token) self.loading.style.display = 'flex'; }, 250);
      self.clip(i).then(function (clip) {
        clearTimeout(spin);
        self.loading.style.display = 'none';
        if (my !== self.token || !self.playing) return;
        var speak = self.dur[i] - GAP;
        if (offset >= speak) {
          // landed in the pause after a sentence
          self.t0 = performance.now();
          self.offset = offset;
          self.gapTimer = setTimeout(function () { next(i + 1, 0); }, (self.dur[i] - offset) * 1000 / self.rate);
          return;
        }
        self.t0 = performance.now();
        self.offset = offset;
        self.heard[i] = true;
        var h = self.handle = clip.play(offset, self.rate);
        h.ended.then(function (ok) {
          if (!ok || my !== self.token) return;
          self.handle = null;
          self.checkDone();
          self.gapTimer = setTimeout(function () { next(i + 1, 0); }, GAP * 1000 / self.rate);
        });
      }, function () {
        clearTimeout(spin);
        self.loading.innerHTML = '<span>Narrator failed to load. Read the transcript below.</span>';
        self.loading.style.display = 'flex';
      });
    }
    clearTimeout(this.gapTimer);
    next(i, offset || 0);
  };

  Player.prototype.checkDone = function () {
    var heard = Object.keys(this.heard).length;
    if (!this.doneFired && heard >= this.cues.length * 0.9) {
      this.doneFired = true;
      if (this.opts.onComplete) this.opts.onComplete();
    }
  };
  Player.prototype.finish = function () {
    this.playing = false;
    this.i = this.cues.length - 1; this.offset = this.dur[this.i]; this.t0 = null;
    this.btnPlay.textContent = '↻';
    this.wrap.classList.remove('playing');
    this.checkDone();
    api().progress.videoPos(this.opts.id, 0);
    if (this.opts.onEnd) this.opts.onEnd();
  };

  Player.prototype.tick = function () {
    if (this.playing && this.t0 != null) {
      this.updateTime();
      var lv = TTS.level();
      this.avatar.style.setProperty('--lv', lv.toFixed(3));
      var now = performance.now();
      if (!this.lastSave || now - this.lastSave > 4000) { this.lastSave = now; api().progress.videoPos(this.opts.id, this.position()); }
    } else {
      this.avatar.style.setProperty('--lv', 0);
    }
  };
  Player.prototype.updateTime = function () {
    var T = this.total(), p = this.position();
    var pct = T ? Math.min(100, p / T * 100) : 0;
    this.fill.style.width = pct + '%';
    this.head.style.left = pct + '%';
    this.timeEl.textContent = fmt(p) + ' / ' + fmt(T);
    if (this.opts.onTime) this.opts.onTime(this.i);
  };

  // ---------- scene rendering ----------
  Player.prototype.renderCue = function (i) {
    var c = this.cues[i];
    if (!c) return;
    var s = this.scenes[c.s];
    if (this.sceneShown !== c.s) { this.renderScene(c.s); this.sceneShown = c.s; }
    var j = i - s.cueStart, ns = s.cueEnd - s.cueStart;
    var items = this.sceneEl.querySelectorAll('[data-b]');
    if (items.length) {
      var shown = Math.floor((j + 1) * items.length / ns);
      if (s.kind === 'tasks' || s.kind === 'links' || s.kind === 'summary' || s.kind === 'recap') shown = Math.min(items.length, j);
      if (j === ns - 1) shown = items.length;
      items.forEach(function (b, k) {
        b.classList.toggle('in', k < shown);
        b.classList.toggle('now', k === shown - 1);
      });
      var now = this.sceneEl.querySelector('.now');
      var list = this.sceneEl.querySelector('.sc-list');
      if (now && list && list.scrollHeight > list.clientHeight) list.scrollTop = now.offsetTop - list.clientHeight / 2;
    }
    var q = this.sceneEl.querySelector('.sc-quote');
    if (q) {
      var spans = q.querySelectorAll('span[data-q]');
      var qi = j - 1; // first cue is the lead-in sentence
      spans.forEach(function (sp, k) { sp.classList.toggle('now', k === qi); sp.classList.toggle('past', k < qi); });
      var cur = q.querySelector('span.now');
      if (cur && q.scrollHeight > q.clientHeight) q.scrollTop = cur.offsetTop - q.clientHeight / 3;
    }
    this.ccEl.textContent = c.text;
    if (this.opts.onTime) this.opts.onTime(i);
  };

  Player.prototype.renderScene = function (si) {
    var a = api(), s = this.scenes[si], d = this.day, h = '';
    var p = a.where(this.n), mod = COURSE.modules[p.m - 1];
    var bullets = (s.bullets || []).map(function (b, k) {
      return '<li data-b="' + k + '"' + (b.num ? ' class="num"' : '') + '>' + (b.num ? '<em>' + (k + 1) + '</em>' : '') + a.md(b.text) + '</li>';
    }).join('');
    var list = bullets ? '<ul class="sc-list' + (s.bullets.length > 6 ? ' dense' : '') + '">' + bullets + '</ul>' : '';
    var v = s.visual;
    var title = s.title ? '<h2 class="sc-title">' + a.md(s.title) + '</h2>' : '';
    if (v && v.type === 'intro') {
      h = '<div class="sc-intro"><div class="sc-intro-txt">' +
        '<div class="sc-kicker">Module ' + p.m + ' · ' + a.esc(mod.title) + '</div>' +
        '<div class="sc-daylab">' + a.esc(a.dayLabel(this.n)) + '</div>' +
        '<h1>' + a.md(d.title) + '</h1>' +
        '<div class="sc-chips"><span>' + a.esc(d.topic) + '</span><span>Section ' + p.w + ' · ' + a.esc(mod.sections[p.w - 1].title) + '</span><span>' + (d.hours || 2) + ' h of hands-on work</span></div>' +
        (d.goal ? '<p class="sc-goal"><b>Today\'s goal:</b> ' + a.md(d.goal) + '</p>' : '') +
        '</div><div class="sc-intro-art">' + DIAGRAMS.get(d.svg || DIAGRAMS.forTopic(d.topic)) + '</div></div>';
    } else if (v && v.type === 'quote') {
      // one span per narrated sentence (skipping the lead-in) so highlighting follows the voice exactly
      var sents = this.cues.slice(s.cueStart + 1, s.cueEnd).map(function (c) { return c.text; });
      h = title + '<div class="sc-quote">' + sents.map(function (x, k) { return '<span data-q="' + k + '">' + a.md(x) + '</span> '; }).join('') + '</div>';
    } else if (v && v.type === 'eq') {
      h = title + '<div class="sc-eq"><div class="sc-eq-f">' + a.esc(v.text) + '</div>' + (v.sub ? '<div class="sc-eq-s">' + a.md(v.sub) + '</div>' : '') + '</div>' + list;
    } else if (v && v.type === 'big') {
      h = title + '<div class="sc-big"><div>' + a.md(v.text) + '</div>' + (v.sub ? '<p>' + a.md(v.sub) + '</p>' : '') + '</div>' + list;
    } else if (v && v.type === 'svg') {
      h = title + '<div class="sc-split' + (list ? '' : ' solo') + '"><figure class="sc-fig">' + DIAGRAMS.get(v.text) + (v.sub ? '<figcaption>' + a.md(v.sub) + '</figcaption>' : '') + '</figure>' + list + '</div>';
    } else if (v && v.type === 'code') {
      h = title + '<div class="sc-split' + (list ? '' : ' solo') + '"><pre class="sc-code"><code>' + a.esc(v.code) + '</code></pre>' + list + '</div>';
    } else if (v && v.type === 'table') {
      var rows = v.rows;
      h = title + '<div class="sc-tablewrap"><table class="sc-table"><thead><tr>' + rows[0].map(function (c) { return '<th>' + a.md(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        rows.slice(1).map(function (r, k) { return '<tr data-b="' + k + '">' + r.map(function (c) { return '<td>' + a.md(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></div>' + list;
    } else if (list) {
      h = title + '<div class="sc-split' + (s.kind === 'teach' ? '' : ' wide') + '">' + list + (s.kind === 'teach' ? '<figure class="sc-fig faint">' + DIAGRAMS.get(DIAGRAMS.forTopic(d.topic)) + '</figure>' : '') + '</div>';
    } else {
      h = '<div class="sc-card"><h2>' + a.md(s.title || d.title) + '</h2><figure class="sc-fig">' + DIAGRAMS.get(DIAGRAMS.forTopic(d.topic)) + '</figure></div>';
    }
    this.sceneEl.className = 'vp-scene k-' + (s.kind || 'teach');
    this.sceneEl.innerHTML = h;
    // restart CSS entrance animation
    void this.sceneEl.offsetWidth;
    this.sceneEl.classList.add('enter');
  };

  window.VideoPlayer = Player;
})();
