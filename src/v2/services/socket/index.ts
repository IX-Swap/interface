import io from 'socket.io-client'
import { API_URL } from 'v2/config'
import { Notification } from 'v2/types/notification'
import { queryCache } from 'react-query'
import { queryKeys } from 'v2/config/queryKeys'

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
    token: string,
    onNotification: (notification: Notification) => any
  ) {
    try {
      if (_socket?.connected ?? false) {
        return
      }

      _socket?.removeAllListeners()

      _socket = io(
        process.env.NODE_ENV === 'test' ? '' : `${API_URL}?token=${token}`,
        {
          transports: ['polling', 'websocket']
        }
      )

      _socket.addEventListener('default', (data: any) => {
        console.log('default', data)
      })

      _socket.addEventListener('main', (data: any) => {
        console.log('main', data)
      })

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
