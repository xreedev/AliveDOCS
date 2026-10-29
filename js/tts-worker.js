/* Runs meSpeak (open-source eSpeak port) off the main thread.
   In: {id, text, opts}. Out: {id, buf} (a WAV ArrayBuffer) or {id, error}. */
importScripts('../vendor/mespeak/mespeak.js');

var ready = Promise.all([
  fetch('../vendor/mespeak/mespeak_config.json').then(function (r) { return r.json(); }),
  fetch('../vendor/mespeak/en-us.json').then(function (r) { return r.json(); })
]).then(function (res) {
  self.meSpeak.loadConfig(res[0]);
  self.meSpeak.loadVoice(res[1]);
  postMessage({ ready: true });
}).catch(function (err) {
  postMessage({ fatal: String(err) });
});

onmessage = function (e) {
  var msg = e.data;
  ready.then(function () {
    try {
      var opts = Object.assign({ rawdata: 'arraybuffer' }, msg.opts || {});
      var buf = self.meSpeak.speak(msg.text, opts);
      if (!buf) throw new Error('synthesis returned nothing');
      postMessage({ id: msg.id, buf: buf }, [buf]);
    } catch (err) {
      postMessage({ id: msg.id, error: String(err) });
    }
  });
};
