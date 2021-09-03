import { useServices } from 'hooks/useServices'

export const useLogout = () => {
  const { storageService, socketService, apiService } = useServices()

  return async () => {
    try {
      await apiService.get('/auth/log-out')
    } catch (error) {
    } finally {
      storageService.remove('user')
      storageService.remove('visitedUrl')
      storageService.remove('notificationFilter')
      socketService.disconnect()

      window.location.replace('/')
    }
  }
}
