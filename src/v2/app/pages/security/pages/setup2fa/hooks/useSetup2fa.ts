import { useServices } from 'v2/services/useServices'
import { useQuery } from 'react-query'
import { useSetup2faStore } from '../context'
import { TwoFaData } from 'v2/app/pages/security/pages/setup2fa/types'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const useSetup2fa = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = `/auth/2fa/setup/${user?._id ?? ''}`
  // actually, we can get rid of setup2fa service and just use apiService here, please make sure to update all the hooks inside security module to work this way and get rid of services
  const setup2fa = async () => await apiService.post<TwoFaData>(uri, {})
  const store = useSetup2faStore()

  return useQuery('get2fa', setup2fa, {
    onSuccess: data => store.set2faData(data.data)
  })
}
