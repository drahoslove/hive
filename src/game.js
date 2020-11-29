import { rand } from './common.js'
import { Hex,  Hand, Space } from './board.js'
import {
  Bug,
  Queen,
  Spider,
  Beetle,
  Ant,
  Grasshopper,
} from './bugs.js'
import { _, __, verb } from './lang.js'

// class carring state of the game and prviding commands for game interaction
export default class Game {
  constructor(size=5) {
    this.reset({size})
  }

  topMenu() {
    return this.menus[this.menus.length-1]
  }

  hasSubmenu() {
    return this.menus.length > 1
  }

  reset({
    size=this._size,
    message='',
    state='init',
    firstGoes=0,
    onClick=null,
  }) {
    this._size = size
    this.state = state
    this.space = new Space(size)
    this.selected = null
    this.landings = []
    this.players = ['black', 'white'].map((color, i) => {
      const player = {
        name: _('Player', 'Hráč') + ` ${i+1}`,
        gender: 'M',
        color,
        pos: i ? 'top' : 'bottom', // for loader & label positioning
      }
      player.hand = new Hand(Game.basicBugPack.map(Bug => new Bug(color, player)), !i)
      return player
    })
    this._activePlayerIndex = firstGoes
    this.message = message
    this.onClick = onClick
    this.canPass = false
    this.passButton = {
      label: __('Pass', 'Předat'),
      pos: new Hex(6, 0),
      action: () => {
        this.switchPlayers()
        this.canPass = this.hasToPass()
      },
    }
    if (Array.isArray(this.menus)) {
      this.menus.forEach((menu) => {
          menu.forEach(btn => { btn.active = false })
      })
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

    if (this.onClick && !silent) { // for debug
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
    return false
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
    // console.log(String(this.space))
  }

  checkEnd () {
    const dead = this.players.map(player => {
      const queen = this.space.findBug(({name, owner}) =>
        name === 'Queen' && owner === player
      , true)
      return queen && this.space.posOfNeighbors(queen.pos).length === 6 && queen // intentionally second queen to return it
    })
    this.dead = dead.filter(Boolean)
    if (dead[0] && dead[1]) {
      this.players[0].score = this.players[1].score = 0 // for monte carlo only
      this.futureMessage = _("Tie!", "Remíza!")
      this.state = 'end'
      return true
    }
    if (dead[this._activePlayerIndex]) {
      const winner = this.players[+!this._activePlayerIndex]
      winner.score = 1 // for monte carlo only
      this.futureMessage = `${winner.name} ${verb('win', winner.gender)}!`
      this.state = 'end'
      return true
    }
    if (dead[+!this._activePlayerIndex]) {
      const winner = this.players[this._activePlayerIndex]
      winner.score = 1 // for monte carlo only
      this.futureMessage = `${winner.name} ${verb('win', winner.gender)}!`
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

  __bestishLandingPos() {
    const positions = [...this.landings]
    const rankedPos = positions.map(pos => {
      let rank = 0
      const neighs = this.space.posOfNeighbors(pos)
      neighs.forEach(pos => {
        const bug = this.space.atBottom(pos)
        if (bug.name === 'Queen') {
          bug.owner === this.activePlayer()
            ? rank-- // we dont want to move to our queen
            : rank+=2 // wa want to move to opponents queen
        }
      })
      return {pos, rank}
    })
    rankedPos.sort((a, b) => b.rank - a.rank) // highest rank first
    const bestPositions = rankedPos
      .filter(({rank}) => rank === rankedPos[0].rank)
      .map(({pos}) => pos)
    // console.log('rankedLandings', rankedPos.map(({rank}) => rank))

    return bestPositions[rand(bestPositions.length)] || this.space.__bestishBugPos(this.activePlayer())
  }

  getDestinationsOf(bug) {
    const isHandBug = !bug.placed
    if (isHandBug) {
      return this.space.possibleLandings(bug.owner)
    } else {
      return bug.reachablePlaces(this.space)
    }
  }

  getAllPossibleMoves() {
    const possibleBugs = []
    const activePlayer = this.activePlayer()
    const isQueenPlaced = this.isQueenPlaced()
    const hand = activePlayer.hand
    if (hand.used() === 3 && !isQueenPlaced) {
      possibleBugs.push(hand._hand[0]) // queen must be used in 4th move
    } else {
      hand.each(bug => {
        // only count each type of bug in hand once
        if (!possibleBugs.some(({ name }) => bug.name === name)) {
          possibleBugs.push(bug)
        }
      })
    }
    if (isQueenPlaced) { // cam move -> include space bugs
      this.space.hivePositions()
        .filter(pos => (this.space.atTop(pos)||{}).owner === activePlayer)
        .filter(pos => this.space.at(pos).length > 1 || !this.space.isHiveBridge(pos))
        .forEach(pos => {
          const bug = this.space.atTop(pos)
          if (bug) {
            possibleBugs.push(bug)
          }
          if (this.space.isHiveBridge(bug.pos) && this.space.at(pos).length === 1) {
            throw Error('bridge selected as possible move')
          }
        })
    }

    return possibleBugs.reduce((moves, bug, i) => {
      const destinations = this.getDestinationsOf(bug)
      destinations.forEach((dest) => {
        moves.push({ bug, targetPos: dest })
      })
      return moves
    }, [])
  }

  randomMove() {
    const moves = this.getAllPossibleMoves()
    if (moves.length === 0) {
      console.log(this.space.toString())
      throw Error('zero possible moves')
    }
    
    return moves[rand(moves.length)]
  }

  async bestMonteCarloMove() {
    const moves = this.getAllPossibleMoves()
    const rankedMoves = []
    for (const move of moves) {
      const { bug, targetPos } = move
      const totalPlays = 20
      const maxPlayDepth = 4
      this.selected = move.bug
      const scores = await Promise.all(Array.from({length: totalPlays}).map(() => {
        return new Promise((resolve) => {
          setTimeout(() => { // TODO replace with WebWorker
            const shadowGame = this.shadowGame()
            let shadowBug = shadowGame.shadowBug(bug.pos)
            shadowGame.shadowMove(shadowBug, targetPos)
            const partScore = shadowGame.shadowPlayUntil(maxPlayDepth)
            resolve(partScore)
          })
        })
      }))
      this.selected = null
      const score = scores.reduce((sum, score) => sum+score, 0)
      rankedMoves.push({
        rank: score, // bigger is better
        move,
      })
    }
    
    let sortedMoves = rankedMoves
      .sort((a,b) => b.rank-a.rank) // sort by larger rank first
    
    const topMoves = sortedMoves.filter(({ rank }) => rank === sortedMoves[0].rank) // only choose between the bests ranks
    
    const bestMove = topMoves[rand(topMoves.length)].move
    return bestMove
  }

  shadowGame() {
    const shadowGame = new Game(this._size)
    shadowGame._activePlayerIndex = this._activePlayerIndex
    shadowGame.state = this.state
    shadowGame.canPass = this.canPass
    // clone players with hands and hand bugs
    this.players.forEach((player, i) => {
      const shadowPlayer = {
        ...player,
        name: i ? 'shadow' : 'shadoww',
        score: 0,
      }
      shadowPlayer.hand = new Hand(
        player.hand.map(bug => bug.clone({owner: shadowPlayer})),
        !i
      )
      shadowPlayer.hand.each((bug, i) => {
        bug.pos = player.hand.map(({ pos }) => pos)[i]
      })
      shadowGame.players[i] = shadowPlayer
    })
    const shadowOfPlayer = (player) => 
      shadowGame.players[this.players.indexOf(player)]
    // clone space with placed bugh
    this.space.each((tile, pos) => {
      shadowGame.space.at(pos)
        .push(...tile
          .map(bug => bug.clone({ owner: shadowOfPlayer(bug.owner)}))
        )
    })
    shadowGame.shadowPlayer = shadowGame.players[this._activePlayerIndex] // the one who we want to win in the shadow game

    return shadowGame
  }

  shadowBug(hex) {
    let bug = this.activePlayer().hand.find(b => b.pos.eq(hex))
    if (!bug) {
      let tile = this.space.at(hex)
      if (tile && tile.length) {
        bug = tile[tile.length-1]
      } else { 
        bug = null
      }
    }
    return bug
  }

  shadowMove(bug, targetPos) {
    this.selected = bug
    this.play(targetPos)
  }

  shadowPlayUntil(limit) { // returns 0 for tie -1 for lost and +1 for win
    for (let round = 1; round <= limit; round++) {
      if (this.state === "end") {
        // console.log('shadow play ended before limit', round, this.shadowPlayer.score)
        return this.shadowPlayer.score
          ? (limit-round) // 0..+1 // quicker win more positive
          : -(limit-round) // -1..0 // quicker lost more negative
      }
      if (this.canPass) {
        this.switchPlayers()
        this.canPass = this.hasToPass()
      }
      const { bug, targetPos } = this.randomMove()
      this.shadowMove(bug, targetPos)
    }

    // evaluate who has better position to win
    let rank = 0
    this.space.each((tile, hex) => {
      const bug = tile[0]
      if (bug && bug.name === 'Queen') {
        const overload = (this.space.posOfNeighbors(bug.pos).length-1)/5 // 0..1
        // const isBridge = +this.space.isHiveBridge(bug.pos)
        bug.owner === this.shadowPlayer
          ? rank -= (overload ) // we dont want to move to our queen
          : rank += (overload*1.5) // wa want to move to opponents queen
      }
    })

    return rank/limit/100
  }
}

Game.basicBugPack =  [
  Queen,
  Spider, Spider,
  Beetle, Beetle,
  Ant, Ant, Ant,
  Grasshopper, Grasshopper, Grasshopper,
]
