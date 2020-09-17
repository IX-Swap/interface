import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useWithdrawDS = () => {
  const { push } = useBanksRouter()
  const { banksService } = useServices()

  return useMutation(banksService.withdrawDS.bind(banksService), {
    onSuccess: () => push('list')
  })
}
