import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { queryCache, useMutation } from 'react-query'
import { Notification } from 'v2/types/notification'
import { markNotificationAsRead } from 'v2/app/pages/notifications/hooks/utils'

export const useMarkAsRead = (notification: Notification) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = user?._id ?? ''
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
