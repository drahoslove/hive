const ORIGINS = [
	'http://localhost:8080',
	'https://hive.draho.cz',
	'https://www.alik.cz',
]
const PORT = process.env.PORT || 3003
const SALT = process.env.SALT || 'SALT'
const PASS = process.env.PASS || 'PASS'

const crypto = require('crypto')
const ioClient = require('socket.io-client')
const io = require('socket.io')(PORT, { serveClient: false })
io.origins((origin, callback) => {
  if (!ORIGINS.includes(origin)) {
    return callback('origin not allowed', false);
  }
  callback(null, true)
})

const rooms = {
	// [room]: {
	//   users: [{ nick, gender, secret }, [secret]: { nick, gender, secret}],
	//   actions: 0,
	//	 startTime: timestamp,
	//   lastTime: timestamp,
	// } 
}

console.log('listening', PORT)

// game io:

const gameNamespace = io.of('/game')

gameNamespace.on('connect', (socket) => {
	let { hashdata, secret } = socket.handshake.query
	let [ room, nick, gender, hash ] = (hashdata || '').split(';')
	console.log('hashdata:', hashdata)

	if (md5([ nick, gender, SALT ].join(';')) === hash) {
    console.log('hash matches')
	} else {
		nick = ''
		gender = ''
	}

	console.log(`connected to room ${room} as ${nick}/${gender} with secret ${secret}`)

	if (!secret) {
		secret = randomToken(16) // client will store for auth on subsequent connects
		socket.emit('new_secret', secret)
	}

	if (!room) { // create new room
		do {
			room = randomToken(8)
		} while(room in rooms)
		rooms[room] = {
			users: [{ secret, nick, gender }], // seat yourself
			actions: 0,
			startTime: Date.now(),
			lastTime: Date.now(),
		}
	} else { // join existing room
		if (!(room in rooms)) {
			return socket.emit('err', `Room ${room} does not exist`)
		}
		const myself = rooms[room].users.find(({secret: s}) => secret === s)
		if (!myself) {
				if (rooms[room].users.length >= 2) {
				return socket.emit('err', `Room ${room} is full`)
			}
			rooms[room].users.push({ secret, nick, gender }) // take your place in a room
		} else { // update me
			myself.nick = nick
			myself.gender = gender
		}
	}

	socket.join(room, () => { // start listening in room
		const playerIndex = rooms[room].users.map(({secret}) => secret).indexOf(secret)
		socket.emit('room_joined', room, playerIndex, () => {
			rooms[room].users.forEach((player, i) => {
				gameNamespace.to(room).emit('player_info', {
					playerIndex: i,
					nick: player.nick,
					gender: player.gender,
				})
			})
		})

		socket.on('chat', (data) => {
			// broadcast incoming chat messages to everyone in room including own socket
			gameNamespace.to(room).emit('chat', data)
		})

		socket.on('action', (data, ack) => {
			const actionIndex = rooms[room].actions++
			rooms[room].lastTime = Date.now()
			ack(actionIndex)
			// broadcast incoming game actions to everyone in room except own socket
			socket.to(room).emit('action', data, actionIndex)
			// note: same user can connect with multiple socket by opening multiple windows
			// it's up to the client to distinguish apart the actions of oponets from your own actions from another window
			// actionIndex might be helpfull in this
			updateAdmin()
		})

		socket.on('disconnect', () => {
			updateAdmin()
		})
	})
})

// admin io:

const adminNamespace = io.of('/admin')
adminNamespace.on('connect', socket => {
	let { pass } = socket.handshake.query
	if (pass !== PASS) {
		socket.disconnect()
	}
	updateAdmin()
})

const updateAdmin = () => {
	adminNamespace.emit('stats', {
		rooms: Object.entries(rooms).map(([room, data]) => ({
			hash: room,
			...data,
			connected: (gameNamespace.adapter.rooms[room]||{}).length,
		})),
		uptime: process.uptime(),
	})
}

// Slap yourself to prevent sleep
if (process.env.PORT) {
  (function ping () {
		const BACKEND = 'https://gamsoc.draho.cz'
		const socket = ioClient(`${BACKEND}/admin`)
	  setTimeout(ping, 1000 * 60 * (5 + Math.random() * 5)) // 5 to 10 minutes
	})()
}

// utilis:

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

function md5(txt) {
  return crypto.createHash('md5').update(txt).digest('hex')
}