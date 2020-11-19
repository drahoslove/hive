import { Hex } from './board.js'
import { rand } from './common.js'


export class Bug {
  constructor(color, owner) {
    this.name = this.constructor.name
    this.symbol = this.name[0]
    this.color = color
    this.owner = owner
    this.pos = null
    this.speed = 1
    this.ease = t => t // linear
    this.angle = 7-rand(15)
    this.moveShiver = 10
    this.stillShiver = 1
    this.willShiver = (t) => (t-this.timeshift)%1000 < 500
    this.timeshift = rand(10000)
  }
  shiver(t) { // randomly change angle +-3 degree
    const d = 3
    return !this.willShiver(t) && !this.animation
      ? this.angle
      : this.angle += (d-rand(d*2+1)) * (this.animation ? this.moveShiver : this.stillShiver)
  }
  toString() {
    return `${this.color} ${this.name}: ${this.pos}`
  }
  reachablePlaces(space) {
    return space.nextToHivePositions(this.pos).filter(pos => this.canGo(pos, space))
  }
  canGo(hex, space) {
    return Boolean(this.pathTo(space, hex))
  }
  pathTo(space, dest) {
    if (this.canGo(dest, space)) {
      return [this.pos, dest]
    } else {
      return null
    }
  }
  go(path, moveType, order) {
    this.pos = path[path.length-1]

    let delay = order ? order*25 : 0
    let ms = 0
    let ease = t => t
    if (moveType === "shift") {
      ms = 150
    }
    if (moveType === "land") {
      ms = 250
    }
    if (moveType === "move") {
      ms = 200 / this.speed
      ease = this.ease
    }

    this.animation = {
      since: performance.now(),
      path,
      ms,
      ease,
      delay,
    }

  }
}

// only one tile per turn
export class Queen extends Bug {
  constructor(...props) {
    super(...props)
    this.speed = 0.6
    this.symbol = '🐝'
    this.hue = 40
    this.stillShiver = 4
    this.moveShiver = 15
    this.willShiver = (t) => (t-this.timeshift)%1100 > 100
  }
  canGo(hex, space) {
    return space.posOfWays(this.pos).find(pos => pos.eq(hex))
  }
}

// only one tile per turn
// can jump on top of other
// can fit into slit (but only when descending)
export class Beatle extends Bug {
  constructor(...props) {
    super(...props)
    this.speed = 0.3
    this.ease = t => t <.5 ? 2*t*t : -1+(4-2*t)*t // in out quad
    this.symbol = '🪲'
    this.hue = -20
    this.moveShiver = 5
  }

  reachablePlaces(space) {
    return space.posOfSurroundings(this.pos)
      .filter(p => this.canGo(p, space))
  }

  canGo(hex, space) {
    const currentTile = space.at(this.pos)
    const destTile = space.at(hex)
    if (!currentTile || !destTile) {
      return false
    }
    const sameElevation = currentTile.length-1 === destTile.length
    if (!sameElevation) {
      return true // can go to narrow spaces when changing elevation
    } else {
      return space.posOfWays(this.pos, this.pos, currentTile.length-1).find(pos => pos.eq(hex))
    }
  }
}

// has to jump over 1 or more bugs in line
// can fit into slit
export class Grasshopper extends Bug {
  constructor(...props) {
    super(...props)
    this.ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 // in out cubic
    this.speed = 2
    this.symbol = '🦗'
    this.hue = 160
    this.moveShiver = 0
    this.stillShiver = 2
    this.willShiver = (t) => (t-this.timeshift)%1900 < 600
  }

  pathTo(space, dest) {
    const cPos = this.pos.toCube()
    const cDest = dest.toCube()
    const path = []

    if (cPos.x !== cDest.x && cPos.y !== cDest.y && cPos.z !== cDest.z) {
      return null // not in row
    }
    if (cPos.distance(cDest) <= 1) {
      return null // noone to jump over
    }
    const dir = cPos.directionTo(cDest)
    for (let seg = cPos; !seg.eq(cDest); seg = seg.add(dir)) {
      const tile = space.at(seg.toHex())
      if (!tile || tile.length === 0) {
        return null // has gap
      }
      path.push(seg.toHex())
    }
    path.push(dest)
    return path
  }
}

// exactly 3 spaces per turn, no backtracks
export class Spider extends Bug {
  constructor(...props) {
    super(...props)
    this.ease = t => t // linear
    this.speed = 1.2
    this.symbol = '🕷️'
    this.hue = 220
    this.stillShiver = 15
    this.willShiver = (t) => (t-this.timeshift)%12000 < 350
  }

  pathTo(space, dest) {
    const path = space.findPath(this.pos, dest)
    if (path && path.length-1 === 3) {
      return path
    }
    return null
  }
}

// anywhere
export class Ant extends Bug {
  constructor(...props) {
    super(...props)
    this.ease = t => t // linear
    this.speed = 1.5
    this.symbol = '🐜'
    this.hue = 280
  }

  pathTo(space, dest) {
    let path = space.findPath(this.pos, dest)
    if (path) {
      return path
    }
    return null
  }
}


// ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t // ease in out quad
// ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1  // ease in out cubic
// ease = t => 1-(--t)*t*t*t // ease out quart
