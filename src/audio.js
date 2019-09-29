import * as settings from './settings.js'

let active = ''
const tracks = {}
;['menu', 'wait', 'pvp', 'pva', 'p', 'ava'].forEach((mode) => {
  const track = tracks[mode] =  new Audio(`/audio/${mode}.mp3`)
  track.loop = true
  track.load()
  track.pause()
  if (mode === 'p') {
    track.volume = .8
  }
  if (mode === 'ava') {
    track.volume = .5
  }
})

async function play(track) {
  try {
    await track.play()
  } catch(e) {
    window.addEventListener('mousedown', function playOnInteraction() {
      play(track)
      window.removeEventListener('mousedown', playOnInteraction)
    })
  }
}

export const stop = () => {
  Object.keys(tracks).forEach(name => {
    const track = tracks[name]
    if (!track.paused) {
      track.pause()
      name !== 'menu' && track.load()
    }
  })
}

export const track = async (name) => {
  active = name
  stop()
  if (name === '' || settings.get('sound') !== 'on') {
    return
  }
  const track = tracks[name]
  if (track.readyState >= track.HAVE_ENOUGH_DATA) {
    play(track)
  } else {
    track.addEventListener('canplaythrough', async (event) => {
      play(track)
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