import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useConfirmMatchOrder = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const confirmMatchOrder = async (id: string) => {
    const url = trading.confirmOTCOrder(id)
    return await apiService.post(url, {})
  }

  return useMutation(confirmMatchOrder, {
    onSuccess: async () => {
      void snackbarService.showSnackbar('Match confirmed', 'success')
      await queryCache.invalidateQueries(tradingQueryKeys.getMatchedOrders)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
