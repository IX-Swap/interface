import { useServices } from 'hooks/useServices'

export const useAccessToken = () => {
  const { storageService } = useServices()
  return storageService.get<string>('access-token')
}