import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useConfirmMatchOrder = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const confirmMatchOrder = async ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => {
    const url = trading.confirmOTCOrder({ orderId, matchedOrderId })
    return await apiService.post(url, {})
  }

  return useMutation(confirmMatchOrder, {
    onSuccess: async () => {
      snackbarService.showSnackbar('Match confirmed', 'success')
      await queryCache.invalidateQueries(tradingQueryKeys.getMatchedOrders)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
