import Game from './game.js'
import uiOf from './ui.js'
import { rand } from './common.js'
import { Hex } from './board.js'

console.log("Hive loaded")

const game = new Game(5)
game.menu = [
  {
    label: '👤×👽', // 🤖
    pos: new Hex(0.5, -1),
  },
  {
    label: '👤🔗👤',
    pos: new Hex(-1.5, 1),
  },
  {
    label: '👤',
    pos: new Hex(0.5, 1),
    action: () => { ui.hideMenu() },
  },
  {
    label: '👽×👽',
    pos: new Hex(-1.5, 3),
    action: autoplay,
  },
]

if (window.location !== window.parent.location) {
  document.body.style.background = 'none'
}

const canvas = document.getElementById('hiveCanvas')
const ui = uiOf(game).on(canvas).showMenu()
// ui.off(canvas)
// setTimeout(()=>ui.on(canvas), 1500)

function autoplay() {
  ui.hideMenu()
  const autoMove = () => {
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
  const timer = setInterval(autoMove, 150)
  setTimeout(() => {clearInterval(timer)}, 5*60*1000)
}
