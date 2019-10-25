import './settings.js'
import './vue.js'
import * as audio from './audio.js'
import { _, __ } from './lang.js'
import Game from './game.js'
import uiOf from './ui.js'
import { connect, disconnect, restart } from './io.js'
import { rand, uncolorEmoji } from './common.js'
import { Hex } from './board.js'

console.log("Hive loaded")
console.time("")
audio.menu()

const canvas = document.getElementById('hiveCanvas')

let aiInterval
let gameMode = ''
const game = new Game(12)


const closeAll = () => {
  [...document.querySelectorAll('.show')].forEach(el =>
    el.classList.remove('show')
  )
}
;[...document.querySelectorAll('.close')].map(button => {
  button.onclick = closeAll
})

const open = (id) => () => {
  const cl = document.getElementById(id).classList
  const visible = cl.contains('show')
  closeAll()
  if (!visible) cl.add('show')
}

document.getElementById('footer').onclick = open('about')

game.menu = [
  {
    label: '⚙',
    title: __('settings', 'nastavení'),
    pos: new Hex(-2, +2),
    action: open('settings')
  },
  {
    label: '❓',
    title: __('rules', 'pravidla'),
    pos: new Hex(-2, 0),
    action: open('help')
  },
  {
    label: '👤🌐👤',
    title: __('multi', 's někým'),
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
    title: __('single', 'proti hře'),
    pos: new Hex(+2, -2),
    action: vAI,
  },
  {
    label: '👤',
    title: __('training', 'trénink'),
    pos: new Hex(+2, 0),
    action: training,
  },
  {
    label: '👽×👽',
    title: __('demo', 'ukázka'),
    pos: new Hex(0, +2),
    action: AIvAI,
  },
]

function confirmedAction(cond, action) {
  return function () {
    if (this.waiting || cond(this)) {
      this.waiting = false
      action()
      return
    }
    this.waiting = true
    ui.touch()
    setTimeout(() => {
      this.waiting = false
      ui.touch()
    }, 3000)
  }
}

game.sideMenu = [
  {
    label: '✖',
    title: function () {
      return !this.waiting ? _('exit', 'odejít') : _('really?', 'opravdu?')
    },
    action: confirmedAction(() => gameMode && game.space.size() === 0, () => {
      disconnect()
      clearInterval(aiInterval)
      ui.showMenu()
      setGetHashRoom('')
      gameMode = ''
      audio.menu()
      ui.off()
      game.reset({})
      ui.on(canvas)
    }),
    pos: new Hex(.5, -1),
  },
  {
    label: '🔄',
    title: function () {
      return !this.waiting ? _('restart', 'odznova') : _('really?', 'opravdu?')
    },
    action: confirmedAction(() => game.state === 'end', () => {
      if (!gameMode) {
        if (game.state !== 'wait') {
          restart()
        }
      } else {
        ui.off()
        clearInterval(aiInterval)
        game.reset({})
        audio.stop()
        eval(`${gameMode}()`)
        ui.on(canvas)
      }
    }),
    pos: new Hex(-.5, 1),
  },
  {
    ...game.menu[0],
    pos: new Hex(-1.5, 3),
  },
  {
    ...game.menu[1],
    pos: new Hex(1.5, -3),
  },
].map(item => {
  item.title = item.title.bind(item)
  item.action = item.action.bind(item)
  return item
})

const ui = uiOf(game)
window.onload = () => {
  ui.on(canvas)
  console.timeEnd("")
  setTimeout(() => {
    if (window.location.hash && window.location.hash.substr(1)[0] !== ';') {
      startMultiplayer()
    }
    document.getElementById('footer').classList.add('visible')
  }, 100)
}

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
      rand(Math.ceil(game.activePlayer().hand.size()/10+1))
        ? game.activePlayer().hand.__getRandomBugPos()
        : game.space.__bestishBugPos(game.activePlayer())
      )
    : game.click(game.__bestishLandingPos())

  ui.touch()
  if (game.state === 'end') {
    clearInterval(aiInterval)
  }
}

function training () {
  gameMode = 'training'
  audio.track('p')
  ui.disableInputFor([])
  ui.hideMenu()
  game.start()
}

function AIvAI() {
  gameMode = 'AIvAI'
  audio.track('ava')
  game.players[0].name = uncolorEmoji(_("AI 1", "UI 1"))
  game.players[1].name = uncolorEmoji(_("AI 2", "UI 2"))
  ui.hideMenu()
  ui.disableInputFor([0,1])
  game.start()
  aiInterval = setInterval(autoMove([0, 1]), 50)
}

function vAI() {
  gameMode = 'vAI'
  audio.track('pva')
  game.players[0].name = _("You", "Ty")
  game.players[0].gender = '2'
  game.players[1].name = uncolorEmoji(_("Game", "Hra"))
  game.players[1].gender = _('M', 'F')
  ui.hideMenu()
  ui.disableInputFor([1])
  game.start()
  aiInterval = setInterval(autoMove([1]), 800)
}

function setGetHashRoom(room) {
  const origHashdata = decodeURI(window.location.hash.substr(1))
  const [ origRoom, ...rest ] = origHashdata.split(';')
  const hashdata = [room, ...rest].join(';')
  window.parent.postMessage({ room }, '*')
  window.location.hash = hashdata
  return origRoom
}

function getParentLink(room) {
  return new Promise((confirm) => {
    const timeout = setTimeout(() => {
      window.removeEventListener('message', receiveLink)
      confirm(document.referrer + '/' + room) // fallback
    }, 1000)
    const receiveLink = (event) => {
      if ('link' in event.data) {
        confirm(event.data.link || '')
      } else {
        confirm('')
      }
      clearTimeout(timeout)
      window.removeEventListener('message', receiveLink)
    }
    window.addEventListener('message', receiveLink)
    window.parent.postMessage({ room }, '*')
  })
}

function startMultiplayer(onConnect) {
  const initGame = (playerIndex, firstGoes, onClick) => {
    ui.off()
    audio.track('wait')
    ui.disableInputFor([0, 1]) // disable all input until ready/go
    game.reset({
      message: _('Wait for the opponent', 'Čekej na spoluhráče'),
      state: 'wait',
      firstGoes,
      onClick: onClick(playerIndex),
    })
    if (playerIndex === 1) { // swap the sides to ensure "you" is always at bottom
      [ game.players[1], game.players[0] ] = [ game.players[0], game.players[1] ]
    }
    game.players[playerIndex].name = _('You', 'Ty')
    game.players[playerIndex].gender = '2'
    game.players[+!playerIndex].name = _('Opponent', 'Soupeř')
    game.players[+!playerIndex].gemder = 'M'
    game.players[+!playerIndex].online = false
    ui.on(canvas)
    ui.touch()
  }
  const origHashdata = decodeURI(window.location.hash.substr(1))
  const origRoom = setGetHashRoom('')
  connect(origHashdata, async (
    room,
    playerIndex,
    firstGoes,
    updateHashdata,
    sendAction,
    onIncomingAction,
    onPlayerInfo,
    onRestart,
  ) => {
    const onClick = (playerIndex) => (hex) => {
      let action
      { // encode click to action
        const pi = playerIndex
        const handBug = game.activePlayer().hand.find(({pos}, i) => pos.eq(hex))
        if (handBug) {
          const i = game.activePlayer().hand.indexOf(handBug)
          action =`${pi}H${i}` // hand click
        } else if (game.passButton.pos.eq(hex)) {
          action =`${pi}P` // pass
        } else {
          action = `${pi}S${hex}` // space click
        }
      }
      sendAction(action)
    }

    initGame(playerIndex, firstGoes, onClick)
  
    onPlayerInfo(({playerIndex: i, nick, gender, online}) => {
      const player = game.players[i]
      if (nick) {
        player.name = nick
      }
      if (gender) {
        player.gender = gender
      }
      player.online = online
      if (game.state !== 'wait') {
        if (game.players.some(({online}) => !online)) {
          ui.disableInputFor([0, 1]) // disable all input
        } else {
          ui.disableInputFor([+!playerIndex]) // disable opponent input
        }
      }
      ui.touch()
    })

    setGetHashRoom(room)
    updateHashdata(decodeURI(window.location.hash.substr(1)))
    if (!origRoom) {
      const inFrame = window.parent !== window
      const link = inFrame
        ? await getParentLink(room)
        : window.location.origin + window.location.pathname + '#' + room
      window.prompt(_('Send this link to your opponent', 'Tento link pošli protihráči'), link)
    }
    ui.hideMenu()

    onConnect && onConnect()

    const go = () => {
      game.start()
      audio.track('pvp')
      ui.disableInputFor([+!playerIndex]) // game can start => allow input
      ui.touch()
    }

    onRestart((pIndex, firstGoes) => {
      console.log('onRestart')
      initGame(playerIndex, firstGoes, onClick)
      game.message = _('Game is being restarted', 'Hra se restartuje')
      ui.disableInputFor([0, 1])
      ui.touch()
      setTimeout(() => {
        sendAction('ready'+playerIndex)
      }, 1500)
    })

    onIncomingAction((action) => {
      if (action.match(/ready|go/)) {
        if (action === 'ready'+ +!playerIndex) {
          if (game.state === 'wait') {
            sendAction('go')
            go()
          } else { // restart game
            console.error('desync -> restart')
            // restart() // TODO sync
            return
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
      game.click(hex, true)
      ui.touch()
    })

    sendAction('ready'+playerIndex) // ready means I can go
  })
}
