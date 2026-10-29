/* Animated SVG diagrams for the lesson videos. Each returns markup for a 640×360 viewBox.
   Used from video scripts with "@svg name | caption". */
(function () {
  var A = '#f97316', T = '#2dd4bf', Y = '#facc15', W = '#e2e8f0', M = '#64748b', B = '#38bdf8', R = '#f87171', G = '#4ade80';
  function svg(body) {
    return '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="ui-sans-serif,system-ui,sans-serif" ' +
      'font-size="16" fill="none" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }
  function txt(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" fill="' + (o.c || W) + '" font-size="' + (o.s || 16) + '" text-anchor="' + (o.a || 'middle') + '"' +
      (o.w ? ' font-weight="' + o.w + '"' : '') + (o.f ? ' font-family="ui-monospace,monospace"' : '') + '>' + s + '</text>';
  }
  function dots(path, n, dur, color) {
    var s = '<path id="P' + (++uid) + '" d="' + path + '" stroke="none"/>';
    for (var i = 0; i < n; i++) {
      s += '<circle r="5" fill="' + (color || Y) + '"><animateMotion dur="' + dur + 's" repeatCount="indefinite" begin="-' + (dur * i / n).toFixed(2) + 's"><mpath href="#P' + uid + '"/></animateMotion></circle>';
    }
    return s;
  }
  var uid = 0;
  function resistor(x, y, horiz) {
    var p = horiz ? 'M' + x + ' ' + y + ' l10 0 l6 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l6 -12 l10 0'
      : 'M' + x + ' ' + y + ' l0 10 l-12 6 l24 12 l-24 12 l24 12 l-24 12 l24 12 l-12 6 l0 10';
    return '<path d="' + p + '" stroke="' + A + '" stroke-width="3"/>';
  }
  function gearPath(cx, cy, r, teeth) {
    var d = '', n = teeth * 2;
    for (var i = 0; i <= n; i++) {
      var a = i / n * Math.PI * 2, rr = i % 2 ? r : r + 12;
      var a2 = (i + 0.5) / n * Math.PI * 2;
      d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) +
        'L' + (cx + rr * Math.cos(a2)).toFixed(1) + ' ' + (cy + rr * Math.sin(a2)).toFixed(1);
    }
    return d + 'Z';
  }
  function axes(x, y, label, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')">' +
      '<path d="M0 0 L40 0" stroke="' + R + '" stroke-width="3"/><path d="M0 0 L0 -40" stroke="' + G + '" stroke-width="3"/>' +
      '<circle r="4" fill="' + B + '"/></g>' + txt(x, y + 24, label, { s: 14, c: Y });
  }
  function box(x, y, w, h, label, c, sub) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" stroke="' + (c || T) + '" stroke-width="2.5" fill="#0b1220"/>' +
      txt(x + w / 2, y + h / 2 + (sub ? -2 : 6), label, { w: 600 }) + (sub ? txt(x + w / 2, y + h / 2 + 18, sub, { s: 12, c: M }) : '');
  }
  function arrow(d, c) {
    return '<path d="' + d + '" stroke="' + (c || M) + '" stroke-width="2.5" marker-end="url(#ah)"/>';
  }
  var defs = '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0 0 L10 5 L0 10 z" fill="' + M + '"/></marker></defs>';

  var LIB = {
    ohm: function () {
      var loop = 'M140 280 L140 80 L500 80 L500 280 Z';
      return svg('<path d="' + loop + '" stroke="' + M + '" stroke-width="3"/>' +
        '<rect x="110" y="150" width="60" height="70" fill="#0b1220" stroke="none"/>' +
        '<path d="M115 170 h50 M128 185 h24 M115 200 h50 M128 215 h24" stroke="' + Y + '" stroke-width="4"/>' +
        txt(80, 195, 'V', { s: 28, c: Y, w: 700 }) +
        '<rect x="270" y="60" width="100" height="40" fill="#0b1220" stroke="none"/>' + resistor(260, 80, true) +
        txt(320, 50, 'R', { s: 28, c: A, w: 700 }) +
        dots(loop, 10, 6, B) + txt(540, 185, 'I', { s: 28, c: B, w: 700 }) +
        txt(320, 200, 'V = I × R', { s: 40, w: 700 }) + txt(320, 236, 'more R → less I for the same V', { s: 15, c: M }));
    },
    divider: function () {
      return svg('<path d="M320 40 L320 70 M320 150 L320 190 M320 270 L320 310" stroke="' + M + '" stroke-width="3"/>' +
        resistor(320, 70, false) + '<g transform="translate(0 120)">' + resistor(320, 70, false) + '</g>' +
        '<path d="M300 315 h40 M308 324 h24 M315 332 h10" stroke="' + M + '" stroke-width="3"/>' +
        txt(320, 30, 'Vin = 9 V', { c: Y, w: 600 }) + txt(370, 115, 'R1', { c: A }) + txt(370, 235, 'R2', { c: A }) +
        '<circle cx="320" cy="180" r="6" fill="' + T + '"/><path d="M320 180 L450 180" stroke="' + T + '" stroke-width="3"/>' +
        txt(470, 186, 'Vout', { c: T, w: 700, a: 'start' }) +
        txt(150, 170, 'Vout = Vin × R2', { s: 20, w: 600 }) + '<path d="M60 182 h180" stroke="' + W + '" stroke-width="2"/>' +
        txt(150, 205, '(R1 + R2)', { s: 20, w: 600 }) +
        '<circle cx="320" cy="180" r="14" stroke="' + T + '" stroke-width="2"><animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></circle>');
    },
    pullup: function () {
      return svg('<path d="M380 40 L380 70 M380 150 L380 200 L250 200 M380 200 L380 230 M380 300 L380 320" stroke="' + M + '" stroke-width="3"/>' +
        resistor(380, 70, false) + txt(420, 115, '10 kΩ', { c: A, a: 'start' }) + txt(380, 30, '3.3 V', { c: Y, w: 600 }) +
        box(90, 165, 160, 70, 'GPIO pin', T, 'microcontroller') +
        '<circle cx="380" cy="235" r="4" fill="' + W + '"/><circle cx="380" cy="295" r="4" fill="' + W + '"/>' +
        '<path d="M380 235 L410 290" stroke="' + W + '" stroke-width="3"><animate attributeName="d" values="M380 235 L410 290;M380 235 L410 290;M380 235 L380 295;M380 235 L380 295" dur="3s" repeatCount="indefinite"/></path>' +
        '<path d="M360 325 h40 M368 334 h24" stroke="' + M + '" stroke-width="3"/>' + txt(450, 268, 'button', { c: M, a: 'start' }) +
        '<text x="170" y="290" text-anchor="middle" font-size="26" font-weight="700" fill="' + G + '">HIGH<animate attributeName="opacity" values="1;1;0;0" dur="3s" repeatCount="indefinite"/></text>' +
        '<text x="170" y="290" text-anchor="middle" font-size="26" font-weight="700" fill="' + R + '" opacity="0">LOW<animate attributeName="opacity" values="0;0;1;1" dur="3s" repeatCount="indefinite"/></text>' +
        txt(170, 320, 'released → HIGH · pressed → LOW', { s: 13, c: M }));
    },
    cap: function () {
      var curve = 'M120 300 C 200 120, 260 95, 560 80';
      return svg('<path d="M100 300 H580 M100 300 V50" stroke="' + M + '" stroke-width="2"/>' +
        '<path d="M100 80 H580" stroke="' + M + '" stroke-width="1" stroke-dasharray="6 6"/>' + txt(70, 85, 'Vs', { c: Y }) +
        '<path d="' + curve + '" stroke="' + T + '" stroke-width="4" stroke-dasharray="600" stroke-dashoffset="600"><animate attributeName="stroke-dashoffset" values="600;0;0" dur="4s" repeatCount="indefinite"/></path>' +
        '<path d="M196 300 V158" stroke="' + A + '" stroke-dasharray="4 4"/>' + txt(196, 322, 'τ = R×C', { c: A }) + txt(220, 150, '63%', { c: A, a: 'start' }) +
        txt(580, 322, 'time', { c: M, a: 'end' }) + txt(470, 200, 'capacitor charging', { c: W }) +
        '<path d="M460 230 v20 M440 250 h40 M440 262 h40 M460 262 v20" stroke="' + Y + '" stroke-width="3"/>');
    },
    transistor: function () {
      var flow = 'M440 40 L440 120 L440 190 L440 250 L440 320';
      return svg('<path d="M440 40 V100 M440 160 V190 M400 230 L440 190 M400 230 L440 270 L440 320 M330 230 H400" stroke="' + M + '" stroke-width="3"/>' +
        '<path d="M400 205 V255" stroke="' + W + '" stroke-width="4"/>' +
        '<circle cx="440" cy="130" r="30" stroke="' + A + '" stroke-width="3"/>' + txt(440, 137, 'M', { s: 22, c: A, w: 700 }) +
        '<path d="M520 100 L520 160 M505 145 L535 145 L520 125 Z M505 125 h30" stroke="' + B + '" stroke-width="2.5"/><path d="M440 95 H520 M440 165 H520" stroke="' + B + '" stroke-width="2"/>' +
        txt(560, 135, 'flyback diode', { s: 13, c: B, a: 'start' }) +
        '<g transform="translate(-60 0)">' + resistor(240, 230, true) + '</g>' + txt(240, 215, '1 kΩ', { c: A }) +
        box(60, 200, 110, 60, 'GPIO', T) + '<path d="M170 230 H180" stroke="' + M + '" stroke-width="3"/>' +
        txt(440, 30, '+V (motor supply)', { c: Y }) + txt(490, 240, 'NPN', { c: W, a: 'start' }) + txt(440, 345, 'GND', { c: M }) +
        '<g>' + dots(flow, 6, 3, Y) + '<animate attributeName="opacity" values="1;1;0;0" dur="4s" repeatCount="indefinite"/></g>' +
        '<text x="115" y="300" text-anchor="middle" font-size="18" font-weight="700" fill="' + G + '">ON<animate attributeName="opacity" values="1;1;0;0" dur="4s" repeatCount="indefinite"/></text>' +
        '<text x="115" y="300" text-anchor="middle" font-size="18" font-weight="700" fill="' + R + '" opacity="0">OFF<animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite"/></text>');
    },
    pwm: function () {
      function wave(y, duty, c, label) {
        var d = '', x = 80, p = 120;
        for (var i = 0; i < 4; i++) { d += (i ? 'L' : 'M') + x + ' ' + (y + 40) + ' L' + x + ' ' + y + ' L' + (x + p * duty) + ' ' + y + ' L' + (x + p * duty) + ' ' + (y + 40) + ' L' + (x + p) + ' ' + (y + 40); x += p; }
        return '<path d="' + d + '" stroke="' + c + '" stroke-width="3"/>' + txt(60, y + 26, label, { c: c, a: 'end', w: 700 }) +
          '<rect x="570" y="' + y + '" width="40" height="40" rx="8" fill="' + c + '" opacity="' + (0.15 + duty * 0.85) + '"/>';
      }
      return svg(wave(50, 0.25, B, '25%') + wave(150, 0.5, T, '50%') + wave(250, 0.75, A, '75%') +
        '<path d="M80 30 V320" stroke="' + W + '" stroke-width="1.5" opacity=".6"><animate attributeName="d" values="M80 30 V320;M560 30 V320" dur="4s" repeatCount="indefinite"/></path>' +
        txt(320, 345, 'same voltage, different ON-time → average power', { s: 14, c: M }) + txt(590, 30, 'avg', { s: 13, c: M }));
    },
    hbridge: function () {
      function sw(x, y, on) {
        return '<circle cx="' + x + '" cy="' + y + '" r="22" stroke="' + M + '" stroke-width="3" fill="#0b1220">' +
          '<animate attributeName="stroke" values="' + (on ? G + ';' + G + ';' + M + ';' + M : M + ';' + M + ';' + G + ';' + G) + '" dur="4s" repeatCount="indefinite" calcMode="discrete"/></circle>';
      }
      return svg('<path d="M200 50 H440 M200 50 V310 M440 50 V310 M200 310 H440 M200 180 H270 M370 180 H440" stroke="' + M + '" stroke-width="3"/>' +
        sw(200, 110, 1) + sw(440, 110, 0) + sw(200, 250, 0) + sw(440, 250, 1) +
        txt(200, 116, 'S1', { s: 13 }) + txt(440, 116, 'S2', { s: 13 }) + txt(200, 256, 'S3', { s: 13 }) + txt(440, 256, 'S4', { s: 13 }) +
        '<circle cx="320" cy="180" r="48" stroke="' + A + '" stroke-width="3" fill="#0b1220"/>' + txt(320, 188, 'M', { s: 26, c: A, w: 700 }) +
        '<path d="M320 118 A62 62 0 0 1 377 150" stroke="' + Y + '" stroke-width="3" marker-end="url(#ah)"><animate attributeName="opacity" values="1;1;0;0" dur="4s" repeatCount="indefinite" calcMode="discrete"/></path>' +
        '<path d="M320 118 A62 62 0 0 0 263 150" stroke="' + Y + '" stroke-width="3" marker-end="url(#ah)" opacity="0"><animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite" calcMode="discrete"/></path>' +
        txt(320, 35, '+V', { c: Y }) + txt(320, 340, 'S1+S4 → forward · S2+S3 → reverse · never S1+S3!', { s: 14, c: M }) + defs);
    },
    bus: function () {
      return svg(box(40, 130, 130, 100, 'MCU', T, 'controller') +
        '<path d="M170 160 H600 M170 200 H600" stroke="' + M + '" stroke-width="3"/>' + txt(610, 165, 'SDA', { c: B, a: 'start', s: 13 }) + txt(610, 205, 'SCL', { c: Y, a: 'start', s: 13 }) +
        [260, 380, 500].map(function (x, i) {
          return '<path d="M' + x + ' 160 V100 M' + (x + 30) + ' 200 V100" stroke="' + M + '" stroke-width="2"/>' + box(x - 20, 40, 90, 60, ['IMU', 'ToF', 'OLED'][i], A, ['0x68', '0x29', '0x3C'][i]);
        }).join('') +
        dots('M170 160 H600', 5, 2.5, B) + dots('M170 200 H600', 8, 1.2, Y) +
        txt(320, 280, 'Two wires, many devices — each has an address', { s: 18 }) + txt(320, 310, 'SPI adds MISO / MOSI / SCK + one CS line per device', { s: 14, c: M }));
    },
    encoder: function () {
      var slots = '';
      for (var i = 0; i < 12; i++) slots += '<rect x="-6" y="-95" width="12" height="26" fill="#0b1220" transform="rotate(' + i * 30 + ')"/>';
      function sq(y, ph, c, l) {
        var d = 'M300 ' + (y + 30), x = 300 + ph;
        d += ' L' + x + ' ' + (y + 30);
        while (x < 600) { d += ' L' + x + ' ' + y + ' L' + Math.min(600, x + 25) + ' ' + y + ' L' + Math.min(600, x + 25) + ' ' + (y + 30) + ' L' + Math.min(600, x + 50) + ' ' + (y + 30); x += 50; }
        return '<path d="' + d + '" stroke="' + c + '" stroke-width="3"/>' + txt(285, y + 22, l, { c: c, a: 'end', w: 700 });
      }
      return svg('<g transform="translate(150 180)"><circle r="100" fill="' + M + '"/>' + slots + '<circle r="14" fill="#0b1220"/>' +
        '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" additive="sum"/></g>' +
        '<rect x="135" y="60" width="30" height="40" fill="' + R + '" opacity=".7"/>' +
        sq(110, 0, T, 'A') + sq(190, 12, A, 'B') + txt(450, 270, 'A leads B → clockwise', { s: 15 }) + txt(450, 295, 'count edges → position', { s: 14, c: M }));
    },
    pid: function () {
      var loop = 'M140 150 H230 M330 150 H400 M500 150 H580 M540 150 V260 H185 V170';
      return svg(defs + txt(60, 155, 'setpoint', { c: Y, s: 14 }) + arrow('M100 150 H160') +
        '<circle cx="185" cy="150" r="22" stroke="' + W + '" stroke-width="2.5"/>' + txt(185, 157, 'Σ', { s: 20 }) + txt(160, 182, '−', { s: 20, c: R }) +
        arrow('M207 150 H240') + box(240, 115, 110, 70, 'PID', A, 'controller') + arrow('M350 150 H400') +
        box(400, 115, 110, 70, 'Plant', T, 'motor + robot') + arrow('M510 150 H600') + txt(600, 140, 'output', { c: B, s: 14 }) +
        '<path d="M555 150 V280 H185 V172" stroke="' + M + '" stroke-width="2.5" marker-end="url(#ah)"/>' + box(320, 255, 110, 50, 'Sensor', B) +
        dots('M100 150 H555 V280 H185 V150', 6, 5, Y) +
        txt(215, 100, 'error', { c: R, s: 13 }) + txt(320, 345, 'measure → compare → correct, hundreds of times a second', { s: 14, c: M }));
    },
    filter: function () {
      var noisy = 'M60 200', smooth = 'M60 200', x, seed = 7;
      for (x = 60; x <= 580; x += 8) {
        seed = (seed * 9301 + 49297) % 233280;
        var base = 200 - 70 * Math.sin((x - 60) / 90);
        noisy += ' L' + x + ' ' + (base + (seed / 233280 - 0.5) * 70).toFixed(1);
        smooth += ' L' + x + ' ' + base.toFixed(1);
      }
      return svg('<path d="M60 320 H590 M60 40 V320" stroke="' + M + '" stroke-width="2"/>' +
        '<path d="' + noisy + '" stroke="' + R + '" stroke-width="2" opacity=".75"/>' +
        '<path d="' + smooth + '" stroke="' + T + '" stroke-width="4" stroke-dasharray="900" stroke-dashoffset="900"><animate attributeName="stroke-dashoffset" values="900;0;0" dur="5s" repeatCount="indefinite"/></path>' +
        txt(520, 60, 'raw sensor', { c: R, s: 14 }) + txt(520, 85, 'filtered estimate', { c: T, s: 14 }));
    },
    kalman: function () {
      function bell(cx, sd, c, h) {
        var d = '';
        for (var x = 40; x <= 600; x += 6) { var y = 300 - h * Math.exp(-Math.pow((x - cx) / sd, 2) / 2); d += (x === 40 ? 'M' : 'L') + x + ' ' + y.toFixed(1); }
        return '<path d="' + d + '" stroke="' + c + '" stroke-width="3.5"/>';
      }
      return svg('<path d="M40 300 H600" stroke="' + M + '" stroke-width="2"/>' + bell(250, 70, B, 90) + bell(390, 50, A, 120) +
        '<g opacity="0">' + bell(335, 38, T, 190) + '<animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite"/></g>' +
        txt(200, 190, 'prediction', { c: B, s: 15 }) + txt(460, 160, 'measurement', { c: A, s: 15 }) + txt(335, 90, 'fused estimate', { c: T, s: 15, w: 700 }) +
        txt(320, 335, 'two uncertain guesses → one sharper guess', { s: 14, c: M }));
    },
    gears: function () {
      return svg('<g transform="translate(220 180)"><path d="' + gearPath(0, 0, 90, 18) + '" stroke="' + A + '" stroke-width="3" fill="#1e293b"/><circle r="12" fill="' + A + '"/><path d="M0 0 L0 -70" stroke="' + A + '" stroke-width="4"/>' +
        '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" additive="sum"/></g>' +
        '<g transform="translate(378 180)"><path d="' + gearPath(0, 0, 45, 9) + '" stroke="' + T + '" stroke-width="3" fill="#1e293b"/><circle r="8" fill="' + T + '"/><path d="M0 0 L0 -35" stroke="' + T + '" stroke-width="4"/>' +
        '<animateTransform attributeName="transform" type="rotate" from="10" to="-710" dur="9s" repeatCount="indefinite" additive="sum"/></g>' +
        txt(220, 330, '18 teeth · slow · high torque', { c: A, s: 14 }) + txt(430, 330, '9 teeth · fast', { c: T, s: 14 }) + txt(320, 40, 'ratio 2:1 → ×2 torque, ½ speed', { s: 18, w: 600 }));
    },
    printer: function () {
      var layers = '';
      for (var i = 0; i < 10; i++) {
        var k = (i / 10).toFixed(2), k2 = (i / 10 + 0.01).toFixed(2);
        layers += '<rect x="220" y="' + (290 - i * 14) + '" width="200" height="12" rx="4" fill="' + (i % 2 ? A : '#fb923c') + '" opacity="0">' +
          '<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;' + k + ';' + k2 + ';1" dur="8s" repeatCount="indefinite"/></rect>';
      }
      return svg('<path d="M120 305 H520" stroke="' + M + '" stroke-width="6"/>' + layers +
        '<g><path d="M300 40 h40 v40 l-12 18 h-16 l-12 -18 z" fill="' + W + '"/><path d="M320 98 v8" stroke="' + A + '" stroke-width="4"/>' +
        '<animateTransform attributeName="transform" type="translate" values="-100 150;100 150;-100 136;100 136;-100 122;100 122" dur="4s" repeatCount="indefinite"/></g>' +
        txt(320, 345, 'layer by layer: strong along layers, weak between them', { s: 14, c: M }));
    },
    rosgraph: function () {
      function node(x, y, l) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="70" ry="30" stroke="' + T + '" stroke-width="2.5" fill="#0b1220"/>' + txt(x, y + 5, l, { s: 14, w: 600 }); }
      function topic(x, y, l) { return '<rect x="' + (x - 60) + '" y="' + (y - 18) + '" width="120" height="36" rx="6" stroke="' + A + '" stroke-width="2" fill="#0b1220"/>' + txt(x, y + 5, l, { s: 13, c: A, f: 1 }); }
      return svg(defs + node(90, 100, '/camera') + topic(260, 100, '/image') + node(430, 100, '/detector') +
        topic(430, 210, '/cmd_vel') + node(260, 290, '/driver') + node(560, 290, '/logger') +
        arrow('M160 100 H195') + arrow('M320 100 H355') + arrow('M430 130 V188') + arrow('M380 225 L310 265') + arrow('M480 225 L530 262') +
        dots('M160 100 H360', 3, 2, Y) + dots('M430 130 V190 L320 262', 3, 2, Y) +
        txt(560, 60, 'nodes = programs', { c: T, s: 14 }) + txt(560, 82, 'topics = named streams', { c: A, s: 14 }));
    },
    tf: function () {
      return svg(defs + axes(90, 300, 'map') + axes(220, 250, 'odom', -8) +
        '<g transform="translate(380 200)"><rect x="-50" y="-30" width="100" height="60" rx="12" fill="#1e293b" stroke="' + T + '" stroke-width="2"/>' +
        '<animateTransform attributeName="transform" type="translate" values="380 200;420 190;380 200" dur="5s" repeatCount="indefinite"/></g>' +
        axes(380, 210, 'base_link', -15) + axes(470, 120, 'laser', 0) + axes(540, 230, 'camera', 20) +
        '<path d="M100 290 Q160 240 210 245 M230 245 Q300 220 370 205 M390 200 Q430 150 465 125 M390 205 Q470 220 532 228" stroke="' + M + '" stroke-dasharray="5 6" stroke-width="2"/>' +
        txt(320, 40, 'every frame is defined relative to its parent', { s: 17, w: 600 }));
    },
    arm: function () {
      return svg('<path d="M200 320 H440" stroke="' + M + '" stroke-width="6"/><rect x="290" y="290" width="60" height="30" fill="' + M + '"/>' +
        '<g transform="translate(320 290)"><g><path d="M0 0 L0 -120" stroke="' + A + '" stroke-width="16"/><circle r="12" fill="' + Y + '"/>' +
        '<g transform="translate(0 -120)"><g><path d="M0 0 L0 -100" stroke="' + T + '" stroke-width="12"/><circle r="10" fill="' + Y + '"/>' +
        '<path d="M-14 -100 h28 M-14 -100 v-18 M14 -100 v-18" stroke="' + W + '" stroke-width="5"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="20;80;40;20" dur="6s" repeatCount="indefinite"/></g></g>' +
        '<animateTransform attributeName="transform" type="rotate" values="-30;20;45;-30" dur="6s" repeatCount="indefinite"/></g></g>' +
        txt(110, 80, 'θ₁, θ₂ → (x, y)', { s: 22, c: Y, w: 700 }) + txt(110, 110, 'forward kinematics', { s: 14, c: M }) +
        txt(530, 80, '(x, y) → θ₁, θ₂', { s: 22, c: T, w: 700 }) + txt(530, 110, 'inverse kinematics', { s: 14, c: M }));
    },
    pinhole: function () {
      return svg('<path d="M120 60 L120 300" stroke="' + B + '" stroke-width="4"/>' + txt(120, 330, 'image plane', { c: B, s: 14 }) +
        '<circle cx="300" cy="180" r="6" fill="' + Y + '"/>' + txt(300, 215, 'pinhole (camera centre)', { s: 13, c: Y }) +
        '<path d="M540 90 L300 180 L120 247 M540 260 L300 180 L120 120" stroke="' + A + '" stroke-width="2" stroke-dasharray="6 5"/>' +
        '<path d="M540 90 L540 260" stroke="' + T + '" stroke-width="6"/>' + txt(560, 180, 'object', { c: T, a: 'start' }) +
        '<circle cx="120" cy="247" r="6" fill="' + T + '"/><circle cx="120" cy="120" r="6" fill="' + T + '"/>' +
        txt(320, 40, 'u = f · X / Z + cx', { s: 22, w: 700, f: 1 }) + txt(320, 345, 'depth Z is lost — that is why we calibrate and add depth sensors', { s: 13, c: M }));
    },
    slam: function () {
      var rays = '';
      for (var i = 0; i < 12; i++) rays += '<path d="M0 0 L' + (Math.cos(i / 12 * 6.283) * 120).toFixed(0) + ' ' + (Math.sin(i / 12 * 6.283) * 120).toFixed(0) + '" stroke="' + R + '" stroke-width="1.5" opacity=".6"/>';
      return svg('<rect x="60" y="40" width="520" height="280" stroke="' + M + '" stroke-width="2" stroke-dasharray="6 6"/>' +
        '<path d="M60 40 H580 V320 H60 Z M250 40 V150 M400 320 V220 H480" stroke="' + W + '" stroke-width="5" stroke-dasharray="1400" stroke-dashoffset="1400"><animate attributeName="stroke-dashoffset" values="1400;0;0" dur="8s" repeatCount="indefinite"/></path>' +
        '<g><g>' + rays + '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.5s" repeatCount="indefinite"/></g>' +
        '<circle r="16" fill="' + T + '"/><path d="M0 0 L16 0" stroke="#0b1220" stroke-width="3"/>' +
        '<animateMotion dur="8s" repeatCount="indefinite" path="M140 260 L320 260 L320 100 L500 100 L500 180 L140 260"/></g>' +
        txt(320, 350, 'build the map and locate yourself in it — at the same time', { s: 14, c: M }));
    },
    policy: function () {
      return svg(defs + box(30, 70, 120, 80, 'camera', B, 'image') + box(30, 200, 120, 80, 'joints', Y, '6 angles') +
        arrow('M150 110 L230 160') + arrow('M150 240 L230 190') +
        '<rect x="230" y="110" width="170" height="130" rx="16" stroke="' + A + '" stroke-width="3" fill="#0b1220"/>' + txt(315, 170, 'policy', { s: 22, w: 700, c: A }) + txt(315, 195, 'neural network', { s: 13, c: M }) +
        arrow('M400 175 H440') +
        [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
          var h = 30 + 50 * Math.abs(Math.sin(i * 0.9 + 1));
          return '<rect x="' + (450 + i * 20) + '" y="' + (240 - h) + '" width="14" height="' + h.toFixed(0) + '" rx="3" fill="' + T + '"><animate attributeName="opacity" values=".3;1;.3" dur="2s" begin="' + (i * 0.15) + 's" repeatCount="indefinite"/></rect>';
        }).join('') + txt(530, 270, 'action chunk', { c: T, s: 15 }) + txt(530, 292, 'next k joint targets', { c: M, s: 12 }) +
        txt(320, 340, 'record demos → train → deploy', { s: 15, c: M }));
    },
    rl: function () {
      return svg(defs + box(230, 40, 180, 80, 'Agent', A, 'policy πθ') + box(230, 240, 180, 80, 'Environment', T, 'simulator / robot') +
        '<path d="M410 80 C 560 80, 560 280, 410 280" stroke="' + Y + '" stroke-width="3" marker-end="url(#ah)"/>' + txt(560, 185, 'action', { c: Y }) +
        '<path d="M230 280 C 80 280, 80 80, 230 80" stroke="' + B + '" stroke-width="3" marker-end="url(#ah)"/>' + txt(70, 170, 'state', { c: B }) + txt(70, 195, '+ reward', { c: G }) +
        dots('M410 80 C 560 80, 560 280, 410 280 M230 280 C 80 280, 80 80, 230 80', 4, 4, W) +
        txt(320, 185, 'maximise total reward', { s: 16, c: M }));
    },
    git: function () {
      function c(x, y, col) { return '<circle cx="' + x + '" cy="' + y + '" r="12" fill="' + col + '" stroke="#0b1220" stroke-width="3"/>'; }
      return svg('<path d="M60 220 H580" stroke="' + T + '" stroke-width="5"/><path d="M200 220 C 240 120, 260 120, 300 120 H420 C 460 120, 470 200, 500 220" stroke="' + A + '" stroke-width="5"/>' +
        c(100, 220, T) + c(200, 220, T) + c(300, 120, A) + c(380, 120, A) + c(320, 220, T) + c(500, 220, Y) +
        txt(60, 260, 'main', { c: T, a: 'start', w: 700 }) + txt(340, 95, 'feature/encoder', { c: A, w: 700 }) + txt(500, 260, 'merge', { c: Y, w: 700 }) +
        '<circle cx="500" cy="220" r="20" stroke="' + Y + '" stroke-width="2"><animate attributeName="r" values="12;28;12" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></circle>' +
        txt(320, 320, 'branch → commit → merge, and main always works', { s: 15, c: M }));
    },
    meter: function () {
      return svg('<rect x="220" y="30" width="200" height="300" rx="24" fill="' + Y + '"/><rect x="240" y="55" width="160" height="70" rx="8" fill="#a3b18a"/>' +
        '<text x="320" y="105" text-anchor="middle" font-size="36" font-family="ui-monospace,monospace" fill="#1f2937">8.99<animate attributeName="opacity" values="1;1;1" dur="1s"/></text>' +
        '<text x="390" y="118" text-anchor="end" font-size="14" fill="#1f2937">V DC</text>' +
        '<circle cx="320" cy="210" r="55" fill="#1f2937"/><path d="M320 210 L320 165" stroke="' + W + '" stroke-width="6"><animateTransform attributeName="transform" type="rotate" values="0 320 210;-60 320 210;0 320 210;60 320 210;0 320 210" dur="8s" repeatCount="indefinite"/></path>' +
        '<circle cx="270" cy="300" r="10" fill="#111"/><circle cx="320" cy="300" r="10" fill="#111"/><circle cx="370" cy="300" r="10" fill="' + R + '"/>' +
        '<path d="M270 300 C 200 330, 140 300, 110 240" stroke="#111" stroke-width="6"/><path d="M370 300 C 440 330, 500 300, 530 240" stroke="' + R + '" stroke-width="6"/>' +
        txt(100, 225, 'COM', { c: W, s: 14 }) + txt(540, 225, 'V Ω mA', { c: R, s: 14 }) + txt(320, 352, 'volts across · amps in series · ohms unpowered', { s: 14, c: M }));
    },
    solder: function () {
      return svg('<rect x="120" y="250" width="400" height="30" fill="#14532d"/><rect x="260" y="238" width="120" height="14" rx="3" fill="#d4a017"/>' +
        '<path d="M320 120 V300" stroke="' + M + '" stroke-width="5"/>' +
        '<path d="M262 238 Q320 160 378 238 Z" fill="#cbd5e1" opacity="0"><animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite"/></path>' +
        '<g><path d="M460 60 L360 200" stroke="' + W + '" stroke-width="14"/><path d="M360 200 L345 222" stroke="' + A + '" stroke-width="8"/>' +
        '<animateTransform attributeName="transform" type="translate" values="0 0;0 0;40 -40;40 -40" dur="4s" repeatCount="indefinite"/></g>' +
        '<path d="M160 120 L270 205" stroke="#cbd5e1" stroke-width="4"/>' + txt(150, 110, 'solder', { c: W, s: 14 }) + txt(500, 50, 'iron', { c: A, s: 14 }) +
        txt(320, 330, 'heat pad + lead → feed solder → shiny volcano, not a ball', { s: 14, c: M }));
    },
    battery: function () {
      function cell(x, d) {
        return '<rect x="' + x + '" y="110" width="120" height="140" rx="12" stroke="' + T + '" stroke-width="3" fill="#0b1220"/>' +
          '<rect x="' + (x + 8) + '" y="118" width="104" height="124" rx="8" fill="' + G + '" opacity=".35"><animate attributeName="height" values="124;60;124" dur="6s" begin="' + d + 's" repeatCount="indefinite"/></rect>' +
          txt(x + 60, 190, '3.7 V', { s: 18, w: 700 });
      }
      return svg(cell(110, 0) + cell(260, 0.2) + cell(410, 0.4) + '<path d="M230 180 h30 M380 180 h30" stroke="' + W + '" stroke-width="4"/>' +
        txt(320, 80, '3S LiPo = 3 × 3.7 V = 11.1 V nominal', { s: 20, w: 700 }) +
        txt(320, 290, 'full 4.2 V/cell · never below 3.0 V/cell', { s: 15, c: Y }) + txt(320, 320, 'charge on a balance charger, never unattended', { s: 14, c: R }));
    },
    sketch: function () {
      return svg('<path d="M140 280 H460 V140 L380 80 H140 Z" stroke="' + T + '" stroke-width="3" stroke-dasharray="1200" stroke-dashoffset="1200"><animate attributeName="stroke-dashoffset" values="1200;0;0" dur="5s" repeatCount="indefinite"/></path>' +
        '<circle cx="230" cy="190" r="32" stroke="' + A + '" stroke-width="3"/>' +
        '<path d="M140 310 H460 M140 300 V320 M460 300 V320" stroke="' + Y + '" stroke-width="1.5"/>' + txt(300, 330, '60.0 mm', { c: Y, s: 14 }) +
        '<path d="M490 140 V280 M480 140 H500 M480 280 H500" stroke="' + Y + '" stroke-width="1.5"/>' + txt(530, 215, '35.0', { c: Y, s: 14 }) +
        txt(230, 140, 'Ø 6.5', { c: A, s: 14 }) + txt(560, 70, 'fully constrained', { c: G, s: 15, w: 700 }) + txt(560, 92, '= no blue lines left', { c: M, s: 13 }));
    },
    sensethinkact: function () {
      return svg(defs + '<circle cx="320" cy="180" r="120" stroke="' + M + '" stroke-width="2" stroke-dasharray="6 8"/>' +
        box(250, 30, 140, 60, 'Sense', B) + box(440, 230, 140, 60, 'Think', A) + box(60, 230, 140, 60, 'Act', T) +
        dots('M320 60 A120 120 0 0 1 425 240 A120 120 0 0 1 215 240 A120 120 0 0 1 320 60', 5, 6, Y) +
        txt(320, 186, 'robot loop', { s: 16, c: M }));
    },
    motor: function () {
      return svg('<rect x="160" y="100" width="260" height="160" rx="20" stroke="' + M + '" stroke-width="3" fill="#0b1220"/>' +
        '<rect x="175" y="115" width="230" height="30" fill="' + R + '" opacity=".5"/><rect x="175" y="215" width="230" height="30" fill="' + B + '" opacity=".5"/>' +
        txt(190, 136, 'N', { a: 'start', w: 700 }) + txt(190, 236, 'S', { a: 'start', w: 700 }) +
        '<g transform="translate(290 180)"><rect x="-90" y="-14" width="180" height="28" rx="6" fill="' + A + '"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.2s" repeatCount="indefinite" additive="sum"/></g>' +
        '<path d="M420 180 H520" stroke="' + W + '" stroke-width="10"/>' + txt(470, 160, 'shaft', { c: M, s: 13 }) +
        txt(320, 60, 'speed ∝ voltage · torque ∝ current', { s: 20, w: 700 }) + txt(320, 310, 'stall = maximum current: size your driver for it', { s: 14, c: Y }));
    },
    cartpole: function () {
      return svg('<path d="M60 290 H580" stroke="' + M + '" stroke-width="4"/>' +
        '<g><rect x="-50" y="-30" width="100" height="40" rx="8" fill="' + T + '"/><circle cx="-30" cy="14" r="10" fill="' + W + '"/><circle cx="30" cy="14" r="10" fill="' + W + '"/>' +
        '<g><path d="M0 -30 L0 -190" stroke="' + A + '" stroke-width="10"/><circle cy="-190" r="14" fill="' + Y + '"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="-12 0 -30;10 0 -30;-6 0 -30;4 0 -30;-12 0 -30" dur="5s" repeatCount="indefinite"/></g>' +
        '<animateTransform attributeName="transform" type="translate" values="280 266;360 266;300 266;340 266;280 266" dur="5s" repeatCount="indefinite"/></g>' +
        txt(320, 330, 'one motor, two things to control → underactuated', { s: 15, c: M }) + txt(320, 40, 'u = −K x', { s: 26, w: 700, f: 1 }));
    },
    pointcloud: function () {
      var s = '', seed = 3;
      for (var i = 0; i < 260; i++) {
        seed = (seed * 9301 + 49297) % 233280; var a = seed / 233280 * 6.283;
        seed = (seed * 9301 + 49297) % 233280; var r = 40 + seed / 233280 * 60;
        seed = (seed * 9301 + 49297) % 233280; var h = seed / 233280;
        s += '<circle cx="' + (Math.cos(a) * r).toFixed(1) + '" cy="' + ((h - 0.5) * 200 + Math.sin(a) * r * 0.3).toFixed(1) + '" r="2.6" fill="' + (h > 0.5 ? T : B) + '"/>';
      }
      return svg('<g transform="translate(320 170)"><g>' + s + '<animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1" dur="8s" repeatCount="indefinite"/></g></g>' +
        txt(320, 345, 'every pixel with depth becomes a 3-D point', { s: 15, c: M }));
    },
    costmap: function () {
      var cells = '';
      for (var x = 0; x < 16; x++) for (var y = 0; y < 8; y++) {
        var obst = (x === 6 && y > 1) || (x === 11 && y < 5) || (y === 7 && x > 2 && x < 5);
        var near = !obst && ((Math.abs(x - 6) === 1 && y > 0) || (Math.abs(x - 11) === 1 && y < 6));
        cells += '<rect x="' + (80 + x * 30) + '" y="' + (50 + y * 30) + '" width="28" height="28" fill="' + (obst ? W : near ? '#7c2d12' : '#1e293b') + '"/>';
      }
      return svg(cells + '<path d="M110 290 L110 80 L320 80 L320 50 M320 80 L390 80 L390 260 L470 260 L470 200 L560 200" stroke="' + G + '" stroke-width="4" stroke-dasharray="700" stroke-dashoffset="700"><animate attributeName="stroke-dashoffset" values="700;0;0" dur="5s" repeatCount="indefinite"/></path>' +
        txt(320, 330, 'obstacles (white) inflated (orange) → planner keeps clear', { s: 14, c: M }));
    },
    robot: function () {
      return svg('<rect x="230" y="70" width="180" height="150" rx="30" fill="#1e293b" stroke="' + T + '" stroke-width="4"/>' +
        '<circle cx="285" cy="135" r="18" fill="' + T + '"><animate attributeName="r" values="18;18;2;18;18" dur="4s" repeatCount="indefinite"/></circle>' +
        '<circle cx="355" cy="135" r="18" fill="' + T + '"><animate attributeName="r" values="18;18;2;18;18" dur="4s" repeatCount="indefinite"/></circle>' +
        '<path d="M290 185 H350" stroke="' + A + '" stroke-width="6"/><path d="M320 70 V40" stroke="' + M + '" stroke-width="4"/><circle cx="320" cy="34" r="8" fill="' + A + '"><animate attributeName="opacity" values="1;.2;1" dur="1.5s" repeatCount="indefinite"/></circle>' +
        '<rect x="250" y="230" width="140" height="80" rx="16" fill="#1e293b" stroke="' + M + '" stroke-width="3"/>');
    }
  };
  // aliases
  LIB.i2c = LIB.bus; LIB.spi = LIB.bus; LIB.dcmotor = LIB.motor; LIB.lqr = LIB.cartpole; LIB.ik = LIB.arm; LIB.fk = LIB.arm;
  LIB.multimeter = LIB.meter; LIB.lipo = LIB.battery; LIB.cad = LIB.sketch; LIB.loop = LIB.sensethinkact; LIB.nav = LIB.costmap;

  var TOPIC = {
    'Electronics': 'ohm', 'Bench & measuring': 'meter', 'Soldering': 'solder', 'Python & Git': 'git', 'Microcontrollers': 'pwm',
    'Motors & drivers': 'motor', 'Sensors & filtering': 'filter', 'Robot build': 'sensethinkact', 'CAD': 'sketch', '3D printing': 'printer',
    'Mechanics': 'gears', 'Robot arm': 'arm', 'ROS 2': 'rosgraph', 'URDF & TF': 'tf', 'Simulation': 'slam', 'ros2_control': 'pid',
    'SLAM & Nav2': 'slam', 'Control': 'pid', 'Kinematics': 'arm', 'Vision': 'pinhole', 'Manipulation': 'arm', 'Robot learning': 'policy',
    'RL': 'rl', 'Portfolio & career': 'git', 'Review': 'sensethinkact', 'Milestone': 'robot'
  };

  window.DIAGRAMS = {
    get: function (name) { var f = LIB[name]; return f ? f() : LIB.robot(); },
    has: function (name) { return !!LIB[name]; },
    forTopic: function (t) { return TOPIC[t] || 'robot'; },
    names: Object.keys(LIB)
  };
})();
