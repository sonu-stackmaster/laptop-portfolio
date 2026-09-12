// Procedural Web Audio Ambient Soundscape Generator
// Zero external audio files required — 100% synthesized in real time via Web Audio API

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;

    // Track states & gains
    this.tracks = {
      rain: { active: false, volume: 0.6, gainNode: null, stopFn: null },
      fire: { active: false, volume: 0.4, gainNode: null, stopFn: null },
      lofi: { active: false, volume: 0.5, gainNode: null, stopFn: null },
      breeze: { active: false, volume: 0.3, gainNode: null, stopFn: null }
    };

    this.listeners = new Set();
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      masterVolume: this.masterGain ? this.masterGain.gain.value : 0.8,
      tracks: {
        rain: { active: this.tracks.rain.active, volume: this.tracks.rain.volume },
        fire: { active: this.tracks.fire.active, volume: this.tracks.fire.volume },
        lofi: { active: this.tracks.lofi.active, volume: this.tracks.lofi.volume },
        breeze: { active: this.tracks.breeze.active, volume: this.tracks.breeze.volume }
      }
    };
  }

  // --- 1. Procedural Rain Generator ---
  startRain() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.tracks.rain.volume * 0.8, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    whiteNoise.start();

    // Random droplet transient taps
    let dropletTimer = null;
    const playDroplet = () => {
      if (!this.tracks.rain.active || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        const freq = 1200 + Math.random() * 1800;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.06);

        dropGain.gain.setValueAtTime(0.015 * this.tracks.rain.volume, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

        osc.connect(dropGain);
        dropGain.connect(gainNode);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.07);
      } catch (e) {}

      dropletTimer = setTimeout(playDroplet, 60 + Math.random() * 180);
    };
    playDroplet();

    this.tracks.rain.gainNode = gainNode;
    this.tracks.rain.stopFn = () => {
      try {
        whiteNoise.stop();
        clearTimeout(dropletTimer);
      } catch (e) {}
    };
  }

  // --- 2. Procedural Cozy Fireplace ---
  startFire() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    // Deep low rumble
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(65, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.tracks.fire.volume * 0.15, this.ctx.currentTime);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    osc.start();

    // Random crackle pops
    let crackleTimer = null;
    const playCrackle = () => {
      if (!this.tracks.fire.active || !this.ctx) return;
      try {
        const pop = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        pop.type = 'triangle';
        const pFreq = 180 + Math.random() * 600;
        pop.frequency.setValueAtTime(pFreq, this.ctx.currentTime);

        popGain.gain.setValueAtTime(0.08 * this.tracks.fire.volume, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        pop.connect(popGain);
        popGain.connect(gainNode);
        pop.start();
        pop.stop(this.ctx.currentTime + 0.035);
      } catch (e) {}

      crackleTimer = setTimeout(playCrackle, 80 + Math.random() * 320);
    };
    playCrackle();

    this.tracks.fire.gainNode = gainNode;
    this.tracks.fire.stopFn = () => {
      try {
        osc.stop();
        clearTimeout(crackleTimer);
      } catch (e) {}
    };
  }

  // --- 3. Procedural Lofi Rhodes Chords & Vinyl ---
  startLofi() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.tracks.lofi.volume * 0.6, this.ctx.currentTime);
    gainNode.connect(this.masterGain);

    // Warm chord progression (Cmaj9, Am9, Dm9, G13)
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [146.83, 220.00, 261.63, 349.23, 440.00], // Dm9
      [196.00, 246.94, 329.63, 392.00, 440.00]  // G13
    ];

    let chordIdx = 0;
    let chordTimer = null;

    const playNextChord = () => {
      if (!this.tracks.lofi.active || !this.ctx) return;
      try {
        const chord = chordProgressions[chordIdx];
        chordIdx = (chordIdx + 1) % chordProgressions.length;

        chord.forEach((freq, noteIdx) => {
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
          // Slight warm detune for vintage analog feel
          osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 0.004 - 0.002)), this.ctx.currentTime);

          noteGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.035 * this.tracks.lofi.volume, this.ctx.currentTime + 0.4);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.2);

          osc.connect(noteGain);
          noteGain.connect(gainNode);

          osc.start();
          osc.stop(this.ctx.currentTime + 4.5);
        });
      } catch (e) {}

      chordTimer = setTimeout(playNextChord, 4200);
    };

    playNextChord();

    this.tracks.lofi.gainNode = gainNode;
    this.tracks.lofi.stopFn = () => {
      clearTimeout(chordTimer);
    };
  }

  // --- 4. Procedural Night Breeze ---
  startBreeze() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(112.5, this.ctx.currentTime); // 2.5 Hz binaural slow pulse

    gainNode.gain.setValueAtTime(this.tracks.breeze.volume * 0.12, this.ctx.currentTime);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start();
    osc2.start();

    this.tracks.breeze.gainNode = gainNode;
    this.tracks.breeze.stopFn = () => {
      try {
        osc1.stop();
        osc2.stop();
      } catch (e) {}
    };
  }

  toggleTrack(trackName) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const track = this.tracks[trackName];
    if (!track) return;

    track.active = !track.active;

    if (track.active) {
      if (trackName === 'rain') this.startRain();
      else if (trackName === 'fire') this.startFire();
      else if (trackName === 'lofi') this.startLofi();
      else if (trackName === 'breeze') this.startBreeze();
    } else {
      if (track.stopFn) track.stopFn();
    }

    this.updatePlayingState();
    this.notify();
  }

  setTrackVolume(trackName, vol) {
    const track = this.tracks[trackName];
    if (!track) return;
    track.volume = Math.max(0, Math.min(1, vol));

    if (track.gainNode && this.ctx) {
      const multiplier = trackName === 'rain' ? 0.8 : trackName === 'fire' ? 0.15 : trackName === 'lofi' ? 0.6 : 0.12;
      track.gainNode.gain.setValueAtTime(track.volume * multiplier, this.ctx.currentTime);
    }
    this.notify();
  }

  setMasterVolume(vol) {
    if (!this.masterGain || !this.ctx) return;
    const v = Math.max(0, Math.min(1, vol));
    this.masterGain.gain.setValueAtTime(v, this.ctx.currentTime);
    this.notify();
  }

  applyPreset(presetName) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Stop all active tracks
    Object.keys(this.tracks).forEach((name) => {
      if (this.tracks[name].active && this.tracks[name].stopFn) {
        this.tracks[name].stopFn();
      }
      this.tracks[name].active = false;
    });

    if (presetName === 'midnight-rain') {
      this.tracks.rain.active = true;
      this.tracks.rain.volume = 0.7;
      this.tracks.lofi.active = true;
      this.tracks.lofi.volume = 0.5;
      this.startRain();
      this.startLofi();
    } else if (presetName === 'cozy-fireplace') {
      this.tracks.fire.active = true;
      this.tracks.fire.volume = 0.6;
      this.tracks.breeze.active = true;
      this.tracks.breeze.volume = 0.4;
      this.startFire();
      this.startBreeze();
    } else if (presetName === 'lofi-cafe') {
      this.tracks.lofi.active = true;
      this.tracks.lofi.volume = 0.7;
      this.tracks.rain.active = true;
      this.tracks.rain.volume = 0.3;
      this.tracks.fire.active = true;
      this.tracks.fire.volume = 0.2;
      this.startLofi();
      this.startRain();
      this.startFire();
    } else if (presetName === 'deep-focus') {
      this.tracks.breeze.active = true;
      this.tracks.breeze.volume = 0.5;
      this.tracks.rain.active = true;
      this.tracks.rain.volume = 0.4;
      this.startBreeze();
      this.startRain();
    }

    this.updatePlayingState();
    this.notify();
  }

  toggleAll() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    if (this.isPlaying) {
      // Pause all
      Object.keys(this.tracks).forEach((name) => {
        if (this.tracks[name].active && this.tracks[name].stopFn) {
          this.tracks[name].stopFn();
        }
        this.tracks[name].active = false;
      });
      this.isPlaying = false;
    } else {
      // Start default cozy mix (Rain + Lofi)
      this.applyPreset('midnight-rain');
    }
    this.notify();
  }

  updatePlayingState() {
    this.isPlaying = Object.values(this.tracks).some((t) => t.active);
  }
}

export const soundscapes = new SoundscapeEngine();
