import type { NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'
import verifyJWT from '@/util/verifyJWT'
import NextApiResponseWithIO from '@/types/NextApiResponseWithIO'
import { Server as IOServer } from 'socket.io'
import NetServerWithIO from '@/types/NetServerWithIO'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithIO
) {
  if (!res.socket.server.io) {
    const httpServer: NetServerWithIO = res.socket.server
    const io = new IOServer(httpServer, {
      path: '/api/socket.io',
    })

    io.on('connection', (socket) => {
      const token = socket.handshake.headers['authorization']

      if (!token) {
        socket.emit('alert', 'invalid headers')
        socket.disconnect()
        return
      }

      const isValid = verifyJWT(token!)

      if (!isValid) {
        socket.emit('alert', 'invalid token')
        socket.disconnect()
        return
      }

      const { id } = jwt.decode(token) as { id: string }

      if (!httpServer.socketIds)
        httpServer.socketIds = new Map<string, string>()
      httpServer.socketIds.set(id, socket.id)
    })

    io.listen(httpServer)
    httpServer.io = io
  }
  res.send({ ok: true })
}
