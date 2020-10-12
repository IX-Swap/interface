import { useServices } from 'v2/services/useServices'
import { useEffect, useMemo } from 'react'
import User from 'v2/types/user'
import { Notification } from 'v2/types/notification'
import { queryCache } from 'react-query'
import { queryKeys } from 'v2/config/queryKeys'

export const useSubscribeToNotifications = () => {
  const { socketService, storageService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])

  useEffect(() => {
    const user = storageService.get<User>('user')
    void socketService._subscribeToSocket(user?.accessToken)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('notifications', (notifications: Notification[]) => {
        queryCache.setQueryData(queryKeys.notifications, notifications)
      })

      socket.on('notification', (notification: Notification) => {
        queryCache.setQueryData<Notification[]>(
          queryKeys.notifications,
          data => [notification, ...(data ?? [])]
        )
      })
    }
  }, [socket])
}
