import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server as IOServer } from 'socket.io'
import verifyJWT from './util/verifyJWT'
import jwt from 'jsonwebtoken'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const io = new IOServer()
const socketIds = new Map<string, string>()

io.on('connection', (socket) => {
  const token = socket.handshake.headers['authorization']
  const isValid = verifyJWT(token!)
  const { id } = jwt.decode(token!) as { id: string }

  if (!isValid) {
    socket.emit('alert', 'invalid token')
    socket.disconnect()
    return
  }

  socketIds.set(id, socket.id)
})

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  io.listen(server)

  console.log(
    `> Server listening at :${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
