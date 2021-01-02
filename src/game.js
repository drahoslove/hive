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
// NOTE : do not imort lang or other modules depending on window

const THREADS = navigator.hardwareConcurrency || 16 // number of webWorkers to spawn

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
        name: `Player ${i+1}`,
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
  play(hex, isShadow=false) {
    const bug = this.selected
    this.activePlayer().hand.takeBug(bug)
    this.space.putAt(bug, hex)
    this.selected = null
    this.landings = []
    this.checkEnd()
    this.switchPlayers()
    this.canPass = (!isShadow && this.hasToPass())

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
      this.futureMessage = "Tie!"
      this.state = 'end'
      return true
    }
    if (dead[this._activePlayerIndex]) {
      const winner = this.players[+!this._activePlayerIndex]
      winner.score = 1 // for monte carlo only
      this.futureMessage = this.verb && `${winner.name} ${this.verb('win', winner.gender)}!`
      this.state = 'end'
      return true
    }
    if (dead[+!this._activePlayerIndex]) {
      const winner = this.players[this._activePlayerIndex]
      winner.score = 1 // for monte carlo only
      this.futureMessage = this.verb &&  `${winner.name} ${this.verb('win', winner.gender)}!`
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
          (tile.length > 1 || !this.space.isHiveBridge(bug.pos)) && // can be bridge if beatle on top
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

  getAllPossibleMoves(tryPickImprovements=false) {
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

    let moves = possibleBugs.reduce((moves, bug, i) => {
      const destinations = this.getDestinationsOf(bug)
      destinations.forEach((dest) => {
        moves.push({ bug, targetPos: dest })
      })
      return moves
    }, [])

    if (tryPickImprovements) {
      const betterMoves = moves.filter(this.isMoveImprovement)
      if (betterMoves.length > 0) {
        moves = betterMoves
      }
    }

    const movesByBugs = moves.reduce((array, move) => {
      const existing = array.find(({ bug }) => bug === move.bug)
      if (existing) {
        existing.destinations.push(move.targetPos)
      } else {
        array.push({
          bug: move.bug,
          destinations: [move.targetPos]
        })
      }
      return array
    }, [])

    return movesByBugs
  }

  randomMove(tryPickImprovements) {
    const moves = this.getAllPossibleMoves(tryPickImprovements)
    if (moves.length === 0) {
      // console.log(this.space.toString())
      throw Error('zero possible moves')
    }
    const bugMoves = moves[rand(moves.length)]
    if (bugMoves.destinations.length === 0) {
      // console.log(this.space.toString())
      throw Error('zero possible moves')
    }
    return {
      bug: bugMoves.bug,
      targetPos: bugMoves.destinations[rand(bugMoves.destinations.length)],
    }
  }

  isMoveImprovement = (({ bug, targetPos }) => {
    const shadowGame = this.shadowGame()
    const rankBefore = shadowGame.computeRank()
    shadowGame.shadowMove(shadowGame.shadowBug(bug.pos), targetPos)
    const rankAfter = shadowGame.computeRank()
    return rankAfter > rankBefore
  })

  async bestMonteCarloMove() {
    const movesByBugs = this.getAllPossibleMoves()
    const rankedMoves = []
    const shadowWorkers = Worker
      ? Array.from({length: THREADS}).map(() => new Worker('/shadowWorker-bundle.js'))
      : null
    let i = 0
    let workerPromises = []
    for (const { bug, destinations } of movesByBugs) {
      i++
      this.selected = bug
      let bugScores = []
      const totalPlays = 120 / destinations.length
      const maxPlayDepth = 2
      if (shadowWorkers && shadowWorkers.length) {
        const shadowWorker = shadowWorkers[i%THREADS]
        // call worker here for each bug
        workerPromises.push(new Promise((resolve) => {
          let ii = i
          shadowWorker.addEventListener('message', (e) => {
            const { scores, i } = e.data
            if (i === ii) {
              resolve(scores)
            }
          })
          shadowWorker.postMessage({
            i,
            space: this.space.serializable(),
            players: this.players.map((p, i) => ({
              isShadowPlayer: i === this._activePlayerIndex,
              color: p.color,
              name: p.name,
              hand: p.hand.map(bug => bug.serializable()),
            })),
            bug: bug.serializable(),
            destinations,
            totalPlays: totalPlays,
            maxPlayDepth: maxPlayDepth,
          })
        }))
      } else { // fallback without worker
        for (const targetPos of destinations) {
          const scores = await Promise.all(Array.from({length: totalPlays}).map(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const shadowGame = this.shadowGame()
                const originalRank = shadowGame.computeRank()
                let shadowBug = shadowGame.shadowBug(bug.pos)
                shadowGame.shadowMove(shadowBug, targetPos)
                const partScore = shadowGame.shadowPlayUntil(maxPlayDepth, originalRank)
                resolve(partScore)
              })
            })
          }))
          const moveScore = scores.reduce((sum, score) => sum+score, 0) / totalPlays // avt
          // const moveScore = scores.reduce((max, score) => Math.max(max, score), 0) // best
          bugScores.push(moveScore)
        }
        destinations.forEach((targetPos, i) => {
          rankedMoves.push({
            rank: bugScores[i], // bigger is better
            move: { bug, targetPos },
          })
        })
      }
      this.selected = null
    }
    if (shadowWorkers && shadowWorkers.length) {
      const bugsScores = await Promise.all(workerPromises) // one worker per bug
      let j = 0
      for (const { bug, destinations } of movesByBugs) {
        const bugScores = bugsScores[j]
        destinations.forEach((targetPos, i) => {
          rankedMoves.push({
            rank: bugScores[i], // bigger is better
            move: { bug, targetPos },
          })
        })
        j++
      }
      shadowWorkers.forEach(worker => worker.terminate())
    }

    let sortedMoves = rankedMoves
      .sort((a,b) => b.rank-a.rank) // sort by larger rank first
      .map(({ move, rank }) => ({ ...move, rank }))
    
    const topMoves = sortedMoves
      .filter(({ rank }) => rank === sortedMoves[0].rank)

    
    const improvement = sortedMoves // filter out some imparment moves
      .filter((_, i, { length }) => i < length /4 )
      .find(this.isMoveImprovement)

    const bestMove = improvement || topMoves[rand(topMoves.length)]
    return bestMove
  }

  shadowGame() {
    const shadowGame = new Game(this._size)
    shadowGame._activePlayerIndex = this._activePlayerIndex
    shadowGame.state = this.state
    // clone players with hands and hand bugs
    shadowGame.players = this.players.map((player, i) => {
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
      return shadowPlayer
    })
    const shadowOfPlayer = (player) => 
      shadowGame.players[this.players.indexOf(player)]
    // clone space with placed bughs
    this.space.each((tile, pos) => {
      shadowGame.space.at(pos)
        .push(...tile
          .map(bug => bug.clone({ owner: shadowOfPlayer(bug.owner)}))
        )
      shadowGame.space._stones = this.space._stones
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
        // console.log('shadowbug is null', hex, this.activePlayer().hand._hand)
      }
    }
    return bug
  }

  shadowMove(bug, targetPos) {
    this.selected = bug
    this.play(targetPos, true)
  }

  computeRank() {
    let rank = 0
    this.space.each((tile, hex) => {
      const bug = tile[0]
      if (bug && bug.name === 'Queen') {
        let overload = (this.space.posOfNeighbors(bug.pos).length) //1..6
        if (overload === 6) {
          overload += 1 // to ensure last move is more important
          if (bug.owner === this.shadowPlayer) {
            overload += 1000000000 // try to prevent losing at all costs
          }
        } else {
          const isBridge = +this.space.isHiveBridge(bug.pos)
          overload += +isBridge*0.4
        }
        bug.owner === this.shadowPlayer
          ? rank -= (overload) // we dont want to move to our queen
          : rank += (overload) // wa want to move to opponents queen
      }
    })
    return rank + this.space.size()/24 // it is better to place more stones if the rank would be the same othervise
  }

  shadowPlayUntil(limit, originalRank=0) { // returns 0 for tie -1 for lost and +1 for win
    let i
    for (i = 0; i < limit; i++) {
      if (this.state === "end") {
        break
      }
      try {
        const { bug, targetPos } = this.randomMove(i === 0)
        this.shadowMove(bug, targetPos)
      } catch (e) {
        this.switchPlayers()
      }
    }
    const left = limit-i // 0 or more

    
    // evaluate who has better position to win
    const rank = this.computeRank()
    return (rank-originalRank) * (left+1) // to stay positive
  }
}

Game.basicBugPack =  [
  Queen,
  Spider, Spider,
  Beetle, Beetle,
  Ant, Ant, Ant,
  Grasshopper, Grasshopper, Grasshopper,
]
