import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useWithdrawCash = () => {
  const { push } = useBanksRouter()
  const { banksService } = useServices()

  return useMutation(banksService.withdrawCash.bind(banksService), {
    onSuccess: () => push('list')
  })
}
