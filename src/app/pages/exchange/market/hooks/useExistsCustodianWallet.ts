import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { CustodyAccount } from 'types/custodyAccount'
import { custodyAccount } from 'config/apiURL'

interface props {
  userId: string
  onSuccess: ({ response }: { response: CustodyAccount }) => Promise<any>
}

export const useExistsCustodianWallet = ({ userId, onSuccess }: props) => {
  const { apiService, snackbarService } = useServices()
  const url = `${custodyAccount.get(userId)}`
  const checkExistsCustodianWallet = async () => {
    return await apiService.get<CustodyAccount>(url)
  }

  return useMutation(checkExistsCustodianWallet, {
    onSuccess: async (data: any) => {
      await onSuccess({ response: data?.data })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
