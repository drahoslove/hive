const PORT = 3000
const ORIGINS = [
	'http://localhost:8080',
	'https://hive.draho.cz',
	'https://www.alik.cz',
]

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

	console.log('connected', room, secret)

	if (!secret) {
		secret = randomToken(24) // client will store for auth on subsequent connects  
		socket.emit('new_secret', secret)
	}

	if (!room) { // create new room
		do {
			room = randomToken(12)
		} while(room in rooms)
		rooms[room] = [ secret ] // seat yourself
	} else { // join existing room
		if (!(room in rooms)) {
			return socket.emit('err', `Room ${room} does not exist`)
		}
		if (!rooms[room].includes(secret)) { // take your place in a room
			if (rooms[room].length >= 2) {
				return socket.emit('err', `Room ${room} is full`)
			}
			rooms[room].push(secret)
		}
	}
	const playerIndex = rooms[room].indexOf(secret)
	socket.emit('room_joined', room, playerIndex) // TODO pass username

	socket.join(room, () => { // start listening in room
		socket.on('chat', (data) => {
			// broadcast chat messages to everyone in room including own socket
			gameNamespace.to(room).emit('chat', data) 
		})
		socket.on('action', (data) => {
			console.log('action', data)
			// broadcast game actions to everyone in room except own socket
			socket.to(room).emit('action', data)
			// note: same user can connect with multiple socket by opening multiple windows
			// it's up to the client to distinguish apart the actions of oponets from your own actions from another window
		})
	})
})

function randomToken(n) {
	return crypto.randomBytes(n).toString('hex')
}
