import Ws from 'App/Services/Ws'
Ws.boot()

interface SocketUser {
  userID: string
  username: string
}

Ws.io.on('connection', (socket) => {
  const users: SocketUser[] = []
  for (let [id, socket] of Ws.io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }
  socket.emit('users', users)
  console.log(users)

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  })
})

Ws.io.use((socket, next) => {
  const { username } = socket.handshake.auth
  if (!username) {
    return next(new Error('invalid username'))
  }
  socket.username = username
  next()
})
