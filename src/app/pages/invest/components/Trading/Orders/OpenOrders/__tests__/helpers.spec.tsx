import {
  order1,
  order2,
  order3Buy,
  order4,
  orders,
  sortedOrders
} from '__fixtures__/otcOrders'
import {
  needsConfirmation,
  renderOpenOrderPercentage,
  showCancelButton,
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
  it('renders open order percentage correctly for sell order', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order1)).toEqual('5%')
  })
  it('renders open order percentage correctly for buy order', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order2)).toEqual('5%')
  })
  it('renders 0 for buy order without pending or completed matches', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order3Buy)).toEqual('0')
  })
})

describe('showCancelButton', () => {
  it('checks if a order needs confirmation correctly', () => {
    expect(showCancelButton({ item: order4 })).toEqual(true)
    expect(showCancelButton({ item: order2 })).toEqual(false)
  })
})
