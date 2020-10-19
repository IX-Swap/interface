import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { WithdrawDSArgs } from 'v2/app/pages/accounts/types'
import { useAccountsRouter } from '../../../router'

export const useWithdrawDS = () => {
  const { push } = useAccountsRouter()
  const { user } = useAuth()
  const { apiService } = useServices()

  const withdrawDS = async (args: WithdrawDSArgs) => {
    const uri = `/accounts/security/withdrawals/${user?._id ?? ''}`

    return await apiService.post(uri, args)
  }

  return useMutation(withdrawDS, {
    onSuccess: () => push('landing')
  })
}
