import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { TwoFaData } from 'app/pages/security/types'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authQueryKeys } from 'config/queryKeys'
import { authURL } from 'config/apiURL'

export const useSetup2fa = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = authURL.setup2fa(getIdFromObj(user))
  const setup2fa = async () => await apiService.post<TwoFaData>(uri, {})

  const { data, ...rest } = useQuery(authQueryKeys.get2fa, setup2fa)

  return {
    ...rest,
    data: data?.data
  }
}
