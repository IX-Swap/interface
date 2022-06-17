import { order1, order4, orders, sortedOrders } from '__fixtures__/otcOrders'
import {
  needsConfirmation,
  renderOpenOrderPercentage,
  sortOpenOrders
} from '../helpers'
import * as helpers from 'helpers/numbers'

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

describe('renderOpenOrderPercentage', () => {
  it('renders open order percentage correctly', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order1)).toEqual('5%')
  })
})
