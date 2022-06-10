import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useCancelOTCOrder = (orderId: string, orderType: string) => {
  const queryCache = useQueryCache()
  const { apiService, snackbarService } = useServices()
  const cancelOrder = async () => {
    return await apiService.post(trading.cancelOTCOrder(orderId), {})
  }

  return useMutation(cancelOrder, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        `You have cancelled the ${orderType.toLowerCase()} order`,
        'success'
      )
      void queryCache.invalidateQueries(tradingQueryKeys.getMyOpenOrdersList)
      void queryCache.invalidateQueries(tradingQueryKeys.pastOrders)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
