import { PlaceOrderFormValues } from 'app/pages/exchange/types/form'

export const transformPlaceOrderFormValuesToArgs = (
  values: PlaceOrderFormValues,
  side: 'BID' | 'ASK'
) => {
  return {
    pair: '60a2340a804b8f3de6248b56',
    side: side,
    type: 'LIMIT',
    price: values.price,
    amount: values.amount
  }
}
