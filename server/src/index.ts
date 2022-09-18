import { Server as IOServer } from 'socket.io'
import { createServer as createHttpServer } from 'http'

const httpServer = createHttpServer()
const io = new IOServer(httpServer)

io.on('connection', (socket) => {
  const { token, publicKey } = socket.handshake.query

  // idk
})
