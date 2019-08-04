import Game from './game.js'
import uiOf from './ui.js'
import { rand } from './common.js'
import { Hex } from './board.js'

console.log("Hive loaded")

const game = new Game(5)
game.menu = [
  {
    label: '👤🔗👤',
    pos: new Hex(-1, 0),
  },
  {
    label: '👤×👽', // 🤖
    pos: new Hex(1, -2),
    action: vAI,
  },
  {
    label: '👤',
    pos: new Hex(1, 0),
    action: () => { ui.hideMenu() },
  },
  {
    label: '👽×👽',
    pos: new Hex(-1, 2),
    action: AIvAI,
  },
]

if (window.location !== window.parent.location) {
  document.body.style.background = 'none'
}

const canvas = document.getElementById('hiveCanvas')
const ui = uiOf(game).on(canvas).showMenu()
// ui.off(canvas)
// setTimeout(()=>ui.on(canvas), 1500)

const autoMove = (players) => () => {
  if (!players.includes(game._activePlayerIndex)) {
    return
  }
  !game.selected 
    ? game.onClick(
      rand(game.activePlayer().hand.size()+1)
        ? game.activePlayer().hand.__getRandomBugPos()
        : game.space.__randomBugPos(game.activePlayer().color)
      )
    : game.onClick(game.__randomLandingPos())
 
  // console.clear()
  // console.log(String(game.space))
  ui.touch()
}

function AIvAI() {
  ui.hideMenu()
  ui.disableInputFor([0,1])
  const timer = setInterval(autoMove([0, 1]), 250)
  setTimeout(() => {clearInterval(timer)}, 5*60*1000)
}

function vAI() {
  ui.hideMenu()
  ui.disableInputFor([1])
  const timer = setInterval(autoMove([1]), 800)
  // setTimeout(() => {clearInterval(timer)}, 10*60*1000)
}

