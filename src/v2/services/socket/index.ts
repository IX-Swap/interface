import io from 'socket.io-client'

import { API_URL } from 'v1/config'
import storageHelper from '../../helpers/storageHelper'

let _socket: SocketIOClient.Socket | undefined

const socketService = {
  getConnection () {
    return _socket
  },

  disconnect () {
    if (_socket !== undefined) {
      _socket.removeAllListeners()
      _socket.disconnect()
    }
  },

  subscribeToSocket () {
    if (_socket !== undefined && !_socket.connected) {
      const bearerToken = storageHelper.getAccessToken()
      _socket = io(`${API_URL}?token=${bearerToken}`)
    }

    return _socket
  },

  async _subscribeToSocket (): Promise<SocketIOClient.Socket> {
    return await new Promise(resolve => {
      const bearerToken = storageHelper.getAccessToken()
      if (bearerToken === undefined) {
        resolve(undefined)
        return
      }

      // Check if socket is not connected then connect
      if (_socket === undefined || !_socket.connected) {
        // console.log('will subscribe', _socket)
        _socket = io(`${API_URL}?token=${bearerToken}`)
        _socket.on('connect', () => {
          // console.log('connect')
          resolve(_socket)
        })
        _socket.on('connect_error', function () {
          // console.log('no connect', props)
          resolve(_socket)
        })
        _socket.on('connect_timeout', function () {
          // console.log('no timeout')
          resolve(_socket)
        })
        _socket.on('error', function () {
          // console.log('no connect', props)
          resolve(_socket)
        })
        _socket.on('reconnecting', function () {
          // console.log('reconnecting connect')
          resolve(_socket)
        })
      } else {
        // console.log('else')
        return resolve(_socket)
      }
    })
  }
}

export default socketService
