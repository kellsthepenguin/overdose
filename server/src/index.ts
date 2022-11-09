import { Server as IOServer } from 'socket.io'
import { createServer as createHttpServer } from 'http'

import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

import api from './api'

dotenv.config()

const app = express()
const server = createHttpServer(app)
const io = new IOServer(server)

app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, '../../dist/assets')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.use('/api', api)

io.on('connection', (socket) => {
  const { token, publicKey } = socket.handshake.query

  // idk
})
 
server.listen(8080)
