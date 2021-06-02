import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { custodyAccount } from 'config/apiURL'
import { CustodyAccount } from 'types/custodyAccount'
interface props {
  userId: string
  callback: () => void
}
export const useCreateCustodianWallet = ({ userId, callback }: props) => {
  const { apiService, snackbarService } = useServices()
  const url = `${custodyAccount.create}`
  const createCustodianWallet = async (args: any) => {
    return await apiService.post<CustodyAccount>(url, {
      userId
    })
  }

  return useMutation(createCustodianWallet, {
    onSuccess: data => {
      callback()
      void snackbarService.showSnackbar(
        'You have been assigned with the withdrawal address',
        'success'
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
