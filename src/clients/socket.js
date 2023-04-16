function createSocketConnection() {
  return socket
}

import { io } from "socket.io-client"

let socket = {
  def: io('/'),
  chats: io('/chats'),
}

export default socket
