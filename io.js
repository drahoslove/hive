// This module contain no game-specific logic

// import io from './socket.io.dev.js'

const BACKEND = window.location.origin.includes('localhost')
	? 'http://localhost:3000'
	: 'https://simple-socketio-responder.herokuapp.com'

const io = window.io

let socket

export default function online (driver) {
	if (socket) {
		socket.close()
	}
	socket = io(`${BACKEND}/game`, {
		query: {
			room: window.location.hash.substr(1),
			secret: localStorage['user_secret'] || '',
		}
	})

	socket.on('connect', () => {
		console.log('connected')
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
		location.hash = room
		driver(
			playerIndex,
			(action) => { socket.emit('action', action) },
			(handleAction) => { socket.on('action', handleAction) },
		)
	})

	socket.on('chat', (msg) => {
		console.log('chat', msg)
	})

}