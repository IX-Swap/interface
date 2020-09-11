import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useDepositCash = () => {
  const { push } = useBanksRouter()
  const { banksService } = useServices()

  return useMutation(banksService.depositCash.bind(banksService), {
    onSuccess: () => push('list')
  })
}
