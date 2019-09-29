import { PriorityQueue, rand } from './common.js'

// Axial coordinates
export class Hex {
  constructor(q, r) {
    this.q = q
    this.r = r
  }

  toCube() {
    return new Cube(this.q, this.r, -this.q-this.r)
  }

  round() {
    return this.toCube().round().toHex()
  }

  add({q, r}) {
    return new Hex(this.q + q, this.r + r)
  }

  sub({q, r}) {
    return new Hex(this.q - q, this.r - r)
  }

  eq({q, r}) {
    return this.q === q && this.r === r 
  }

  scale(n) {
    return new Hex(this.q * n, this.r * n)
  }

  revert() {
    return this.scale(-1)
  }

  rotate(n) {
    return this.toCube().rotate(n).toHex()
  }

  distance(hex) {
    return this.toCube().distance(hex.toCube())
  }

  angle(hex) {
    return this.toCube().angle(hex.toCube())
  }

  directionTo(hex) {
    return this.toCube().directionTo(hex.toCube()).toHex()
  }

  neighborhood() {
    return Hex.directions.map(dir => this.add(dir))
  }

  toString() {
    return `${this.q};${this.r}`
  }
}
Hex.directions = [
  new Hex(+1, 0), new Hex(+1, -1), new Hex(0, -1), 
  new Hex(-1, 0), new Hex(-1, +1), new Hex(0, +1), 
]
Hex.fromString = (str) => {
  const [ q, r ] = str.split(';').map(Number)
  return new Hex(q, r)
}

// Cubic coordinates
export class Cube {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  round() {
    let rx = Math.round(this.x)
    let ry = Math.round(this.y)
    let rz = Math.round(this.z)

    const dx = Math.abs(rx - this.x)
    const dy = Math.abs(ry - this.y)
    const dz = Math.abs(rz - this.z)

    if (dx > dy && dx > dz) { // ensure rx + ry + rz == 0
      rx = -ry-rz
    } else if (dy > dz) {
      ry = -rx-rz
    } else {
      rz = -rx-ry
    }
    return new Cube(rx, ry, rz)
  }

  toHex() {
    return new Hex(this.x, this.y)
  }

  add({x, y, z}) {
    return new Cube(this.x + x, this.y + y, this.z + z)
  }

  sub({x, y, z}) {
    return new Cube(this.x - x, this.y - y, this.z - z)
  }

  eq({x, y, z}) {
    return this.x === x && this.y === y && this.z === z 
  }

  scale(n) {
    return new Cube(this.x * n, this.y * n, this.z * n)
  }

  revert() {
    return this.scale(-1)
  }

  rotate(n) {
    n %= 6
    n += 6
    n %= 6
    let c = this
    while(n--) {
      c = new Cube(-c.z, -c.x, -c.y)
    }
    return c
  }

  distance({x, y, z}) {
    return (Math.abs(this.x - x) + Math.abs(this.y - y) + Math.abs(this.z - z)) / 2
  }

  size() { // size fo the 3d vector
    return Math.sqrt(this.x**2 + this.y**2 + this.z**2)
  }

  angle(c) { // related to 0,0,0
    let cosPhi = (this.x*c.x + this.y*c.y + this.z*c.z)/
      (this.size() * c.size())
    cosPhi = Math.max(-1, Math.min(cosPhi, +1)) // keep in -1 .. +1 range
    let a =  Math.acos(cosPhi)
    if (c.x + c.y/2 < 0) // TODO this only work of up directed this
      a = -a
    return a
  }

  directionTo({x, y, z}) {
    return new Cube(Math.sign(x - this.x), Math.sign(y - this.y), Math.sign(z - this.z))
  }

  neighborhood() {
    return Cube.directions.map(dir => this.add(dir))
  }
}
Cube.directions = [
  new Cube(+1, -1, 0), new Cube(+1, 0, -1), new Cube(0, +1, -1), 
  new Cube(-1, +1, 0), new Cube(-1, 0, +1), new Cube(0, -1, +1), 
]


// Space represent board-less plane for stones to be placed on
// state os space is represented by internal grid, wich is 2d array of tiles
export class Space {
  constructor(radius) {
    const len = radius*2 + 1
    this._stones = 0
    this._radius = radius
    this._grid = Array.from(Array(len), (_, i) =>
      Array.from(Array(len - Math.abs(radius-i)), (_, j) =>
        [] // tile itself si represented by array for stacking multiple stones
      )
    )
  }

  size() {
    return this._stones
  }

  // moves bug closer to the center
  centralize(midpoint = null) {
    if (!midpoint) {
      const max = new Cube(-Infinity, -Infinity, -Infinity)
      const min = new Cube(+Infinity, +Infinity, +Infinity)

      this.each((tile, pos) => {
        if (tile.length > 0) {
          const cPos = pos.toCube()
          'xyz'.split('').forEach(axis => {
            if (cPos[axis] > max[axis]) {
              max[axis] = cPos[axis]
            }
            if (cPos[axis] < min[axis]) {
              min[axis] = cPos[axis]
            }
          })
        }
      })

      midpoint = max.add(min).scale(1/2).toHex()
      if (midpoint.distance(new Hex(0,0)) <= 1) {
        return
      }
    }
    
    this.midpoint = midpoint

    const _grid = this._grid
    const _radius = this._radius
    {
      const len = _radius*2 + 1
      this._grid = Array.from(Array(len), (_, i) =>
        Array.from(Array(len - Math.abs(_radius-i)), (_, j) =>
          [] // tile
        )
      )
    }
    const atOld = this.at.bind({ _grid, _radius })
    const dir = midpoint.round() //(new Hex(0,0)).directionTo(midpoint)
    this.each((tile, pos) => {
      const oldTile = atOld(pos.add(dir)) || []
      while (oldTile.length > 0) {
        const bug = oldTile.shift()
        bug.pos = bug.pos.sub(dir)
        if (bug.animation) {
          bug.animation.path.forEach((pos, i) => {
            bug.animation.path[i] = pos.sub(dir)
          })
        }        
        tile.push(bug)
      }
    })

    this.animation = {
      since: performance.now(),
      dest: dir,
    }
  }

  // return tile of grid on given position or undefined if outside of grid
  at({q, r}) {
    if (Math.abs(q) <= this._radius && Math.abs(r) <= this._radius) {
      q += this._radius // center is 0,0
      r += this._radius
      return this._grid[r][q - Math.max(0, this._radius-r)]
    }
  }

  atTop(pos) {
    const tile = this.at(pos)
    if(tile && tile.length > 0) {
      return tile[tile.length-1]
    }
  }
  atBottom(pos) {
    const tile = this.at(pos)
    if(tile && tile.length > 0) {
      return tile[0]
    }
  }

  findBug(check, bottom=false) {
    return bottom
      ? this.hivePositions().map(hex => this.atBottom(hex)).find(check)
      : this.hivePositions().map(hex => this.atTop(hex)).find(check)
  }


  each(callback) {
    this._grid.forEach((row, i) => {
      row.forEach((tile, j) => {
        let r = i
        let q = j + Math.max(0, this._radius - i)
        q -= this._radius // center is 0,0
        r -= this._radius
        callback(tile, new Hex(q, r))
      })
    })
  }

  putAt(bug, dest) {
    const tile = this.at(dest)

    if (tile) {
      let path = bug.pathTo(this, dest)
      tile.push(bug)
      const oldTile = this.at(bug.pos)
      if (bug.placed) { // mopving
        const b = oldTile.pop()
        if (b !== bug) {
          oldTile.push(b)
          throw Error(`Tried to move bug ${bug.toString()} from tile ${oldTile} but it is not is not ontop`)
        }
        // movement speed
        bug.go(path, 'move')
      } else { // placing
        bug.placed = true
        path = [bug.pos, dest]
        bug.go(path, 'land')
        this._stones++
      }

      if(!path) {
        throw Error(`No path found for bug (${bug}) to get to tile (${tile}) at dest (${dest})`)
      }
    }
    this.centralize()
  }

  // positions of all occupied tiles
  hivePositions() {
    const positions = []
    this.each((tile, hex) => {
      if (tile.length > 0) {
        positions.push(hex)
      }
    })
    return positions
  }

  // positions of all tiles which has occupied neigbor tile
  nextToHivePositions(except) {
    const positions = []
    this.each((tile, hex) => {
      if (this.isNextToHive(hex, except)) {
        positions.push(hex)
      }
    })
    return positions
  }

  // next to hive positions which does not lay next to enemy of given color
  safeNextPositions(owner) {
    return this.nextToHivePositions().filter(hex => 
      hex.neighborhood().every((x) => !this.isEnemyOf(x, owner))
    )
  }

  // return all surrounding on board positions of hex (all 6 except outside of space)
  posOfSurroundings(hex) {
    return hex.neighborhood().filter((pos) => Boolean(this.at(pos)))
  }

  // positions of all occupied tiles which are in neighborhood of given pos
  posOfNeighbors(hex, except) {
    return hex.neighborhood().filter((pos) => {
      const tile = this.at(pos)
      return tile && tile.length > 0 && !(except && pos.eq(except))
    })
  }

  // positions of all empty (ongiven level) tiles wich are in neighborhood of given pos
  // and is accesible without detaching from hive while moving
  // (has one common neighbor or is on higher elevation)
  posOfWays(hex, except, elevation=0) {
    return hex.neighborhood().filter((pos) => {
      const dir = hex.directionTo(pos)
      const left = hex.add(dir.rotate(-1))
      const right = hex.add(dir.rotate(+1))

      const currentTile = this.at(hex)
      const destTile = this.at(pos)
      if(!currentTile || !destTile) {
        return false
      }

      if (destTile.length === elevation) { // dest is empty (on that level)
        // count empty side tiles
        const emptySides = [left, right].filter((sidePos) => {
          const sideTile = this.at(sidePos)
          if (!sideTile) {
            return true // outside of space is not a way but certainly is empty
          }
          return except && sidePos.eq(except)
            ? sideTile.length-1 <= elevation
            : sideTile.length <= elevation
          
        }).length
        if (elevation === 0) {
          return emptySides === 1 // exactly one of the two sides must be empty on ground
        } else {
          return emptySides >= 1 // dont need occupied side bug when on top
        }
      }
    })
  }

  isEnemyOf(hex, owner) {
    const topBug = this.atTop(hex) 
    return topBug && topBug.owner !== owner
  }
  
  isNextToHive(hex, except) { // is empty but has occupied neighbor tile
    return this.at(hex).length === 0 && hex.neighborhood().some(pos => {
      const tile = this.at(pos)
      return tile && tile.length > 0 && !(except && pos.eq(except))
    })
  }

  // returns true if bug on given position will break hive on removal
  isHiveBridge(hex) {
    return this.articulations().some(cut => cut.eq(hex))
  }

  // Unbreakable 'core' of the hive
  articulations() {
    const hive = this.hivePositions()
    const M = []
    const IN = {}
    const LOW = {}
    let T = 0
    let rootChilds = 0

    const dfs = (v, p) => {
      T++
      IN[v] = T
      LOW[v] = +Infinity
      this.posOfNeighbors(v).forEach(w => {
        if (!IN[w]) { // vw stromova hrana
          dfs(w, v)
          if (p) { // non root
            if (LOW[w] >= IN[v]) { // v je artikulace
                M.push(v)
            }
          } else { // root
            if(++rootChilds == 2) // pokud ma vice synu, tak je artikulaci 
              M.push(v)
          }
          LOW[v] = Math.min(LOW[v], LOW[w])
        } else if (!w.eq(p||{}) && IN[w] < IN[v]) { // zpetna hrana
          LOW[v] = Math.min(LOW[v], IN[w])
        }
      })
    }

    if (hive.length)
      dfs(hive[0], undefined)

    return M
  }

  findPath(start, goal) { // variation of A* algorithm
    let frontier = new PriorityQueue()
    let cameFrom = {}
    let costSoFar = {}

    frontier.push(start, 0)
    cameFrom[start] = null
    costSoFar[start] = 0

    while (frontier.len() > 0) {
      let current = frontier.pop()
      if (current.eq(goal)) {
        break 
      }
      this.posOfWays(current, start)
        .forEach(next => {
          let newCost = costSoFar[current] + 1 + this.posOfWays(next).length // add cost (same for each edge)
          if (!(next in costSoFar) || newCost < costSoFar[next]) {
            costSoFar[next] = newCost
            let priority = newCost + next.distance(goal) // heuristic - use just distance from goal
            frontier.push(next, priority)
            cameFrom[next] = current
          }
        })
    }

    // assemble path from cameFrom
    let path = null

    if (goal in cameFrom) {
      path = []
      let current = goal
      do {
        path.unshift(current)
        current = cameFrom[current]
      } while (current !== null)
    }

    return path
  }

  // returns array of hex position where bug of given color can land
  possibleLandings(owner) {
    if (this._stones === 0) { 
      return [new Hex(0, 0), ...Hex.directions]
    } 
    if (this._stones === 1) {
      return this.nextToHivePositions()
    } 
    return this.safeNextPositions(owner)
  }

  __randomBugPos(owner) {
    const positions = this.hivePositions()
      .filter(pos => (this.atTop(pos)||{}).owner === owner)
      .filter(pos => !this.isHiveBridge(pos) || this.at(pos).length > 1)
    return positions[rand(positions.length)] || new Hex(0, 0)
  }

  // select best bug from all movable bugs
  // which has better chance to lead to winning move
  __bestishBugPos(owner) {
    const positions = this.hivePositions()
      .filter(pos => (this.atTop(pos)||{}).owner === owner)
      .filter(pos => !this.isHiveBridge(pos) || this.at(pos).length > 1)
    const rankedPos = positions.map(pos => {
      let rank = 0
      this.posOfNeighbors(pos).forEach(pos => {
        const bug = this.atBottom(pos)
        if (bug.name === 'Queen') {
          bug.owner === owner
            ? rank++ // we want to move from your queen
            : rank-- // we want to stay at opponents queen 
        }
      })
      return {pos, rank}
    })
    rankedPos.sort((a, b) => b.rank - a.rank) // highest rank first
    const bestPositions = rankedPos
      .filter(({rank}) => rank === rankedPos[0].rank)
      .map(({pos}) => pos)
    // console.log('rankedPos', rankedPos.map(({rank}) => rank))

    const bestBugPos = bestPositions[rand(bestPositions.length)] || new Hex(0, 0)
    return this.atTop(bestBugPos) && this.atTop(bestBugPos).reachablePlaces(this).length > 0
      ? bestBugPos
      : this.__randomBugPos(owner)
  }

  toString() {
    let str = ''
    let clr
    this._grid.forEach((row, i) => {
      str += '  '.repeat(Math.abs(this._radius - i))
      row.forEach(tile => {
        let st = ' '
        if(tile.length) {
          st = tile[0].constructor.name[0]
          if(!clr) clr = tile[0].color
          if(tile[0].color === clr) {
            st = st.toLowerCase()
          }
        }

        str += `(${st}) `
      })
      str += '\n'
    })
    return str
  }
}
Space.fromString = function(string) {
  return new Space()
}


// Hand represents storage of stones which are not placed yet.
export class Hand {
  constructor(bugs, revert, offset=0) {
    this._hand = [...bugs]
    bugs.forEach((bug, i) => {
      bug.pos = !revert
      ? new Hex(
       -1 + i,
       -7 + offset, 
      )
      : new Hex(
       -8 + i,
       +7 + offset, 
      )

    })
  }

  // remove bug from hand (if possible)
  takeBug(bug) {
    let index
    this._hand.forEach((b, i) => {
      if (b === bug) {
        this._hand[i] = null
        index = i
      }
    })
    if (index !== undefined) {
      let n = 0
      let len = this.size()
      this._hand.forEach((bug, i) => {
        if (bug && i < index) {
          const path = [bug.pos, bug.pos.add(new Hex(1, 0))]
          bug.go(path, 'shift', (1 + len - n++))
        }
      })
    }
  }

  __getRandomBugPos() {
    if(this.used() === 3 && this._hand.some((bug) => bug && bug.name === 'Queen')) {
      return this._hand[0].pos // queen must be used in 4th move
    }
    const indexes = this._hand.reduce(
      (idxs, v, i) => (v !== null ? [...idxs, i] : idxs),
      [],
    )
    const i = indexes[rand(indexes.length)]
    return this._hand[i].pos
  }

  isEmpty() {
    return !this._hand.some(bug => bug !== null)
  }

  size() {
    return this._hand.filter(bug => bug !== null).length
  }

  used() {
    return this._hand.filter(bug => bug === null).length
  }

  each(callback) {
    this._hand.filter(Boolean).forEach(callback) 
  }

  some(callback) {
    return this._hand.filter(Boolean).some(callback)
  }

  find(callback) {
    return this._hand.filter(Boolean).find(callback)
  }

  filter(callback) {
    return this._hand.filter(Boolean).filter(callback)
  }
  indexOf(bug) {
    return this._hand.filter(Boolean).indexOf(bug)
  }
  at(index) {
    return this._hand.filter(Boolean)[index]
  }
}

