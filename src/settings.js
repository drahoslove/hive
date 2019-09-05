const SETTINGS_KEY = 'hive-settings'
const defaults = {
  lang: 'cs',
  sound: 'on',
  color: 'black',
  fps: 60,
}

const handlers = []
let settings = defaults

loadSettings()

// ;[...document.querySelectorAll('input[type=radio]')].forEach(radio => {
//   set checkboxes according to saved values
//   if (radio.value == settings[radio.name]) { // == is intentional here
//     radio.checked = true;
//   }
//   radio.onchange = () => {
//     set(radio.name)(radio.value)
//   }
// })

function loadSettings() {
  let stored = {}
  try {
    stored = JSON.parse(window.localStorage[SETTINGS_KEY])
  } catch {};
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