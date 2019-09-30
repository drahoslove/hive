import * as settings from './settings.js'
import { onceEvent } from './common.js'

let active = ''
const tracks = {}

// init audio tracks only if not on mobile data
if (!navigator.connection || (navigator.connection.type !== 'cellular' && !navigator.connection.daveData)) {
  ;['menu', 'wait', 'pvp', 'pva', 'p', 'ava'].forEach((mode) => {
    const track = tracks[mode] =  new Audio()
    track._src = `/audio/${mode}.mp3`
    track.loop = true
    if (mode === 'p') {
      track.volume = .8
    }
    if (mode === 'ava') {
      track.volume = .5
    }
  })
}

// analyzer
const context = new AudioContext()
const analyser = context.createAnalyser()
analyser.fftSize = 256

Object.values(tracks).forEach(track => { // connect tracs to analyzer
  const src = context.createMediaElementSource(track)
  src.connect(analyser)
})
analyser.connect(context.destination) // output to speakers

// prapare byte array for analysis storage
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

// resume context on user gesture interaction
if (context.state === 'suspended') {
  onceEvent('mousedown', () => {
    context.resume()
  })
}

export function analyze() {
  analyser.getByteFrequencyData(dataArray)
  return dataArray
}

async function play(track) {
  try {
    await track.play()
  } catch(e) {
    onceEvent('mousedown', () => {
      play(tracks[active])
    })
  }
}

export const stop = () => {
  Object.keys(tracks).forEach(name => {
    const track = tracks[name]
    if (!track.paused) {
      if (name !== 'menu') {
        track.currentTime = 0
      }
      track.pause()
    }
  })
}

export const track = async (name) => {
  active = name
  stop()
  if (!(name in tracks) || settings.get('sound') !== 'on') {
    return
  }
  const track = tracks[name]
  if (!track.src) {
    track.src = track._src
  }
  if (track.readyState >= track.HAVE_ENOUGH_DATA) {
    play(track)
  } else {
    track.addEventListener('canplaythrough', function oncanplaytrough () {
      play(track)
      track.removeEventListener('canplaythrough', oncanplaytrough)
    })
  }
}

export const menu = () => {
  track('menu')
}

settings.subscribe(({ sound }) => {
  if (sound !== 'on') {
    stop()
  } else {
    track(active)
  }
})