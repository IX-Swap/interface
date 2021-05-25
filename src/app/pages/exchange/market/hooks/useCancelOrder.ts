import { exchange as exchangeApiUrls } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export interface CancelOrderArgs {
  pair: string
  side: 'BID' | 'ASK'
  type: string
  price: number
  amount: number
}

export const useCancelOrder = (orderId: string) => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()
  const { apiService, snackbarService } = useServices()
  const cancelOrder = async (args: CancelOrderArgs) => {
    return await apiService.post(
      exchangeApiUrls.cancelOrder(userId, orderId),
      args
    )
  }

  return useMutation(cancelOrder, {
    onSuccess: async () => {
      snackbarService.showSnackbar('Order Cancelled', 'success')
      void queryCache.invalidateQueries(exchangeQueryKeys.userOrders(userId))
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
