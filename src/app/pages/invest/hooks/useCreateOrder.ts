import { PlaceOrderArgs } from 'app/pages/invest/types/form'
import { placeOrderURL } from 'config/apiURL'
import { balanceQueryKeys, exchangeMarketQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'

export const useCreateOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = placeOrderURL.create
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()

  const createOrder = async (args: PlaceOrderArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries([balanceQueryKeys.getByUserId(userId)])
      void queryCache.invalidateQueries(
        exchangeMarketQueryKeys.getOrdersList(userId, pairId)
      )
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
