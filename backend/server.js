const ORIGINS = [
	'http://localhost:8080',
	'https://hive.draho.cz',
	'https://www.alik.cz',
]
const PORT = process.env.PORT || 3003
const SALT = process.env.SALT || 'SALT'

const crypto = require('crypto')
const io = require('socket.io')(PORT, { serveClient: false })
io.origins((origin, callback) => {
  if (!ORIGINS.includes(origin)) {
    return callback('origin not allowed', false);
  }
  callback(null, true)
})

const rooms = {
	// [room]: [{ nick, gender, secret }, [secret]: { nick, gender, secret}],
}
const actions = {
	// [room]: number,
}

console.log('listening', PORT)

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
		rooms[room] = [{ secret, nick, gender }] // seat yourself
		actions[room] = 0
	} else { // join existing room
		if (!(room in rooms)) {
			return socket.emit('err', `Room ${room} does not exist`)
		}
		const myself = rooms[room].find(({secret: s}) => secret === s)
		if (!myself) {
				if (rooms[room].length >= 2) {
				return socket.emit('err', `Room ${room} is full`)
			}
			rooms[room].push({ secret, nick, gender }) // take your place in a room
		} else { // update me
			myself.nick = nick
			myself.gender = gender
		}
	}

	socket.join(room, () => { // start listening in room
		const playerIndex = rooms[room].map(({secret}) => secret).indexOf(secret)
		socket.emit('room_joined', room, playerIndex, () => {
			rooms[room].forEach((player, i) => {
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
			const actionIndex = actions[room]++
			ack(actionIndex)
			// broadcast incoming game actions to everyone in room except own socket
			socket.to(room).emit('action', data, actionIndex)
			// note: same user can connect with multiple socket by opening multiple windows
			// it's up to the client to distinguish apart the actions of oponets from your own actions from another window
			// actionIndex might be helpfull in this
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

function md5(txt) {
  return crypto.createHash('md5').update(txt).digest('hex')
}