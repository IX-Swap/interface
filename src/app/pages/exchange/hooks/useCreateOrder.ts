import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { placeOrderURL } from 'config/apiURL'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const useCreateOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = placeOrderURL.create
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const createOrder = async (args: PlaceOrderArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries([
        virtualAccountQueryKeys.getByUserId,
        { userId }
      ])
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
