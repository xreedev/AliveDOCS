/* Robotic narrator.
   Primary engine: meSpeak (GPL eSpeak port) in a Web Worker, rendered to WAV and played through Web Audio,
   so every sentence has an exact duration (captions, seeking and slide sync depend on that).
   Fallback: the browser's speechSynthesis, if the worker can't start. */
(function () {
  var PRESETS = {
    robot:   { label: 'Robot (eSpeak)',      opts: { pitch: 32, speed: 150, wordgap: 1 } },
    android: { label: 'Android (Klatt)',     opts: { pitch: 40, speed: 150, variant: 'klatt3' } },
    croak:   { label: 'Old droid (croak)',   opts: { pitch: 45, speed: 145, variant: 'croak' } },
    unit7:   { label: 'Unit-7 (male 7)',     opts: { pitch: 30, speed: 150, variant: 'm7' } },
    nova:    { label: 'Nova (female 2)',     opts: { pitch: 55, speed: 155, variant: 'f2' } }
  };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  var settings = Object.assign({ preset: 'robot', volume: 1 }, store.get('r6m.tts', {}));
  var ctx = null, master = null, analyser = null;
  var worker = null, workerOk = null, pending = {}, nextId = 1, cache = new Map();

  function audio() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = settings.volume;
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      master.connect(analyser);
      analyser.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function startWorker() {
    if (worker || workerOk === false) return;
    try {
      worker = new Worker('js/tts-worker.js');
    } catch (e) { workerOk = false; return; }
    worker.onmessage = function (e) {
      var m = e.data;
      if (m.ready) { workerOk = true; return; }
      if (m.fatal) { workerOk = false; failAll(m.fatal); return; }
      var p = pending[m.id];
      if (!p) return;
      delete pending[m.id];
      if (m.error) p.reject(new Error(m.error)); else p.resolve(m.buf);
    };
    worker.onerror = function (e) { workerOk = false; failAll(e.message || 'worker error'); };
  }
  function failAll(why) {
    Object.keys(pending).forEach(function (k) { pending[k].reject(new Error(why)); delete pending[k]; });
  }

  // Make technical text pronounceable by eSpeak.
  var WORDS = [
    [/\bROS 2\b/g, 'Ross two'], [/\bROS\b/g, 'Ross'], [/\bros2_control\b/g, 'ross two control'], [/\bros2\b/g, 'ross two'],
    [/\bESP32\b/g, 'E S P thirty-two'], [/\bI2C\b/g, 'I squared C'], [/\bSO-101\b/g, 'S O one oh one'],
    [/\bLiPo\b/gi, 'lie-poe'], [/\bNav2\b/g, 'Nav two'], [/\bxacro\b/g, 'zacro'], [/\bcolcon\b/g, 'coal con'],
    [/\btf2\b/g, 'T F two'], [/\bRViz\b/g, 'R viz'], [/\bMuJoCo\b/g, 'mew joe co'], [/\bOpenCV\b/g, 'Open C V'],
    [/\bSmolVLA\b/g, 'smol V L A'], [/\bLeRobot\b/g, 'le robot'], [/\bGitHub\b/g, 'git hub'], [/\bREADMEs?\b/g, function (m) { return m.length > 6 ? 'read-me files' : 'read-me'; }],
    [/\bJSON\b/g, 'jason'], [/\bCSV\b/g, 'C S V'], [/\bUSB\b/g, 'U S B'], [/\bLED(s?)\b/g, 'L E D$1'], [/\bDOF\b/g, 'degree of freedom'],
    [/\be\.g\./g, 'for example'], [/\bi\.e\./g, 'that is'], [/\bvs\.?\b/g, 'versus'], [/\betc\./g, 'etcetera'],
    [/\bPLA\b/g, 'P L A'], [/\bPETG\b/g, 'pet G'], [/\bTPU\b/g, 'T P U'], [/\bSTL\b/g, 'S T L'], [/\b3MF\b/g, 'three M F'],
    [/\bIMU\b/g, 'I M U'], [/\bPID\b/g, 'P I D'], [/\bLQR\b/g, 'L Q R'], [/\bMPC\b/g, 'M P C'], [/\bIK\b/g, 'I K'], [/\bFK\b/g, 'F K'],
    [/\bVLA(s?)\b/g, 'V L A$1'], [/\bACT\b/g, 'act'], [/\bRL\b/g, 'R L'], [/\bCAD\b/g, 'cad'], [/\bGPIO\b/g, 'G P I O']
  ];
  function speakable(t) {
    t = String(t)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\*\*|__|`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, 'the link on screen');
    WORDS.forEach(function (w) { t = t.replace(w[0], w[1]); });
    t = t
      .replace(/(\d)\s?kΩ/g, '$1 kilo-ohm').replace(/(\d)\s?MΩ/g, '$1 mega-ohm').replace(/(\d)\s?Ω/g, '$1 ohm').replace(/Ω/g, 'ohms')
      .replace(/(\d)\s?mA\b/g, '$1 milliamps').replace(/(\d)\s?µA\b/g, '$1 microamps').replace(/(\d)\s?A\b/g, '$1 amps')
      .replace(/(\d)\s?mV\b/g, '$1 millivolts').replace(/(\d)\s?V\b/g, '$1 volts').replace(/(\d)\s?W\b/g, '$1 watts')
      .replace(/(\d)\s?µF\b/g, '$1 microfarad').replace(/(\d)\s?nF\b/g, '$1 nanofarad').replace(/(\d)\s?pF\b/g, '$1 picofarad')
      .replace(/(\d)\s?mAh\b/g, '$1 milliamp hours').replace(/(\d)\s?Hz\b/g, '$1 hertz').replace(/(\d)\s?kHz\b/g, '$1 kilohertz')
      .replace(/(\d)\s?MHz\b/g, '$1 megahertz').replace(/(\d)\s?ms\b/g, '$1 milliseconds').replace(/(\d)\s?mm\b/g, '$1 millimetres')
      .replace(/(\d)\s?°C\b/g, '$1 degrees C').replace(/(\d)\s?°/g, '$1 degrees').replace(/(\d)\s?h\b/g, '$1 hours')
      .replace(/(\d)\s?%/g, '$1 percent')
      .replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/≈/g, ' about ').replace(/≤/g, ' at most ').replace(/≥/g, ' at least ')
      .replace(/→|->/g, ' to ').replace(/←/g, ' from ').replace(/±/g, ' plus or minus ').replace(/·/g, ', ')
      .replace(/\s=\s/g, ' equals ').replace(/\s\+\s/g, ' plus ').replace(/\s\/\s/g, ' over ')
      .replace(/θ/g, 'theta').replace(/τ/g, 'tau').replace(/ω/g, 'omega').replace(/Δ/g, 'delta').replace(/π/g, 'pi').replace(/λ/g, 'lambda')
      .replace(/[“”"]/g, '').replace(/[‘’]/g, "'").replace(/[–—]/g, ', ')
      .replace(/[#*_~|<>{}\[\]]/g, ' ')
      .replace(/\s+/g, ' ').trim();
    return t;
  }

  function wordsOf(t) { return (String(t).match(/\S+/g) || []).length; }
  function estimate(text) {
    var o = PRESETS[settings.preset].opts;
    return Math.max(0.8, wordsOf(speakable(text)) / (o.speed || 150) * 60 * 1.08);
  }

  function synthRaw(text) {
    startWorker();
    if (workerOk === false) return Promise.reject(new Error('no worker'));
    var o = PRESETS[settings.preset].opts;
    return new Promise(function (resolve, reject) {
      var id = nextId++;
      pending[id] = { resolve: resolve, reject: reject };
      worker.postMessage({ id: id, text: text, opts: o });
    });
  }

  // prepare(text) -> Promise<Clip>. Clip: {duration, exact, play(offset, rate) -> {stop(), ended: Promise}}
  function prepare(text) {
    var say = speakable(text);
    var key = settings.preset + '|' + say;
    if (cache.has(key)) return cache.get(key);
    var p;
    if (!say) {
      p = Promise.resolve(silentClip(0.3));
    } else {
      p = synthRaw(say).then(function (buf) {
        return audio().decodeAudioData(buf);
      }).then(bufferClip, function () {
        return webSpeechClip(say);
      });
    }
    cache.set(key, p);
    if (cache.size > 400) cache.delete(cache.keys().next().value);
    return p;
  }

  function bufferClip(ab) {
    return {
      duration: ab.duration, exact: true,
      play: function (offset, rate) {
        var c = audio();
        var src = c.createBufferSource();
        src.buffer = ab;
        src.playbackRate.value = rate || 1;
        src.connect(master);
        var done, stopped = false;
        var ended = new Promise(function (r) { done = r; });
        src.onended = function () { done(!stopped); };
        src.start(0, Math.min(Math.max(0, offset || 0), ab.duration));
        return { stop: function () { stopped = true; try { src.stop(); } catch (e) { done(false); } }, ended: ended };
      }
    };
  }
  function silentClip(d) {
    return {
      duration: d, exact: true,
      play: function (offset, rate) {
        var t, done, ended = new Promise(function (r) { done = r; });
        t = setTimeout(function () { done(true); }, Math.max(0, d - (offset || 0)) * 1000 / (rate || 1));
        return { stop: function () { clearTimeout(t); done(false); }, ended: ended };
      }
    };
  }
  function webSpeechClip(say) {
    var dur = estimate(say);
    if (!('speechSynthesis' in window)) return silentClip(dur);
    return {
      duration: dur, exact: false,
      play: function (offset, rate) {
        var u = new SpeechSynthesisUtterance(say);
        u.rate = (rate || 1) * 0.95; u.pitch = 0.2;
        var done, stopped = false, ended = new Promise(function (r) { done = r; });
        u.onend = function () { done(!stopped); };
        u.onerror = function () { done(!stopped); };
        speechSynthesis.speak(u);
        return { stop: function () { stopped = true; speechSynthesis.cancel(); done(false); }, ended: ended };
      }
    };
  }

  function level() {
    if (!analyser) return 0;
    var a = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(a);
    var s = 0;
    for (var i = 0; i < a.length; i++) { var v = (a[i] - 128) / 128; s += v * v; }
    return Math.min(1, Math.sqrt(s / a.length) * 4);
  }

  window.TTS = {
    PRESETS: PRESETS,
    settings: settings,
    speakable: speakable,
    estimate: estimate,
    prepare: prepare,
    level: level,
    unlock: function () { audio(); startWorker(); },
    warm: startWorker,
    engine: function () { return workerOk === false ? 'webspeech' : 'mespeak'; },
    setPreset: function (p) { if (PRESETS[p]) { settings.preset = p; store.set('r6m.tts', settings); cache.clear(); } },
    setVolume: function (v) { settings.volume = v; if (master) master.gain.value = v; store.set('r6m.tts', settings); }
  };
})();
