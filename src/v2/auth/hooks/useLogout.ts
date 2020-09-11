import { useHistory } from 'react-router-dom'
import { useServices } from 'v2/services/useServices'

export const useLogout = () => {
  const history = useHistory()
  const { storageService, socketService } = useServices()

  return () => {
    storageService.remove('user')
    storageService.remove('visitedUrl')
    socketService.disconnect()
    history.replace('/auth/login')
  }
}
