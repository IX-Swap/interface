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
    amount: Number(values.amount),
    price: Number(values.price),
    ethAddress: account ?? '',
    orderType: values.side === 'BID' ? 'BUY' : 'SELL',
    pair: values.pair
  }
}

const validateOTCOrder = (values: CreateOTCOrderArgs) => {
  let message = ''
  if (!Number.isInteger(values.amount)) {
    message = 'Floating point amounts are not allowed'
  }
  if (values.amount <= 0 || values.price <= 0) {
    message = 'Amount and price must be greater than 0'
  }
  return message
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
      void snackbarService.showSnackbar(validationMessage, 'error')
    } else {
      return await apiService.post(uri, values)
    }
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries(tradingQueryKeys.getMyOpenOrdersList)
      void queryCache.invalidateQueries(tradingQueryKeys.pastOrders)
      void snackbarService.showSnackbar(data?.message ?? '', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
