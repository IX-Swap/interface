import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useAccountsRouter } from '../../../router'

export const useWithdrawDS = () => {
  const { push } = useAccountsRouter()
  const { banksService } = useServices()

  return useMutation(banksService.withdrawDS.bind(banksService), {
    onSuccess: () => push('landing')
  })
}
