import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useRejectMatchOrder = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const rejectMatchOrder = async ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => {
    const url = trading.rejectOTCOrder({ orderId, matchedOrderId })
    return await apiService.put(url, {})
  }

  return useMutation(rejectMatchOrder, {
    onSuccess: async () => {
      snackbarService.showSnackbar('Match rejected', 'success')
      await queryCache.invalidateQueries(tradingQueryKeys.getMatchedOrders)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
