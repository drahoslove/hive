// This module contain no game-specific logic

// import io from './socket.io.dev.js'

const BACKEND = window.location.origin.includes('localhost')
	? 'http://localhost:3000'
	: 'https://gamsoc.draho.cz'

const io = window.io

let socket

export function disconnect() {
	if (socket) {
		socket.close()
	}
	socket = null
}

export function connect (room, driver) {
	if (socket) {
		socket.close()
	}
	socket = io(`${BACKEND}/game`, {
		query: {
			room: room,
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

	socket.on('room_joined', (room, playerIndex) => {
		console.log('room_joined', room)
		driver(
			room,
			playerIndex,
			(action) => { socket.emit('action', action) },
			(handleAction) => { socket.on('action', handleAction) },
		)
	})

	socket.on('chat', (msg) => {
		console.log('chat', msg)
	})

}