// This module contain no game-specific logic

// import io from './socket.io.dev.js'

const BACKEND = window.location.origin.includes('localhost')
  ? 'http://localhost:3003'
  : 'https://gamsoc.draho.cz'

const io = window.io

let socket
let log


export function disconnect() {
  if (socket) {
    socket.close()
  }
  resetChat()
  socket = null
}

export function restart() {
  if (!socket) {
    return
  }
  socket.emit('restart')
}

export function connect (hashdata, driver) {
  if (socket) {
    socket.close()
  }

  // store actions returned from backend (including own)
  const actions = []

  const query = {
    hashdata,
    secret: localStorage['user_secret'] || '',
  }

  socket = io(`${BACKEND}/game`, {
    query,
  })

  socket.on('reconnect_attempt', () => {
    socket.io.opts.query = query
  });

  resetChat()

  socket.on('connect', () => {
    console.log('connected')
  })

  socket.on('error', (error) => {
    console.warn('connection error', error)
  })

  socket.on('new_secret', (secret) => {
    localStorage['user_secret'] = secret
    query.secret = secret
    console.log('new_secret', secret)
  })

  socket.on('err', (...data) => {
    console.warn('err', ...data)
  })

  socket.once('init', (room, playerIndex, firstGoes, ack) => {
    let lastActionIndex
    console.log('init', room)
    socket.emit('sync_actions', actions.length, (newActions) => {
      driver(
        room,
        playerIndex,
        firstGoes,
        (newHashdata) => {
          query.hashdata = newHashdata
        },
        (action) => {
          socket.emit('action', action, (actionIndex) => {
            lastActionIndex = actionIndex
            if (actionIndex !== actions.length) {
              console.error('Action sent before synced')
            }
          })
        },
        (handleAction) => {
          newActions.forEach(action => {
            actions.push(action)
            handleAction(action)
          })
          socket.on('action', (action, actionIndex) => {
            actions.push(action)
            if (actionIndex !== lastActionIndex) {
              handleAction(action)
            }
            lastActionIndex = actionIndex
          })
        },
        (handlePlayerInfo) => {
          socket.on('player_info', handlePlayerInfo)
          socket.on('disconnect', () => {
            handlePlayerInfo({
              playerIndex,
              online: false,
            })
          })
          socket.on('connect', () => {
            handlePlayerInfo({
              playerIndex,
              online: true,
            })
          })
        },
        (handleRestart) => {
          socket.on('restart', (firstGoes, ack) => {
            actions.length = 0
            handleRestart(firstGoes)
            ack && ack()
          })
        }
      )
      ack && ack()
    })
  })

  socket.on('chat', (msg) => {
    chatEl.classList.remove('disabled')
    console.log('chat', msg)
    log.push(msg)
    if(log.length > 64) {
      log.shift()
    }
    document.getElementById('chat-log').innerHTML = log.join('<br/>')
  })

}

export function chat(msg) {
  if (socket) {
    socket.emit('chat', msg)
  }
}


const chatEl = document.getElementById('chat')
const chatInput = document.getElementById('chat-input')

function resetChat() {
  log = []
  chatEl.classList.add('disabled')
  document.getElementById('chat-log').innerHTML = ''
}

chatInput.addEventListener('focus', () => {
  chatEl.classList.add('visible')
})
chatInput.addEventListener('blur', () => {
  chatEl.classList.remove('visible')
})

// focus on click
chatEl.addEventListener('click', () => {
  chatInput.focus()
})

// focus on key
window.addEventListener('keypress', ({ key }) => {
  if (!socket) {
    return
  }
  chatEl.classList.remove('disabled')
  chatInput.focus()
})

// on send
window.addEventListener('keydown', ({ key }) => {
  if (!socket) {
    return
  }
  if (key === "Enter") {
    const text = chatInput.value
    text && chat(text)
    chatInput.value = ''
  }
})