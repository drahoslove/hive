class Bug {
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
  canGo(space) {
    return false
  }
}

const isNarrowSegment = (space) => (pos, i, path) => {
  if (i === 0) { return }
  return space.isNarrow(path[i-1], pos)
}

class Queen extends Bug {
  // only one tile per turn
  canGo(hex, space) {
    return this.pos.distance(hex) === 1 && !space.isNarrow(this.pos, hex)
  }
}

class Beatle extends Bug {
  // only one tile per turn
  // can jump on top of other
  // can fit into slit
  reachablePlaces(space) {
    return [
      ...space.posOfNeighbors(this.pos),
      ...space.posOfWays(this.pos).filter((p) => space.isNextToHive(p, this.pos)),
    ]
  }
}

class Grasshopper extends Bug {
  // has to jump over 1 or more bugs in line
  // can fit into slit
  canGo(space) {
    return false
  }
}

class Spider extends Bug {
  // exactly 3 spaces per turn, no backtracks
  canGo(hex, space) {
    let path = space.findPath(this.pos, hex)
    return path && path.length-1 === 3 && !path.some(isNarrowSegment(space))
  }
}

class Ant extends Bug {
  // Enywhere
  canGo(hex, space) {
    let path = space.findPath(this.pos, hex)
    return path && !path.some(isNarrowSegment(space))
  }
}
