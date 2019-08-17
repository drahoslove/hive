import Game from './game.js'
import uiOf from './ui.js'
import { connect, disconnect } from './io.js'
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
    disconnect()
    clearInterval(AiInterval)
    ui.showMenu()
    window.location.hash = ''
    ui.off()
    game.reset()
    ui.on(canvas)
  }
}
game.menu = [
  {
    label: '⚙',
    title: 'možnosti',
    pos: new Hex(-2, +2),
    action: () => { alert("Zatím není co nastavovat")}
  },
  {
    label: '❓',
    title: 'pravidla',
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
    title: 's někým',
    pos: new Hex(0, -2),
    action: startMultiplayer,
  },
  {
    label: '👤×👽',
    title: 'proti hře',
    pos: new Hex(+2, -2),
    action: vAI,
  },
  {
    label: '👤',
    title: 'trénink',
    pos: new Hex(+2, 0),
    action: () => {
      ui.disableInputFor([])
      ui.hideMenu()
      game.start()
    },
  },
  {
    label: '👽×👽',
    title: 'ukázka',
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
    if (window.location.hash) {
      startMultiplayer()
    }
  }, 100)
}
// ui.off(canvas)
// setTimeout(()=>ui.on(canvas), 1500)

const autoMove = (players) => () => {
  if (!players.includes(game._activePlayerIndex)) {
    return
  }
  !game.selected
    ? game.click(
      rand(game.activePlayer().hand.size()+1)
        ? game.activePlayer().hand.__getRandomBugPos()
        : game.space.__randomBugPos(game.activePlayer())
      )
    : game.click(game.__randomLandingPos())

  // console.clear()
  // console.log(String(game.space))
  ui.touch()
  if (game.state === 'end') {
    clearInterval(AiInterval)
  }
}

function AIvAI() {
  game.players[0].name = "Silly AI"
  game.players[1].name = "Dull AI"
  ui.hideMenu()
  ui.disableInputFor([0,1])
  game.start()
  AiInterval = setInterval(autoMove([0, 1]), 50)
}

function vAI() {
  game.players[0].name = "Tvé IQ"
  game.players[1].name = "Hloupé AI"
  ui.hideMenu()
  ui.disableInputFor([1])
  game.start()
  AiInterval = setInterval(autoMove([1]), 800)
}

function startMultiplayer() {
  const origHash = window.location.hash.substr(1)
  connect(origHash, (room, playerIndex, sendAction, onIncomingAction) => {
    ui.disableInputFor([0, 1]) // disable all input until ready/go
    game.message = 'Čekej na spoluhráče'
    game.state = 'wait'
    if (playerIndex === 1) { // swap the sides to ensure "you" is always at bottom
      ;[ game.players[1], game.players[0] ] = [ game.players[0], game.players[1] ]
    }
    game.players[playerIndex].name = 'Tvé já'
    game.players[+!playerIndex].name = 'Soupeř'
    ui.hideMenu()
    let lastSentAction = ''

    window.location.hash = room
    if (!origHash) {
      window.prompt('Tento link pošli protihráči', window.location)
    }

    game.onClick = (hex) => {
      let action
      { // encode click to action
        const pi  = game._activePlayerIndex
        const handBug = game.activePlayer().hand.find(({pos}, i) => pos.eq(hex))
        if (handBug) {
          const i = game.activePlayer().hand.indexOf(handBug)
          action =`${pi}H${i}` // hand click
        } else {
          action = `${pi}S${hex.toString()}` // space click
        }
      }
      lastSentAction = action
      sendAction(action)
    }

    const go = () => {
      game.message = ''
      game.start()
      ui.disableInputFor([+!playerIndex]) // game can start => allow input
    }

    onIncomingAction((action) => {
      if (action.match(/ready|go/)) {
        if (action === 'ready'+ +!playerIndex) {
          if (game.state === 'wait') {
            sendAction('go')
            go()
          } else {
            game.message = "Soupeř restartoval hru"
            ui.touch()
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }
        }
        if (action === 'go') { // go mean everyone goes
          go()
        }
        // ready from my other socket is ignored
        return
      }
      if (game.state !== 'started') {
        return
      }
      if (lastSentAction !== action) {
        // decode action to click
        let hex
        {
          if (action[1] === 'H') { // hand click
            const i = Number(action.substr(2))
            const handBug = game.activePlayer().hand.at(i)
            hex = handBug.pos
          }
          if (action[1] === 'S') { // space click
            hex = Hex.fromString(action.substr(2))
          }
        }
        game.click(hex)
        ui.touch()
      }
    })

    sendAction('ready'+playerIndex) // ready means I can go
  })
}