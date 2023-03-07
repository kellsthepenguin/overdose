import { Server as IOServer } from 'socket.io'
import { Server as NetServer } from 'http'

type NetServerWithIO = NetServer & {
  io: IOServer
  socketIds: Map<string, string>
}

export default NetServerWithIO
