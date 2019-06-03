// class carring state of the game and prviding commands for game interaction
class Game {
  constructor(colors, size=6) {
    this.space = new Space(size)
    this.selected = null
    this.landings = []
    this.invalidated = true
    this.players = colors.map((color, i) => ({
      color,
      hand: new Hand(Game.basicBugPack.map(Bug => new Bug(color)), !i),
    }))
    this._activePlayerIndex = 0
  }

  // actions
  onClick(hex) {
    if (this.space.animating) {
      return
    }
    this.invalidated = true
    if (this.selected && this.landings.some(x => x.eq(hex))) {
      this.play(hex)
    } else {
      this.trySelect(hex)
    }
    // console.clear()
    // console.log(String(game.space))
    // console.log('hex', String(hex))
  }

  isClickable(hex) {
    if (this.space.animating) {
      return false
    }
    // selectable inhand bug
    let handBug = this.activePlayer().hand.find(hex)
    if (handBug) {
      if (this.hasToPlaceQueenNow()) { // 3 placed
        return handBug.name === 'Queen' 
      }
      return true
    }
    // selectable inspace bug
    let tile = this.space.at(hex)
    if (tile && tile.length) {
      let bug = tile[tile.length-1]
      if (
        bug.color === this.activePlayer().color &&
        this.isQueenPlaced() &&
        !(tile.length === 1 && this.space.isHiveBridge(bug.pos))
      ) {
        return true
      }
    }
    // can land bug
    if (this.selected && this.landings.some(x => x.eq(hex))) {
      return true
    }
  }

  trySelect(hex) {  
    let bug = null

    // hand?
    if (bug = this.activePlayer().hand.find(hex)) {
      if (this.hasToPlaceQueenNow() && bug.name !== 'Queen') {
        return
      }
      this.landings = this.space.possibleLandings(bug)
      this.selected = bug
      return
    }

    // tile?
    let tile = this.space.at(hex)
    if (tile && tile.length) {
      bug = tile[tile.length-1]
      if (bug.color !== this.activePlayer().color) {
        // deselect
        bug = null
        this.landings = []
      } else
      if (tile.length === 1 && this.space.isHiveBridge(bug.pos)) {
        bug = null
        console.error('cant move this, will break hive into two')
      } else
      if (!this.isQueenPlaced()) {
        bug = null
        console.error('cant move - qeen not placed yet')
      }  else
      if (bug) {
        // select own
        this.landings = bug.reachablePlaces(this.space) // TODO
      }
    }

    this.selected = bug
  }

  play(hex) {
    const bug = this.selected
    this.activePlayer().hand.each((b, i, hand) => {
      if (bug === b) {
        hand.takeBugAt(i)
      }
    })
    this.space.putAt(bug, hex)
    this.selected = null
    this.landings = []
    this.switchPlayers()
  }

  isQueenPlaced() {
    let holding = false
    this.activePlayer().hand.each(bug => {
      if(bug.name === 'Queen') {
        holding = true
      }
    })
    return !holding
  }

  hasToPlaceQueenNow() {
    if (this.activePlayer().hand.used() === 3) { // exactly 3 placed
      if (!this.isQueenPlaced()) {
        return true
      }
    }
    return false
  }

  switchPlayers() {
    this._activePlayerIndex = +!this._activePlayerIndex
  }

  activePlayer() {
    return this.players[this._activePlayerIndex]
  }

  __randomLandingPos() {
    return this.landings[rand(this.landings.length-1)] || this.space.__randomBugPos(this.activePlayer().color)
  }

}

Game.basicBugPack =  [
  Queen,
  Spider, Spider,
  Beatle, Beatle,
  Ant, Ant, Ant,
  Grasshopper, Grasshopper, Grasshopper,
]

function rand(n) {
  return Math.floor(Math.random()*n)
}