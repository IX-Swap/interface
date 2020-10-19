import { useAuth } from 'v2/hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { DepositCashArgs } from 'v2/app/pages/accounts/types'

export const useDepositCash = () => {
  const { user } = useAuth()
  const { push } = useAccountsRouter()
  const { apiService } = useServices()

  const depositCash = async (args: DepositCashArgs) => {
    const uri = `/accounts/cash/deposits/${user?._id ?? ''}`
    return await apiService.post(uri, args)
  }

  return useMutation(depositCash, {
    onSuccess: () => push('landing')
  })
}
