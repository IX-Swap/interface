import io from 'socket.io-client'
import { API_URL, SOCKET_TRANSPORTS } from 'config'
import { Notification } from 'types/notification'
import { queryKeys } from 'config/queryKeys'
import { QueryCache } from 'react-query'

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

  subscribeToSocket(
    onNotification: (notification: Notification) => any,
    queryCache: QueryCache
  ) {
    try {
      if (_socket?.connected ?? false) {
        return
      }

      _socket?.removeAllListeners()

      _socket = io(process.env.NODE_ENV === 'test' ? '' : `${API_URL}`, {
        transports: SOCKET_TRANSPORTS
      })

      _socket.addEventListener('default', () => {})

      _socket.addEventListener('main', () => {})

      _socket.addEventListener('notification', (notification: Notification) => {
        onNotification(notification)

        queryCache.setQueryData<Notification[]>(
          queryKeys.notifications,
          data => [notification, ...(data ?? [])]
        )
      })

      _socket.addEventListener(
        'notifications',
        (notifications: Notification[]) => {
          queryCache.setQueryData(queryKeys.notifications, notifications)
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
}

export default socketService
