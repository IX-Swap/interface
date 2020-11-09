import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { Notification } from 'v2/types/notification'
import { markAllNotificationsAsRead } from 'v2/app/pages/notifications/hooks/utils'
import { getIdFromObj } from 'v2/helpers/strings'

export const useMarkAllAsRead = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
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
