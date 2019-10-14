import * as settings from './settings.js'
import { onceEvent, isMobile, shouldSaveData } from './common.js'

const synth = new Tone.Synth({
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
    sustain: .1,
    release: 1,
  }
})
synth.volume.value = -10

let active = ''
let bufferLoaded = false
const trackNames = [/*'menu',*/ 'wait', 'pvp', 'pva', 'p', 'ava']
if (!isMobile()) {
  trackNames.push('menu')
}
const tracks = new Tone.Players(shouldSaveData() ? {} : {
  ...(trackNames.reduce((obj, name) => ({
    ...obj,
    [name]: `/audio/${name}.mp3`,
  }), {}))
}, () => {
  if (settings.get('music') === 'on' && active === name && tracks.has(active)) {
    tracks.get(active).start()
  }
}) // .toMaster()
tracks.loop = true
tracks.fadeOut = 0.1

;['p', 'ava'].forEach(name => { // lower voume a bit
  if (tracks.has(name)) {
    tracks.get(name).volume.value = -5
  }
})

Tone.Buffer.on('load', (e) => {
  bufferLoaded = true
  if (settings.get('music') === 'on' && active && tracks.has(active)) {
    tracks.get(active).start()
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
const analyser = new Tone.Analyser('fft', 256).toMaster()

tracks.connect(analyser)
// synth.connect(analyser)
synth.toMaster()

// prapare byte array for analysis storage
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

export function analyze() {
  analyser.getByteFrequencyData(dataArray)
  return dataArray
}

export const stop = () => {
  tracks.stopAll()
}

export const track = async (name) => {
  active = name
  if (!bufferLoaded || settings.get('music') !== 'on') {
    return
  }
  stop()
  if (tracks.has(name)){
    tracks.get(name).start()
  }
}

export const menu = () => {
  track('menu')
}

export const beep = (note) => {
  if (settings.get('sound') === 'on') {
    synth.triggerAttackRelease(note || "C3", .01)
  }
}

settings.subscribe(({ music }) => {
  if (music !== 'on') {
    stop()
  } else {
    track(active)
  }
})