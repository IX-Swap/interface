import { exchange as exchangeApiUrls } from 'config/apiURL'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'

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
  const { pairId } = useParams<{ pairId: string }>()
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
      await queryCache.invalidateQueries(
        exchangeMarketQueryKeys.getOrdersList(userId, pairId)
      )
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
