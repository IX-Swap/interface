import io from 'socket.io-client'
import { API_URL } from 'v2/config'

let _socket: SocketIOClient.Socket | undefined

const socketService = {
  get socket() {
    return _socket
  },

  getConnection() {
    return _socket
  },

  disconnect() {
    if (_socket !== undefined) {
      _socket.removeAllListeners()
      _socket.disconnect()
    }
  },

  subscribeToSocket(bearerToken: string | undefined) {
    try {
      _socket = io(
        process.env.NODE_ENV === 'test'
          ? ''
          : `${API_URL}?token=${bearerToken ?? ''}`
      )
    } catch (error) {
      console.error(error)
    }
  }
}

export default socketService
