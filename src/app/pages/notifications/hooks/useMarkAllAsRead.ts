import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { Notification } from 'types/notification'
import { markAllNotificationsAsRead } from 'app/pages/notifications/hooks/utils'
import { getIdFromObj } from 'helpers/strings'

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
