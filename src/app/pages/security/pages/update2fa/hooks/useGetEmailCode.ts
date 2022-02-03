import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authQueryKeys } from 'config/queryKeys'
import { authURL } from 'config/apiURL'
import { GetEmailCodeResponse } from 'app/pages/security/types'

export const useGetEmailCode = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const uri = authURL.getEmailCode(getIdFromObj(user))

  const getEmailCode = async () =>
    await apiService.get<GetEmailCodeResponse>(uri)

  const { data, ...rest } = useQuery(authQueryKeys.getEmailCode, getEmailCode, {
    enabled: false,
    onError: (error: string) => {
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })

  return {
    ...rest,
    data: data?.data
  }
}
