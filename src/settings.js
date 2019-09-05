const SETTINGS_KEY = 'hive-settings'
const defaults = {
  lang: 'cs',
  sound: 'on',
  color: 'black',
  fps: 60,
}


let settings = defaults

loadSettings()

;[...document.querySelectorAll('input[type=radio]')].forEach(radio => {
  if (radio.value === settings[radio.name]) { // set checkboxes according to saved values
    radio.checked = true;
  }
  radio.onchange = () => {
    set(radio.name, radio.value)
  }
})

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
}

export function get(key) {
  return settings[key]
}

export function set(key, val) {
  settings[key] = val
  saveSettings()
}
