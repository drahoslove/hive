import * as settings from './settings.js'
import { onceEvent } from './common.js'

const SAVE_DATA = navigator.connection &&
  navigator.connection.type === 'cellular' ||
  navigator.connection.saveData

const synth = new Tone.Synth({
  envelope: {
    // attack: 2,
    // decay: 1,
    // sustain: 0.4,
    // release: 4,
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 1
  }
})
synth.volume.value = -10

let active = ''
let bufferLoaded = false
const trackNames = ['menu', 'wait', 'pvp', 'pva', 'p', 'ava']
const tracks = new Tone.Players({
  ...(trackNames.reduce((obj, name) => ({
    ...obj,
    [name]: SAVE_DATA ? null : `/audio/${name}.mp3`,
  }), {}))
}, () => {
  if (settings.get('music') === 'on' && active === name) {
    tracks.get(active).start()
  }
}) // .toMaster()
tracks.loop = true
tracks.fadeOut = 0.1

;['p', 'ava'].forEach(name => { // lower voume a bit
  tracks.get(name).volume.value = -5
})

Tone.Buffer.on('load', (e) => {
  bufferLoaded = true
  if (settings.get('music') === 'on' && active) {
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
  const track = tracks.get(name)
  track.start()
}

export const menu = () => {
  track('menu')
}

export const beep = (note) => {
  if (settings.get('sound') === 'on') {
    synth.triggerAttackRelease(note || "C3", 0.01)
  }
}

settings.subscribe(({ music }) => {
  if (music !== 'on') {
    stop()
  } else {
    track(active)
  }
})