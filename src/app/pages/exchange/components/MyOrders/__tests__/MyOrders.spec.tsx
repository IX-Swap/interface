import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import React from 'react'
import { render, cleanup, fireEvent } from 'test-utils'
import { OpenOrders } from 'app/pages/exchange/components/OpenOrders/OpenOrders'
import { PastOrderTable } from 'app/pages/exchange/components/PastOrderTable/PastOrderTable'
import { MyTrades } from 'app/pages/exchange/components/Trades/MyTrades'

jest.mock('app/pages/exchange/components/OpenOrders/OpenOrders', () => ({
  OpenOrders: jest.fn(() => null)
}))

jest.mock(
  'app/pages/exchange/components/PastOrderTable/PastOrderTable',
  () => ({
    PastOrderTable: jest.fn(() => null)
  })
)

jest.mock('app/pages/exchange/components/Trades/MyTrades', () => ({
  MyTrades: jest.fn(() => null)
}))

describe('MyOrders', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MyOrders showMyTrades />)
  })

  it('renders correct tab', () => {
    const { getByRole } = render(<MyOrders showMyTrades />)
    const openOrdersTabButton = getByRole('tab', {
      name: 'Open Orders'
    }) as HTMLButtonElement
    const pastOrdersTabButton = getByRole('tab', {
      name: 'Past Orders'
    }) as HTMLButtonElement
    const myTradesTabButton = getByRole('tab', {
      name: 'My Trades'
    }) as HTMLButtonElement

    fireEvent.click(openOrdersTabButton, { bubbles: true, cancellable: true })
    expect(OpenOrders).toHaveBeenCalled()

    fireEvent.click(pastOrdersTabButton, { bubbles: true, cancellable: true })
    expect(PastOrderTable).toHaveBeenCalled()

    fireEvent.click(myTradesTabButton, { bubbles: true, cancellable: true })
    expect(MyTrades).toHaveBeenCalled()
  })
})
