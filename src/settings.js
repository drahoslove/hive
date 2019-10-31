const SETTINGS_KEY = 'hive_settings'
const langs = [...(navigator.languages || [navigator.language])].reverse()
const preferredLang = langs.findIndex(lang => lang.includes('cs')) > langs.findIndex(lang => lang.includes('en'))
  ? 'cs'
  : 'en'
const defaults = {
  lang: preferredLang,
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
  } catch (e) {
    stored = defaults
  };
  settings = {
    ...defaults,
    ...stored,
  }
}

function saveSettings() {
  try {
    window.localStorage[SETTINGS_KEY] = JSON.stringify({
      ...defaults,
      ...settings,
    })
  } catch (e) {
  }
}

export const get = (key) => settings[key]

export const set = key => val => {
  settings[key] = val
  saveSettings()
  handlers.forEach(handler => {
    handler({
      [key]: val,
    })
  })
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
