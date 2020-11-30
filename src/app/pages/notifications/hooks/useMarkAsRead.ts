import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { Notification } from 'types/notification'
import { markNotificationAsRead } from 'app/pages/notifications/hooks/utils'
import { getIdFromObj } from 'helpers/strings'

export const useMarkAsRead = (notification: Notification) => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const uri = `/core/notifications/mark-read/${userId}/${notification._id}`
  const readNotification = async () => {
    return await apiService.patch(uri, {})
  }
  const [mutation, data] = useMutation(readNotification, {
    onSuccess: () => {
      queryCache.setQueryData<Notification[]>('notifications', data => {
        return markNotificationAsRead(notification._id, data)
      })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })

  return {
    ...data,
    mutation
  }
}
