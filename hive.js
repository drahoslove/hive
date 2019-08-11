import Game from './game.js'
import uiOf from './ui.js'
import connect from './io.js'
import { rand, uncolorEmoji } from './common.js'
import { Hex } from './board.js'

let loaderInterval = 0
{
  const cp = document.getElementById("loader").innerText.codePointAt(0)
  const spinLoader = (i) => {
    loaderInterval = requestAnimationFrame(() => {
      document.getElementById("loader").innerText = String.fromCodePoint(
        cp+(i%12)
      )
      spinLoader(i+1)
    })
  }
  spinLoader(0)
}

console.log("Hive loaded")
console.time("")


const canvas = document.getElementById('hiveCanvas')

let AiInterval
const game = new Game(12)
game.backButton = {
  label: '🠸',
  action: () => {
    clearInterval(AiInterval)
    ui.showMenu()
    ui.off()
    game.reset()
    ui.on(canvas)
  }
}
game.menu = [
  {
    label: '⚙',
    title: 'config',
    pos: new Hex(-2, +2),
    // action: () => { alert("nastavení zatím nefunguje")}
  },
  {
    label: '❓',
    title: 'help',
    pos: new Hex(-2, 0),
    action: () => {
      document.getElementById('help').classList.add('show')
      document.getElementById('closehelp').onclick = () => {
        document.getElementById('help').classList.remove('show')
      }
    }
  },
  {
    label: '👤🌐👤',
    title: 'multi',
    pos: new Hex(0, -2),
    action: () => {
      connect()
    }
  },
  {
    label: '👤×👽',
    title: 'single',
    pos: new Hex(+2, -2),
    action: vAI,
  },
  {
    label: '👤',
    title: 'training',
    pos: new Hex(+2, 0),
    action: () => {
      ui.disableInputFor([])
      ui.hideMenu()
    },
  },
  {
    label: '👽×👽',
    title: 'demo',
    pos: new Hex(0, +2),
    action: AIvAI,
  },
]


const ui = uiOf(game)
window.onload = () => {
  ui.on(canvas)
  console.timeEnd("")
  setTimeout(() => {
    cancelAnimationFrame(loaderInterval)
    document.getElementById("loader").innerHTML = ''
  }, 100)
}
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
  if (game.state === 'end') {
    clearInterval(AiInterval)
  }
}

function AIvAI() {
  ui.hideMenu()
  ui.disableInputFor([0,1])
  AiInterval = setInterval(autoMove([0, 1]), 50)
}

function vAI() {
  ui.hideMenu()
  ui.disableInputFor([1])
  AiInterval = setInterval(autoMove([1]), 800)
}
