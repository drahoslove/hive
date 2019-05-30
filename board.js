// Axial coordinates
class Hex {
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

  distance(hex) {
    return this.toCube().distance(hex.toCube())
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

// Cubic coordinates
class Cube {
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

  distance({x, y, z}) {
    return (Math.abs(this.x - x) + Math.abs(this.y - y) + Math.abs(this.z - z)) / 2
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
class Space {
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

  // return tile of grid on given position or undefined if outside of grid
  at({q, r}) {
    if (Math.abs(q) <= this._radius && Math.abs(r) <= this._radius) {
      q += this._radius // center is 0,0
      r += this._radius
      return this._grid[r][q - Math.max(0, this._radius-r)]
    }
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
    let path = bug.name === "Grasshopper"
      ? [bug.pos, dest]
      : this.findPath(bug.pos, dest)
    const tile = this.at(dest)
    if (tile) {
      tile.push(bug)
      const oldTile = this.at(bug.pos)
      if (oldTile && oldTile.length) {
        const b = oldTile.pop()
        if (b !== bug) {
          oldTile.push(b)
          // throw Error(`Tried to move bug ${bug.toString()} from tile ${oldTile} but it is not is not ontop`)
        }
      } else {
        this._stones++
      }

      // animate
      let ms = 120
      if (!path) {
        path = [bug.pos, dest]
        ms *= 2
      }
      const jumps = path.length-1
      const duration = ms*jumps
      this.doInTime(
        duration,
        (t) => {
          let i = Math.floor(t * jumps) // path segment index
          const diff = i === jumps ? new Hex(0,0) : path[i+1].sub(path[i])
          bug.pos = path[i].add(diff.scale((t*duration % ms)/ms))
        },
      )
    }
  }

  doInTime(duration, doStep) {
    const start = Date.now()
    const interval = setInterval(() => {
      this.animating = true
      const sofar = Date.now() - start
      doStep(sofar/duration)
    }, 10)
    setTimeout(() => {
      clearInterval(interval)
      doStep(1)
      this.animating = false
    }, duration)
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
  safeNextPositions(color) {
    return this.nextToHivePositions().filter(hex => 
      hex.neighborhood().every((x) => !this.isEnemyOf(x, color))
    )
  }

  // positions of all occupied tiles which are in neighborhood of given pos
  posOfNeighbors(hex) {
    return hex.neighborhood().filter((pos) => {
      const tile = this.at(pos)
      return tile && tile.length > 0
    })
  }

  // positions of all empt tiles wich are in neighborhood of given pos
  posOfWays(hex) {
    return hex.neighborhood().filter((pos) => {
      const tile = this.at(pos)
      return tile && tile.length === 0
    })
  }

  isEnemyOf(hex, color) {
    const tile = this.at(hex)
    return tile && tile.length && tile[tile.length-1].color !== color
  }
  
  isNextToHive(hex, except) { // is empty but has occupied neighbor tile
    return this.at(hex).length === 0 && hex.neighborhood().some(hex => {
      const tile = this.at(hex)
      return tile && tile.length > 0 && !(except && hex.eq(except))
    })
  }

  // returns true if bug on given position will break hive on removal
  isHiveBridge(hex) {
    return this.articulations().some(cut => cut.eq(hex))
  }

  isNarrow (from, to) {
    return this.posOfNeighbors(from).filter(nfrom => this.posOfNeighbors(to).some(nto => nto.eq(nfrom))).length === 2
  } // share 2 common neighbors


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
      this.posOfWays(current).filter((pos) => this.isNextToHive(pos)).forEach(next => {
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
  possibleLandings({color}) {
    if (this._stones === 0) { 
      return [new Hex(0, 0), ...Hex.directions]
    } 
    if (this._stones === 1) {
      return this.nextToHivePositions()
    } 
    return this.safeNextPositions(color)
  }

  __randomLandingPos(color) {
    const positions = this.possibleLandings({color})
    return positions[rand(positions.length)] || __randomBugPos(color)
  }

  __randomBugPos(color) {
    const positions = this.hivePositions().filter(pos => {
      const tile = this.at(pos)
      return color === tile[tile.length-1].color 
    })
    return positions[rand(positions.length)] || new Hex(0, 0)
  }

  toString() {
    let str = ''
    this._grid.forEach((row, i) => {
      str += '  '.repeat(Math.abs(this._radius - i))
      row.forEach(tile => {
        let st = ' '
        if(tile.length) {
          st = tile[0].constructor.name[0]
          if(tile[0].color === 'white') {
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

// Hand represents storage of stones which are not placed yet.
class Hand {
  constructor(bugs, revert, offset=0) {
    this._hand = [...bugs]
    bugs.forEach((bug, i) => {
      bug.pos = new Hex(
       // -5 + i,
       // -3 -(i-i%2)/2 - i%2,
       -2 + i,
       -7 + offset, 
      )
      if (revert) {
        bug.pos = bug.pos.revert()
      }
    })
  }

  find(hex) {
    return this._hand.find(bug => bug && hex.eq(bug.pos))
  }

  takeBugAt(i) {
    const bug = this._hand[i]
    this._hand[i] = null
    return bug
  }

  __getRandomBugPos() {
    if(this._hand.filter(v => v === null).length === 3 && this._hand[0]) {
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
    return this._hand.filter(bug => bug).length
  }

  each(callback) {
    this._hand.forEach((bug, i) => bug && callback(bug, i, this) )
  }
}


class PriorityQueue {
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