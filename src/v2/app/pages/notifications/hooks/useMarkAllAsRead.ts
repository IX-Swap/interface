import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { queryCache, useMutation } from 'react-query'
import { Notification } from 'v2/types/notification'
import { markAllNotificationsAsRead } from 'v2/app/pages/notifications/hooks/utils'

export const useMarkAllAsRead = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = user?._id ?? ''
  const uri = `/core/notifications/mark-read/all/${userId}`
  const readNotification = async () => {
    return await apiService.patch(uri, {})
  }

  return useMutation(readNotification, {
    onSuccess: () => {
      queryCache.setQueryData<Notification[]>('notifications', data => {
        return markAllNotificationsAsRead(data)
      })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
