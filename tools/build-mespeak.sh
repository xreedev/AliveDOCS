#!/usr/bin/env bash
# Rebuilds vendor/mespeak/ from the npm package mespeak@2.0.2 (meSpeak 1.9.6, GPL).
# The npm package is CommonJS; this wraps its two source files into one script that
# defines self.meSpeak, so it loads in a page or a Web Worker with no bundler.
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
(cd "$tmp" && npm pack mespeak@2.0.2 >/dev/null && tar xzf mespeak-2.0.2.tgz)
P="$tmp/package"
out=vendor/mespeak
mkdir -p "$out"
cp "$P/src/mespeak_config.json" "$out/"
cp "$P/voices/en/en-us.json" "$out/"
{
  printf '/* meSpeak v1.9.6 (Norbert Landsteiner, masswerk.at), based on speak.js / eSpeak. GNU GPL v3.\n   Browser/worker bundle built from the npm package mespeak@2.0.2 by tools/build-mespeak.sh */\n(function (root) {\nvar __espeak = { exports: {} };\n(function (module) {\n'
  cat "$P/src/ESpeak.js"
  printf '\n})(__espeak);\nvar __mespeak = { exports: {} };\n(function (module, require) {\n'
  cat "$P/src/index.js"
  printf '\n})(__mespeak, function () { return __espeak.exports; });\nroot.meSpeak = __mespeak.exports;\n})(typeof self !== "undefined" ? self : this);\n'
} > "$out/mespeak.js"
rm -rf "$tmp"
echo "wrote $out/mespeak.js"
