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

export function connect (hashdata, driver) {
	if (socket) {
		socket.close()
	}
	socket = io(`${BACKEND}/game`, {
		query: {
			hashdata,
			secret: localStorage['user_secret'] || '',
		}
	})

	resetChat()

	socket.on('connect', () => {
		console.log('connected')
	})

	socket.on('error', (error) => {
		console.warn('connection error', error)
	})

	socket.on('new_secret', (secret) => {
		localStorage['user_secret'] = secret
		console.log('new_secret', secret)
	})

	socket.on('err', (...data) => {
		console.warn('err', ...data)
	})

	socket.on('room_joined', (room, playerIndex, ack) => {
		console.log('room_joined', room)
		driver(
			room,
			playerIndex,
			(action) => { socket.emit('action', action) },
			(handleAction) => { socket.on('action', handleAction) },
			(handlePlayerInfo) => { socket.on('player_info', handlePlayerInfo) },
		)
		ack && ack()
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