import { Server as IOServer } from 'socket.io'
import { createServer as createHttpServer } from 'http'
import express from 'express'

const app = express()
const server = createHttpServer(app)
const io = new IOServer(server)

io.on('connection', (socket) => {
  const { token, publicKey } = socket.handshake.query

  // idk
})
 