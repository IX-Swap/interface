import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useSetup2faStore } from '../context'
import { TwoFaData } from 'app/pages/security/pages/setup2fa/types'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authQueryKeys } from 'config/queryKeys'
import { authURL } from 'config/apiURL'

export const useSetup2fa = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = authURL.setup2fa(getIdFromObj(user))
  const setup2fa = async () => await apiService.post<TwoFaData>(uri, {})
  const store = useSetup2faStore()

  return useQuery(authQueryKeys.get2fa, setup2fa, {
    onSuccess: data => store.set2faData(data.data)
  })
}
