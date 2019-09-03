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
    action: function() {
      if (this.loading) {
        return
      }
      this.loading = true
      ui.touch()
      startMultiplayer(() => {
        this.loading = false
        ui.touch()
      })
    },
    loading: false,
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

game.sideMenu = [
  {
    label: '🡰',
    title: 'odejít',
    pos: new Hex(0,0),
    action: () => {
      const ok = game.space.size() === 0 || window.confirm("Opustit nenávratně rozehranou hru?")
      if (ok) {
        disconnect()
        clearInterval(AiInterval)
        ui.showMenu()
        setGetHashRoom('')
        ui.off()
        game.reset()
        ui.on(canvas)
      }
    },
  },
  {
    ...game.menu[0],
    pos: new Hex(-1, 2)
  },
  {
    ...game.menu[1],
    pos: new Hex(1,-2),
  },
]

const ui = uiOf(game)
window.onload = () => {
  ui.on(canvas)
  console.timeEnd("")
  setTimeout(() => {
    cancelAnimationFrame(loaderInterval)
    document.getElementById("loader").innerHTML = ''
    if (window.location.hash && window.location.hash.substr(1)[0] !== ';') {
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
  if (game.canPass) {
    console.log('canpass')
    game.click(game.passButton.pos)
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

function setGetHashRoom(room) {
  const origHashdata = window.location.hash.substr(1)
  const [ origRoom, ...rest ] = origHashdata.split(';')
  const hashdata = [room, ...rest].join(';')
  window.parent.postMessage({ room }, '*')
  window.location.hash = hashdata
  return origRoom
}

function startMultiplayer(onConnect) {
  const origHashdata = window.location.hash.substr(1)
  const origRoom = setGetHashRoom('')
  connect(origHashdata, (room, nick, gender, playerIndex, sendAction, onIncomingAction) => {
    ui.disableInputFor([0, 1]) // disable all input until ready/go
    game.message = 'Čekej na spoluhráče'
    game.state = 'wait'
    if (playerIndex === 1) { // swap the sides to ensure "you" is always at bottom
      ;[ game.players[1], game.players[0] ] = [ game.players[0], game.players[1] ]
    }
    game.players[playerIndex].name = nick || ''
    game.players[+!playerIndex].name = 'Soupeř'
    ui.hideMenu()
    let lastSentAction = ''

    setGetHashRoom(room)
    if (!origRoom) {
      const inFrame = window.parent !== window
      const link = inFrame
        ? document.referrer + '/' + room
        : window.location.origin + window.location.pathname + '#' + room
      window.prompt('Tento link pošli protihráči', link)
    }

    onConnect && onConnect()

    game.onClick = (hex) => {
      let action
      { // encode click to action
        const pi  = game._activePlayerIndex
        const handBug = game.activePlayer().hand.find(({pos}, i) => pos.eq(hex))
        if (handBug) {
          const i = game.activePlayer().hand.indexOf(handBug)
          action =`${pi}H${i}` // hand click
        } else if (game.passButton.pos.eq(hex)) {
          action =`${pi}P` // pass
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
          if (action[1] === 'P') { // pass button click
            hex = game.passButton.pos
          }
        }
        game.click(hex)
        ui.touch()
      }
    })

    sendAction('ready'+playerIndex) // ready means I can go
  })
}
