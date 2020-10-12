import io from 'socket.io-client'

import { API_URL } from 'v2/config'
import storageHelper from 'v2/helpers/storageHelper'

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

  subscribeToSocket(token?: string) {
    if (_socket !== undefined && !_socket.connected) {
      _socket = io(`${API_URL}?token=${token ?? ''}`)
    }

    return _socket
  },

  _subscribeToSocket(bearerToken: string | undefined) {
    try {
      _socket = io(`${API_URL}?token=${bearerToken ?? ''}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export default socketService
