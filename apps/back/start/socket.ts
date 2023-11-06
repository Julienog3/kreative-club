import Ws from 'App/Services/Ws'
Ws.boot()

interface SocketUser {
  userID: string
  username: string
}

Ws.io.on('connection', (socket) => {
  console.log('connection')
  const users: SocketUser[] = []
  for (let [id, socket] of Ws.io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }
  socket.emit('users', users)

  console.log('users', users)
  

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  })
})

Ws.io.use((socket, next) => {
  const { username } = socket.handshake.auth

  // const sessionID = socket.handshake.auth.sessionID;
  // if (sessionID) {
  //   // find existing session
  //   const session = sessionStore.findSession(sessionID);
  //   if (session) {
  //     socket.sessionID = sessionID;
  //     socket.userID = session.userID;
  //     socket.username = session.username;
  //     return next();
  //   }
  // }
   
  socket.username = username
  next()
})
