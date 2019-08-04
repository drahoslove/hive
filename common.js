export function rand(n) {
  return Math.floor(Math.random()*n)
}


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

  // lover prio first
  pop() {
    let [item, _] = this._que.shift()
    return item
  }

  len() {
    return this._que.length
  }
}

export function uncolorEmoji(txt) {
  return txt
    .split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
    .map(ch => ch.charCodeAt() > 255
      ? ch + '\uFE0E'
      : ch
    )
    .join('')
}