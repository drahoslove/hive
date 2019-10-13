const SETTINGS_KEY = 'hive_settings'
const langs = navigator.languages || navigator.language || ''
const defaults = {
  lang: (langs.includes('cs') && !langs.includes('en')) ? 'cs' : 'en',
  sound: 'on',
  music: 'on',
  color: 'black',
  fps: 60,
}

const handlers = []
let settings = defaults

loadSettings()
window.onbeforeunload = saveSettings

function loadSettings() {
  let stored = {}
  try {
    stored = JSON.parse(window.localStorage[SETTINGS_KEY])
  } catch {
    stored = defaults
  };
  settings = {
    ...defaults,
    ...stored,
  }
}

function saveSettings() {
  window.localStorage[SETTINGS_KEY] = JSON.stringify({
    ...defaults,
    ...settings,
  })
  handlers.forEach(handler => {
    handler(settings)
  })
}

export const get = (key) => settings[key]


export const set = key => val => {
  settings[key] = val
  saveSettings()
}

export function getAll() {
  return {
    ...settings,
  }
}

export function setAll() {
  return Object.keys(settings).reduce((all, key) => ({...all, [key]: set(key)}), {})
}


export function subscribe(handler) {
  if (handler instanceof Function) {
    handlers.push(handler)
  }
}