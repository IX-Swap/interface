import io from 'socket.io-client'

import { API_URL } from 'config'
import storageHelper from '../../helpers/storageHelper'

let _socket: SocketIOClient.Socket | undefined

const socketService = {
  getConnection () {
    return _socket
  },

  disconnect () {
    if (_socket) {
      _socket.removeAllListeners()
      _socket.disconnect()
    }
  },

  subscribeToSocket () {
    if (_socket && !_socket.connected) {
      const bearerToken = storageHelper.getAccessToken()
      _socket = io(`${API_URL}?token=${bearerToken}`)
    }

    return _socket
  },

  _subscribeToSocket (): Promise<SocketIOClient.Socket> {
    return new Promise((resolve) => {
      const bearerToken = storageHelper.getAccessToken()
      if (!bearerToken) {
        resolve(undefined)
        return
      }

      // Check if socket is not connected then connect
      if (!_socket || !_socket.connected) {
        console.log('will subscribe', _socket)
        _socket = io(`${API_URL}?token=${bearerToken}`)
        _socket.on('connect', () => {
          console.log('connect')
          resolve(_socket)
        })
        _socket.on('connect_error', function (...props: any) {
          console.log('no connect', props)
          resolve(_socket)
        })
        _socket.on('connect_timeout', function () {
          console.log('no timeout')
          resolve(_socket)
        })
        _socket.on('error', function (...props: any) {
          console.log('no connect', props)
          resolve(_socket)
        })
        _socket.on('reconnecting', function () {
          console.log('reconnecting connect')
          resolve(_socket)
        })
      } else {
        console.log('else')
        return resolve(_socket)
      }
    })
  }
}

export default socketService
