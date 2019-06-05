export class Bug {
  speed = 1
  constructor(color) {
    this.name = this.constructor.name
    this.color = color
    this.pos = null
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
  ease = t => t // linear
}

// only one tile per turn
export class Queen extends Bug {
  speed = 0.6
  canGo(hex, space) {
    return space.posOfWays(this.pos).find(pos => pos.eq(hex))
  }
}

// only one tile per turn
// can jump on top of other
// can fit into slit (but only when descending)
export class Beatle extends Bug {
  speed = 0.3
  ease = t => t <.5 ? 2*t*t : -1+(4-2*t)*t // in out quad

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
  ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 // in out cubic
  speed = 2

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
  ease = t => t // linear
  speed = 1.2

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
  ease = t => t // linear
  speed = 1.5

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