import { PlaceOrderFormValues } from 'app/pages/exchange/types/form'
import { OrderSide } from 'types/order'
import { Pair } from '../hooks/useMarketList'

export const transformPlaceOrderFormValuesToArgs = (
  values: PlaceOrderFormValues,
  side: OrderSide,
  pairId: string
) => {
  return {
    pair: pairId,
    side: side,
    type: 'LIMIT',
    price: values.price,
    amount: values.amount
  }
}

export const isPairIdFalsy = (pairId: string) =>
  pairId === null || pairId === undefined || pairId === ':pairId'

export const isMarketDataFalsy = (data: any) =>
  data === undefined || data.list.length < 1

export const findSymbolById = (id: string, pairs: Pair[]): string => {
  const selectedPair = pairs.find((pair: Pair) => pair._id === id)
  return selectedPair?.name ?? ''
}
