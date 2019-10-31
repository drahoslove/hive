import * as settings from './settings.js'
import { onceEvent, isMobile, shouldSaveData } from './common.js'

let _synth
let _active
let _bufferLoaded = false
let _tracks
let _analyser

if (Tone.supported) {
  // init synth
  _synth = new Tone.Synth({
    oscillator : {
      type: 'sine',
    },
    envelope: {
      // attack: 2,
      // decay: 1,
      // sustain: 0.4,
      // release: 4,
      attack: .02,
      decay: .08,
      sustain: .5,
      release: 1,
    }
  })
  _synth.volume.value = -10

  // init tracks
  _active = ''
  const trackNames = [/*'menu',*/ 'wait', 'pvp', 'pva', 'p', 'ava']
  if (!isMobile()) {
    trackNames.push('menu')
  }
  _tracks = new Tone.Players(shouldSaveData() ? {} : {
    ...(trackNames.reduce((obj, name) => ({
      ...obj,
      [name]: `/audio/${name}.mp3`,
    }), {}))
  }, () => {
    if (settings.get('music') === 'on' && active === name && tracks.has(active)) {
      _tracks.get(active).start()
    }
  }) // .toMaster()
  _tracks.loop = true
  _tracks.fadeOut = 0.1

  ;['p', 'ava'].forEach(name => { // lower voume a bit
    if (_tracks.has(name)) {
      _tracks.get(name).volume.value = -5
    }
  })

  Tone.Buffer.on('load', (e) => {
    _bufferLoaded = true
    if (settings.get('music') === 'on' && active && _tracks.has(active)) {
      _tracks.get(active).start()
    }
  })

  // resume context on user gesture interaction

  // resume context on user gesture interaction
  if (Tone.context.state === 'suspended') {
    onceEvent('mousedown', () => {
      Tone.context.resume()
    })
  }

  // analyzer
  _analyser = new Tone.Analyser('fft', 32).toMaster()
  _analyser.smoothing = .9

  _tracks.connect(_analyser)
  _synth.connect(_analyser)
  // _synth.toMaster()

  // subscribe for settings change
  settings.subscribe(({ music }) => {
    if (music == 'off') {
      stop()
    }
    if (music === 'on') {
      track(_active)
    }
  })
}

export function analyze() {
  return _analyser ? _analyser.getValue() : []
}

export const stop = () => {
  _tracks && _tracks.stopAll()
}

export const track = async (name) => {
  _active = name
  if (!_bufferLoaded || settings.get('music') !== 'on') {
    return
  }
  stop()
  if (_tracks && _tracks.has(name)){
    _tracks.get(name).start()
  }
}

export const menu = () => {
  track('menu')
}

export const beep = (note) => {
  if (_synth && settings.get('sound') === 'on') {
    _synth.triggerAttackRelease(note || "C3", .2)
  }
}

