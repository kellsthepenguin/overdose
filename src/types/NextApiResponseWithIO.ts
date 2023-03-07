import { Socket } from 'net'
import { NextApiResponse } from 'next'
import NetServerWithIO from './NetServerWithIO'

type NextApiResponseWithIO = NextApiResponse & {
  socket: Socket & {
    server: NetServerWithIO
  }
}

export default NextApiResponseWithIO
