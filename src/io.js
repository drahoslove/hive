// This module contain no game-specific logic

// import io from './socket.io.dev.js'

const BACKEND = window.location.origin.includes('localhost')
	? 'http://localhost:3003'
	: 'https://gamsoc.draho.cz'

const io = window.io

let socket

export function disconnect() {
	if (socket) {
		socket.close()
	}
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
		console.log('chat', msg)
			log.push(msg)
			log.shift()
			document.getElementById('chat-log').innerHTML = log.join('<br/>')
	})

}

export function chat(msg) {
	if (socket) {
		socket.emit('chat', msg)
	}
}

document.getElementById('chat').classList.add('disabled')

let log = ['','','','','']
let acc = ''
document.getElementById('chat-log').innerHTML = log.join('<br/>')

window.addEventListener('keydown', ({ key }) => {
	if (key === 'Backspace') {
		acc = acc.slice(0, -1)
	} else
	if (key === "Enter") {
		acc && chat(acc)
		acc = ''
	} else
	if (key.length === 1) {
		acc += key
		document.getElementById('chat').classList.remove('disabled')
	}
	document.getElementById('chat-input').innerText = acc
})