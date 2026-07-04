# Web Harmonium

A playable web-based Indian harmonium that runs entirely in the browser using
the Web Audio API. It loads a real harmonium sample (`harmonium-kannan-orig.wav`)
and a convolution reverb impulse (`reverb.wav`), so notes sound like a recorded
instrument rather than a synth.

**Live:** https://coderfractiong.github.io/web-harmonium/

## Features

- 4 reeds (Bass, Male 1, Male 2, Female) with 11 stops
- 13-position scale changer
- Coupler and tremolo
- 5 drone stops tuned relative to Sa
- Computer-keyboard and Web MIDI input
- Swaram notation display with persistence via localStorage

## Using a MIDI keyboard

Open the site in Chrome or Edge (Web MIDI support is required), plug in any
MIDI keyboard, and pick it from the "MIDI Keyboard" dropdown. A 37-key
controller maps 1:1 to the on-screen keys. I use an M-VAVE SMK-37 Pro, since
37 keys is the closest match to a real harmonium keyboard. Any MIDI channel
works, and a sustain pedal holds notes as you would expect.

## Credit & attributions

**Original Web Harmonium:** [Rajaraman Iyer](https://github.com/rajaramaniyer)
- Source: https://rajaramaniyer.github.io/webharmonium.html
- This project is a redesign inspired by his Web Harmonium. The interface and
  code here were rebuilt rather than copied (only generic HTML/CSS boilerplate
  overlaps with the original). His original `webharmonium.html` is preserved as
  the first commit in this repo's history.

**AI assistance:** the redesign in this repo was developed with the assistance
of Claude (Anthropic's AI assistant).

**Audio:** the harmonium sample (`harmonium-kannan-orig.wav`) and the reverb
impulse (`reverb.wav`) come from Rajaraman Iyer's Web Harmonium project. The
harmonium recording is credited to "Kannan" (per the original filename); the
full source and recordist are not documented upstream.

**License note:** the original repository has no license file. Credit to the
original author is kept intact here, following the convention used by other
forks of this project. If the original author would like any change to this
attribution, or would prefer this not be published, I will gladly adjust or
remove it.

## Running locally

GitHub Pages serves the site over HTTPS automatically, which the Web Audio API
requires. To run it on your own machine over HTTPS, use the included dev server.
It needs a local `key.pem` / `cert.pem` that you generate yourself (these are
not committed):

```bash
# generate a self-signed cert for localhost (one time)
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"

node server.js
# open https://localhost:2001
```

Any static HTTPS server works too. `server.js` is only a convenience.
