import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useUpdateBank = () => {
  const { banksService } = useServices()
  const { push } = useBanksRouter()

  return useMutation(banksService.updateBank.bind(banksService), {
    onSuccess: () => push('list')
  })
}
