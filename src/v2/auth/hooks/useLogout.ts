import { useServices } from 'v2/hooks/useServices'

export const useLogout = () => {
  const { storageService, socketService } = useServices()

  return () => {
    storageService.remove('user')
    storageService.remove('visitedUrl')
    storageService.remove('notificationFilter')
    socketService.disconnect()

    window.location.replace('/')
  }
}
