const ORIGINS = [
	'http://localhost:8080',
	'https://hive.draho.cz',
	'https://www.alik.cz',
]
const PORT = process.env.PORT || 3003

const crypto = require('crypto')
const io = require('socket.io')(PORT, { serveClient: false })
io.origins((origin, callback) => {
  if (!ORIGINS.includes(origin)) {
    return callback('origin not allowed', false);
  }
  callback(null, true)
})

const rooms = {
	// [room]: [secret, secret],
}

console.log('listening', PORT)

const gameNamespace = io.of('/game')

gameNamespace.on('connect', (socket) => {
	let { room, secret } = socket.handshake.query

	console.log(`connected to room ${room} with secret ${secret}`)

	if (!secret) {
		secret = randomToken(16) // client will store for auth on subsequent connects  
		socket.emit('new_secret', secret)
	}

	if (!room) { // create new room
		do {
			room = randomToken(8)
		} while(room in rooms)
		rooms[room] = [ secret ] // seat yourself
	} else { // join existing room
		if (!(room in rooms)) {
			return socket.emit('err', `Room ${room} does not exist`)
		}
		if (!rooms[room].includes(secret)) {
			if (rooms[room].length >= 2) {
				return socket.emit('err', `Room ${room} is full`)
			}
			rooms[room].push(secret) // take your place in a room
		}
	}

	socket.join(room, () => { // start listening in room
		const playerIndex = rooms[room].indexOf(secret)
		socket.emit('room_joined', room, playerIndex) // TODO pass username

		socket.on('chat', (data) => {
			// broadcast incoming chat messages to everyone in room including own socket
			gameNamespace.to(room).emit('chat', data) 
		})

		socket.on('action', (data) => {
			console.log('action', data)
			// broadcast incoming game actions to everyone in room except own socket
			socket.to(room).emit('action', data)
			// note: same user can connect with multiple socket by opening multiple windows
			// it's up to the client to distinguish apart the actions of oponets from your own actions from another window
		})
	})
})


function randomToken(n) {
	const chars = 'abcdefghijklmnopqrstuvwxyz234567'
	const result = new Array(n)
	const randomBites = crypto.randomBytes(n)
	for (let i = 0, cursor = 0; i < n; i++) {
		cursor += randomBites[i]
		result[i] = chars[cursor % chars.length]
	}
	return result.join('')
}
