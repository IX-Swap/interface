import { useServices } from 'v2/hooks/useServices'
import User from 'v2/types/user'

export const useAccessToken = () => {
  const { storageService } = useServices()

  return storageService.get<User>('user')?.accessToken
}
