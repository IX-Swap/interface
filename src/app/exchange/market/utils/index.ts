import { PlaceOrderFormValues } from 'app/exchange/market/types/form'

export const transformPlaceOrderFormValuesToArgs = (
  values: PlaceOrderFormValues
) => {
  return {
    pair: '604a2bd7b1e4912eaeede39d',
    side: 'BID',
    type: values.type,
    price: values.price,
    amount: values.amount
  }
}
