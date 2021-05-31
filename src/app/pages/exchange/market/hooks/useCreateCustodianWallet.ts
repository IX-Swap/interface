import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export const useCreateCustodianWallet = () => {
  const { snackbarService } = useServices()
  const createCustodianWallet = async (args: any) => {
    return await new Promise((resolve, reject) => resolve({}))
  }

  return useMutation(createCustodianWallet, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
