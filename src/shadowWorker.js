import Game from './game.js'
import { Hand, Hex } from './board.js'
import * as Bugs from './bugs.js'

function playShadowGames({
  space,
  players,
  bug,
  destinations,
  totalPlays=20,
  maxPlayDepth=4,
}) {
  // deserialize game from the components
  const game = new Game(space.radius)
  game.players = players.map((p, i) => {
    const player = {
      ...p,
    }
    player.hand = new Hand(
      p.hand.map(b => Bugs.Bug.fromSerialized(b, player)),
      !i
    )
    return player
  })
  game._activePlayerIndex = game.players.findIndex((p) => p.isShadowPlayer)
  game.shadowPlayer = game.players[game._activePlayerIndex]

  const getPlayer = ({ color, name }) => 
    game.players.find(player => player.name === name && player.color === color)

  space.tiles.forEach(({ pos, bugs: bs }) => {
    game.space.at(pos)
      .push(...bs
        .map(b => Bugs.Bug.fromSerialized(b, getPlayer(b.owner)))
      )
  })

  bug = Bugs.Bug.fromSerialized(bug, getPlayer(bug.owner))
  
  // play shadow games!
  let scores = []
  for (const pos of destinations) {
    const targetPos = new Hex(pos)
    const destinationScore = Array.from({length: totalPlays}).map(() => {
      const shadowGame = game.shadowGame()
      const shadowBug = shadowGame.shadowBug(bug.pos)
      shadowGame.shadowMove(shadowBug, targetPos)
      const partScore = shadowGame.shadowPlayUntil(maxPlayDepth)
      return partScore
    }).reduce((sum, score) => sum+score, 0)
    scores.push(destinationScore)
  }

  return scores
}


onmessage = function(e) {
  const score = playShadowGames(e.data)
  postMessage(score)
}