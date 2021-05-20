import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { placeOrderURL } from 'config/apiURL'
import { PlaceOrderArgs } from 'app/pages/exchange/market/types/form'

export const useCreateOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = placeOrderURL.create

  const createOrder = async (args: PlaceOrderArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
