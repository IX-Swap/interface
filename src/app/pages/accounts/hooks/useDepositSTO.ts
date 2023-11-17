import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

interface DepositSTOProps {
  from: string
  to: string
  amount: string
  assetId: string
  txHash: string
}

export const useDepositSTO = () => {
  const { apiService, snackbarService } = useServices()
  const url = accountsURL.securityToken.deposit

  const depositSTO = async (args: DepositSTOProps) => {
    return await apiService.post(url, args)
  }

  return useMutation(depositSTO, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
