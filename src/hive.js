import './settings.js'
import './vue.js'
import * as audio from './audio.js'
import { _, __, verb } from './lang.js'
import Game from './game.js'
import uiOf from './ui.js'
import { connect, disconnect, restart } from './io.js'
import { rand, uncolorEmoji } from './common.js'
import { Hex } from './board.js'

console.log("Hive loaded")
console.time("")
audio.menu()

const canvas = document.getElementById('hiveCanvas')

let aiTimeout = 0
let gameMode = ''
let ggetName = () => ''
let aiMode = 'dumb'
let thinking = false
const game = new Game(12)
game.verb = verb


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

const mainMenu = [
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
    action: () => {
      game.menus.push(aiSubmenu)
      ui.touch()
    },
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
    action: () => AIvAI('montecarlo', 'dumb'),
  },
]

const aiSubmenu = [
  {
    label: '🦋',
    title: __('easy', 'lehká'),
    pos: new Hex(+2/3, -4/3),
    action: () => vAI('dumb', __('easy', 'lehká')),
  },
  {
    label: '🦂',
    title: __('hard', 'těžká'),
    pos: new Hex(-4/3, +2/3),
    // action: IO => vAI('minimax', __('hard', 'těžká')),
  },
  {
    label: '🐝',
    title: __('medium', 'střední'),
    pos: new Hex(+2/3, 2/3),
    action: IO => vAI('montecarlo', __('medium', 'střední')),
  },
]

game.menus = [
  mainMenu,
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
      clearTimeout(aiTimeout)
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
        clearTimeout(aiTimeout)
        game.reset({})
        audio.stop()
        eval(`${gameMode}('${aiMode}')`)
        ui.on(canvas)
      }
    }),
    pos: new Hex(-.5, 1),
  },
  {
    ...mainMenu[0],
    pos: new Hex(-1.5, 3),
  },
  {
    ...mainMenu[1],
    pos: new Hex(1.5, -3),
  },
].map(item => {
  item.title = item.title.bind(item)
  item.action = item.action.bind(item)
  return item
})

game.passButton = {
  label: __('Pass', 'Předat'),
  pos: new Hex(6, 0),
  action: () => {
    game.switchPlayers()
    game.canPass = game.hasToPass()
  },
}

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

const autoMove = (players) => async () => {
  if (game.state === 'end' || thinking || players[game._activePlayerIndex] === 'human') {
    return
  }
  if (game.canPass) {
    console.log('canpass')
    game.click(game.passButton.pos)
    return
  }
  if (players[game._activePlayerIndex] === 'dumb') {
    if (!game.selected) { // select
      const fromHand = rand(Math.ceil(game.activePlayer().hand.size()/10+1))
      game.click(
        fromHand
          ? game.activePlayer().hand.__getRandomBugPos()
          : game.space.__bestishBugPos(game.activePlayer())
      )
    } else { // place or move
      game.click(game.__bestishLandingPos())      
    }
  } else if (players[game._activePlayerIndex] === 'random') {
    const { bug, targetPos } = game.randomMove()
    game.click(bug.pos)
    ui.touch()
    game.click(targetPos)
  } else if (players[game._activePlayerIndex] === 'montecarlo') {
    thinking = true
    ui.touch()
    const { bug, targetPos } = await game.bestMonteCarloMove()
    game.click(bug.pos)
    ui.touch()
    game.click(targetPos)
    thinking = false
  }

  ui.touch()
  if (game.state === 'end') {
    clearTimeout(aiTimeout)
  }
}

function training () {
  gameMode = 'training'
  audio.track('p')
  ui.disableInputFor([])
  ui.hideMenu()
  game.start()
}

function AIvAI(AImode1=aiMode, AImode2='dumb') {
  console.log(AImode1, 'vs', AImode2)
  aiMode = AImode1 // backup preset to be reused on reload
  gameMode = 'AIvAI'
  audio.track('ava')
  game.players[0].name = uncolorEmoji(_(`ai ${AImode1}`, `ui ${AImode1}`))
  game.players[1].name = uncolorEmoji(_(`ai ${AImode2}`, `ui ${AImode2}`))
  game._activePlayerIndex = rand(2)
  ui.hideMenu()
  ui.disableInputFor([0,1])
  game.start()
  ;(function scheduleMove() {
    aiTimeout = setTimeout(()=> {
      autoMove([AImode1, AImode2])()
      scheduleMove()
    }, 150)
  })()
}

function vAI(AImode=aiMode, getName=ggetName) {
  ggetName = getName
  aiMode = AImode // backup preset to be reused on reload
  if (game.menus[game.menus.length-1] === aiSubmenu) {
    game.menus.pop()
  }
  gameMode = 'vAI'
  audio.track('pva')
  game.players[0].name = _("You", "Ty")
  game.players[0].gender = '2'
  game.players[1].name = uncolorEmoji(_(`${getName()} game`, `${getName()} hra`))
  game.players[1].gender = _('M', 'F')
  game._activePlayerIndex = rand(2)
  ui.hideMenu()
  ui.disableInputFor([1])
  game.start()
  ;(function scheduleMove() {
    aiTimeout = setTimeout(()=> {
      autoMove(['human', AImode])()
      scheduleMove()
    }, 360)
  })()
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

async function startMultiplayer(onConnect) {
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
  await connect(origHashdata, async (
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

    onRestart((firstGoes) => {
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
      if (action === 'ready'+ +!playerIndex) {
        go()
        return
      }

      // decode action to click
      let hex
      {
        if (action[1] === 'H') { // hand click
          const i = Number(action.substr(2))
          const handBug = game.activePlayer().hand.at(i)
          hex = handBug.pos
        } else
        if (action[1] === 'S') { // space click
          hex = Hex.fromString(action.substr(2))
        } else
        if (action[1] === 'P') { // pass button click
          hex = game.passButton.pos
        } else {
          return // invalid action
        }
      }
      game.click(hex, true)
      ui.touch()
    })

    sendAction('ready'+playerIndex) // ready means I can go
  })
}
