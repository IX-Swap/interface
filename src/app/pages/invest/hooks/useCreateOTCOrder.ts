import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { CreateOTCOrderArgs } from 'types/otcOrder'

export const orderPayloadtoOTCAdapt = ({
  values,
  account
}: {
  values: PlaceOrderArgs
  account?: string | null
}): CreateOTCOrderArgs => {
  return {
    amount: values.amount,
    price: values.price,
    ethAddress: account ?? '',
    orderType: values.side === 'BID' ? 'BUY' : 'SELL',
    pair: values.pair
  }
}

export const useCreateOTCOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = trading.createOrder
  const queryCache = useQueryCache()

  const createOrder = async (args: CreateOTCOrderArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries(tradingQueryKeys.getMyOpenOrdersList)
      void queryCache.invalidateQueries(tradingQueryKeys.pastOrders)
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
