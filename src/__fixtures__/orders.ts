import { Order, OrderSide } from 'types/order'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'

export const orders: Order[] = [
  {
    _id: '609d1d93c54af74af46c027c',
    average: 8,
    date: '2020-09-29T12:45:07.411Z',
    pair: 'BTC/ETH',
    type: 'LIMIT',
    side: OrderSide.BID,
    price: 8500,
    amount: 50,
    total: 46500,
    filled: 0,
    status: 'CANCELLED'
  },
  {
    _id: '609d1d93c54af74af46c128c',
    average: 10,
    date: '2020-08-29T12:45:07.411Z',
    pair: 'USD/SGD',
    type: 'LIMIT',
    side: OrderSide.ASK,
    price: 9500,
    amount: 40,
    total: 47500,
    filled: 0,
    status: 'FILLED'
  }
]

export const createOrderArgument: PlaceOrderArgs = {
  pair: '12',
  side: OrderSide.ASK,
  type: 'LIMIT',
  price: 33,
  amount: 230
}
