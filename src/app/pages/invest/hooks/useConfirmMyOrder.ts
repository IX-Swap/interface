import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useConfirmMyOrder = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const confirmMyOrder = async ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => {
    const url = trading.confirmMyOrder({ orderId, matchedOrderId })
    return await apiService.post(url, {})
  }

  return useMutation(confirmMyOrder, {
    onSuccess: async () => {
      void snackbarService.showSnackbar(
        'You have confirmed the token transfer',
        'success'
      )
      void queryCache.invalidateQueries(tradingQueryKeys.getMyOpenOrdersList)
      void queryCache.invalidateQueries(tradingQueryKeys.pastOrders)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
