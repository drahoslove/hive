import { rand } from './common.js'
import { Hex,  Hand, Space } from './board.js'
import {
  Bug,
  Queen,
  Spider,
  Beatle,
  Ant,
  Grasshopper,
} from './bugs.js'

// class carring state of the game and prviding commands for game interaction
export default class Game {
  constructor(size=5) {
    this.reset(size)
  }

  reset(size=this._size) {
    this._size = size
    this.state = 'init'
    this.space = new Space(size)
    this.selected = null
    this.landings = []
    this.players = ['#112', '#eed'].map((color, i) => {
      const player = {
        name: `Player ${"AB"[i]}`,
        color,
        pos: i ? 'top' : 'bottom', // for loader & label positioning
      }
      player.hand = new Hand(Game.basicBugPack.map(Bug => new Bug(color, player)), !i)
      return player
    })
    this._activePlayerIndex = 0
    this.message = ""
    this.onClick = null
    this.canPass = false
    this.passButton = {
      label: 'Předat',
      pos: new Hex(6, 0),
      action: () => {
        this.switchPlayers()
        this.canPass = this.hasToPass()
      },
    }
    if (Array.isArray(this.menu)) {
      this.menu.forEach(btn => { btn.active = false })
    }
    if (Array.isArray(this.sideMenu)) {
      this.sideMenu.forEach(btn => { btn.active = false })
    }
  }

  start () {
    this.state = 'started'
    this.message = ''
  }

  disableInput() {
    this.inputDisabled = true
  }
  enableInput() {
    this.inputDisabled = false
  }

  // actions
  click(hex, silent=false) {
    if (this.inputDisabled || this.state === 'end') {
      return
    }

    if (this.onClick && !silent) {
      console.log('click', hex)
      this.onClick(hex)
    }

    if (this.canPass && this.passButton.pos.eq(hex)) {
      this.passButton.action()
      return
    }

    if (this.selected && this.landings.some(x => x.eq(hex))) {
      this.play(hex)
    } else {
      return this.trySelect(hex)
    }
  }

  isClickable(hex) {
    if (this.inputDisabled || this.state === 'end') {
      return false
    }
    // passButton
    if (this.canPass && this.passButton.pos.eq(hex)) {
      this.passButton.active = true
      return true
    } 
    this.passButton.active = false

    // selectable inhand bug
    let handBug = this.activePlayer().hand.find(bug => bug.pos.eq(hex))
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
        bug.owner === this.activePlayer() &&
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

  trySelect(hex) {   // TODO use isClickable func tokeep it DRY
    let bug = null

    // hand?
    if (bug = this.activePlayer().hand.find(bug => bug.pos.eq(hex))) {
      if (this.hasToPlaceQueenNow() && bug.name !== 'Queen') {
        return false
      }
      this.landings = this.space.possibleLandings(bug.owner)
      if (this.selected === bug) { // already selected
        bug = null // deselect
      }
      this.selected = bug
      return true
    }

    // tile?
    let tile = this.space.at(hex)
    if (tile && tile.length) {
      bug = tile[tile.length-1]
      if (bug.owner !== this.activePlayer()) {
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
      } else
      if (bug) {
        // select own
        this.landings = bug.reachablePlaces(this.space) // TODO
      }
    }

    if (this.selected === bug) { // already selected
      bug = null // deselect
    }
    this.selected = bug
    if (bug) {
      return true
    }
  }

  // place or move selected bug
  play(hex) {
    const bug = this.selected
    this.activePlayer().hand.takeBug(bug)
    this.space.putAt(bug, hex)
    this.selected = null
    this.landings = []
    this.checkEnd() 
    this.switchPlayers()
    this.canPass = this.hasToPass()
    console.log(String(this.space))
  }

  checkEnd () {
    const dead = this.players.map(player => {
      const queen = this.space.findBug(({name, owner}) =>
        name === 'Queen' && owner === player
      , true)
      return queen && this.space.posOfNeighbors(queen.pos).length === 6
    })
    if (dead[0] && dead[1]) {
      this.message = "Tie!"
      this.state = 'end'
      return true
    }
    if (dead[this._activePlayerIndex]) {
      this.message = `${this.players[+!this._activePlayerIndex].name} vyhrává!`
      this.state = 'end'
      return true
    }
    if (dead[+!this._activePlayerIndex]) {
      this.message = `${this.players[this._activePlayerIndex].name} vyhrává!`
      this.state = 'end'
      return true
    }
  }

  hasToPass () {
    const player = this.activePlayer()
    let canLand = player.hand.size() > 0 && this.space.possibleLandings(player).length > 0
    let canMove = false
    if (this.isQueenPlaced()) {
      this.space.each((tile) => {
        if (tile.length === 0) {
          return
        }
        const bug = tile[tile.length-1]
        if (
          bug.owner === player &&
          !this.space.isHiveBridge(bug.pos) &&
          bug.reachablePlaces(this.space).length > 0
        ) {
          canMove = true
        }
      })
    }
    return !canLand && !canMove
  }

  isQueenPlaced() {
    return !this.activePlayer().hand.find(({name}) => name === 'Queen')
  }

  hasToPlaceQueenNow() {
    return this.activePlayer().hand.used() === 3 && // exactly 3 placed
      !this.isQueenPlaced()
  }

  switchPlayers() {
    this._activePlayerIndex = +!this._activePlayerIndex
  }

  activePlayer() {
    return this.players[this._activePlayerIndex]
  }

  __randomLandingPos() {
    return this.landings[rand(this.landings.length-1)] || this.space.__randomBugPos(this.activePlayer())
  }

}

Game.basicBugPack =  [
  Queen,
  Spider, Spider,
  Beatle, Beatle,
  Ant, Ant, Ant,
  Grasshopper, Grasshopper, Grasshopper,
]
