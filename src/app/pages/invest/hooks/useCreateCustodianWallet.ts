import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { custodyAccount } from 'config/apiURL'
import { CustodyAccount } from 'types/custodyAccount'
interface props {
  userId: string
  onSuccess: () => void
  onError: () => void
}
export const useCreateCustodianWallet = ({
  userId,
  onSuccess,
  onError
}: props) => {
  const { apiService, snackbarService } = useServices()
  const url = `${custodyAccount.create}`
  const createCustodianWallet = async (args: any) => {
    return await apiService.post<CustodyAccount>(url, {
      userId
    })
  }

  return useMutation(createCustodianWallet, {
    onSuccess: data => {
      onSuccess()
      void snackbarService.showSnackbar(
        'You have been assigned with the blockchain address',
        'success'
      )
    },
    onError: (error: any) => {
      onError()
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
