import Game from './game.js'
import uiOf from './ui.js'
import { rand } from './common.js'

console.log("Hive loaded")

const game = new Game(['#112', '#eed'], 5)

if (window.location.href.endsWith("autoplay")) {
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
  }
  const timer = setInterval(autoMove, 150)
  setTimeout(() => {clearInterval(timer)}, 5*60*1000)
}

if (window.location !== window.parent.location) {
  document.body.style.background = 'none'
}
const canvas = document.getElementById('hiveCanvas')
const ui = uiOf(game).on(canvas)
// ui.off(canvas)
// setTimeout(()=>ui.on(canvas), 1500)

