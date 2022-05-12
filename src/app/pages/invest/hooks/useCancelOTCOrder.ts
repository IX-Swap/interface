import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'

export const useCancelOTCOrder = (orderId: string) => {
  const { pairId } = useParams<{ pairId: string }>()
  const queryCache = useQueryCache()
  const { apiService, snackbarService } = useServices()
  const cancelOrder = async () => {
    return await apiService.post(trading.cancelOTCOrder(orderId), {})
  }

  return useMutation(cancelOrder, {
    onSuccess: async () => {
      snackbarService.showSnackbar('Order Cancelled', 'success')
      await queryCache.invalidateQueries(
        tradingQueryKeys.getMyOpenOrdersList(pairId)
      )
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
