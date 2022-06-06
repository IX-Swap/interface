import { order4, orders, sortedOrders } from '__fixtures__/otcOrders'
import { needsConfirmation, sortOpenOrders } from '../helpers'

describe('sortOpenOrders', () => {
  it('sorts confirmed sell orders on top', () => {
    expect(orders.sort(sortOpenOrders)).toEqual(sortedOrders)
  })
})

describe('needsConfirmation', () => {
  it('checks if a order needs confirmation correctly', () => {
    expect(needsConfirmation(order4)).toEqual(true)
  })
})
