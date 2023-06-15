import { useServices } from 'hooks/useServices'

export const useLogout = () => {
  const { storageService, socketService, apiService } = useServices()

  return async () => {
    try {
      await apiService.get('/auth/log-out')
    } catch (error) {
    } finally {
      storageService.remove('user')
      sessionStorage.removeItem('issuerId')
      sessionStorage.removeItem('corporateId')
      storageService.remove('visitedUrl')
      storageService.remove('notificationFilter')
      socketService.disconnect()

      window.location.replace('/')
    }
  }
}
