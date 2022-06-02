import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { CreateOTCOrderArgs } from 'types/otcOrder'
import { validateOTCOrder } from 'app/pages/invest/validation'

export const orderPayloadtoOTCAdapt = ({
  values,
  account
}: {
  values: PlaceOrderArgs
  account?: string | null
}): CreateOTCOrderArgs => {
  return {
    amount: Number(values.amount),
    price: Number(values.price),
    ethAddress: account ?? '',
    orderType: values.side === 'BID' ? 'BUY' : 'SELL',
    pair: values.pair
  }
}

export const useCreateOTCOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = trading.createOrder
  const queryCache = useQueryCache()

  const createOrder = async ({
    args,
    account
  }: {
    args: PlaceOrderArgs
    account?: string | null
  }) => {
    const values = orderPayloadtoOTCAdapt({ values: args, account })
    const validationMessage = validateOTCOrder(values)
    if (validationMessage.length > 0) {
      throw new Error(validationMessage)
    } else {
      return await apiService.post(uri, values)
    }
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries(tradingQueryKeys.getMyOpenOrdersList)
      void queryCache.invalidateQueries(tradingQueryKeys.pastOrders)
      void snackbarService.showSnackbar(
        'Order Placed. Wait for Authoriser’s approval',
        'success'
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
