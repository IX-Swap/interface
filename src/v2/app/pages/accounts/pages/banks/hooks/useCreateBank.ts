import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const useCreateBank = () => {
  const { banksService } = useServices()
  const { push } = useBanksRouter()

  return useMutation(banksService.createBank.bind(banksService), {
    onSuccess: () => push('list')
  })
}
