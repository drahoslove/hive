const PORT = 3000
const origins = [
	'http://localhost:8080',
	'https://hive.draho.cz',
	'https://www.alik.cz',
]

const crypto = require('crypto')
const io = require('socket.io')(PORT, {
	serveClient: false,
	// transports: ['websocket'],
})
io.origins((origin, callback) => {
  if (!origin.includes(origin)) {
    return callback('origin not allowed', false);
  }
  callback(null, true)
})

const rooms = {
	// [room]: [secret, secret],
}

console.log('listening', PORT)

const gameNamespace = io.of('/hive')
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
		socket.emit('room_joined', room, 0)
	} else { // join existing room
		if (!(room in rooms)) {
			return socket.emit('err', 'room_unknown', room)
		}
		if (!rooms[room].includes(secret)) { // take your place in a room
			if (rooms[room].length >= 2) {
				return socket.emit('err', 'room_full', room)
			}
			rooms[room].push(secret)
		}
		const playerIndex = rooms[room].indexOf(secret)
		socket.emit('room_joined', room, playerIndex) // TODO pass username
	}

	socket.join(room, () => {
		socket.in(room)
			.on('chat', (data) => {
				// broadcast chat messages to everyone in room including yourself
				gameNamespace.to(room).emit('chat', data) 
			})
			.on('action', (data) => {
				console.log('action', data)
				// broadcast game actions to everyone in room except yourself
				socket.to(room).emit('action', data)
			})
	})
})


function randomToken(n) {
	return crypto.randomBytes(n).toString('hex')
}