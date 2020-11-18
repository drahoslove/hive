export function rand(n) {
  return Math.floor(Math.random()*n)
}

export const shouldSaveData = () =>
  navigator.connection && (
    navigator.connection.type === 'cellular' ||
    navigator.connection.saveData
  )

export const isMobile = () =>
  window.orientation !== undefined

export class PriorityQueue {
  constructor () {
    this._que = []
  }

  // lover prio to lover index
  push(item, priority) {
    if (!this._que.some(([_, prio], i) => {
      if (prio > priority) {
        this._que.splice(i, 0, [item, priority])
        return true
      }
    })) {
      this._que.push([item, priority])
    }
  }

  // lower prio first
  pop() {
    let [item, _] = this._que.shift()
    return item
  }

  len() {
    return this._que.length
  }
}

export const uncolorEmoji = (txt) =>
  txt
    .split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
    .map(ch => ch.charCodeAt() > 255
      ? ch + '\uFE0E'
      : ch
    )
    .join('')

// creates array of numbers given by inclusive interval <a ; b>
// or sequence from 0 excluding a if b is not defined
export function seq(a, b) {
  if (b === undefined) {
    b = a
    a = 0
  }
  const s = []
  for (let i = a; i <= b ; i++) {
    s.push(i)
  }
  return s
}

export function onceEvent(eventName, callback) {
  const handler = () => {
    callback()
    window.removeEventListener(eventName, handler)
  }
  window.addEventListener(eventName, handler)
}


const getParentStorage = async () => {
  window.parent.postMessage({ getStorage: true })
  return new Promise((resolve, reject) => {
    const onMsg = (event) => {
      if (event.data instanceof Object && 'storage' in event.data) {
        let storage = event.data.storage
        try {
          resolve(JSON.parse(storage))
        } catch (e) {
          resolve({})
        } finally {
          window.removeEventListener('message', onMsg)
        }
      }
    }
    setTimeout(() => {
      window.removeEventListener('message', onMsg)
      reject({})
    }, 200)
    window.addEventListener('message', onMsg)
  })
}

const setParentStorage = async (storage) => {
  window.parent.postMessage({ setStorage: JSON.stringify(storage) })
  return Promise.resolve()
}

// try to use storage types in order:
// localStorage > parents storage > local var object

const storage = {}
export const getStorage = async (key) => {
  try {
    return localStorage[key]
  } catch (e) {
    console.warn('can not localStorage in cross doamin frame')
  }
  try {
    return await getParentStorage()[key]
  } catch (e) {
    return storage[val]
  }
}

export const setStorage = async (key, val) => {
  storage[key] = val
  await setParentStorage(storage)
  try {
    localStorage[key] = val
  } catch (e) {
    console.warn('can not localStorage in cross doamin frame')
  }
  return val
}
