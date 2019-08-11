// import io from './socket.io.dev.js'

const io = window.io

let socket

export default function online (driver) {
	if (socket) {
		socket.close()
	}
	socket = io('http://localhost:3000/hive', {
		query: {
			room: window.location.hash.substr(1),
			secret: localStorage['hive_secret'] || '',
		}
	})

	socket.on('connect', () => {
		console.log('connected')
	})

	socket.on('new_secret', (secret) => {
		localStorage['hive_secret'] = secret
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

	// socket.on('action', (action) => {
	// 	console.log('action', action)
	// })
}