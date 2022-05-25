import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useConfirmMyOrder = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const confirmMatchOrder = async ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => {
    const url = trading.confirmMyOrder({ orderId, matchedOrderId })
    return await apiService.post(url, {})
  }

  return useMutation(confirmMatchOrder, {
    onSuccess: async () => {
      void snackbarService.showSnackbar('Confirmed', 'success')
      await queryCache.invalidateQueries(tradingQueryKeys.getMatchedOrders)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
