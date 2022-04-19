import { MyOrders } from 'app/pages/invest/components/MyOrders/MyOrders'
import React from 'react'
import { render, fireEvent } from 'test-utils'
import { OpenOrders } from 'app/pages/invest/components/OpenOrders/OpenOrders'
import { PastOrderTable } from 'app/pages/invest/components/PastOrderTable/PastOrderTable'
import { MyTrades } from 'app/pages/invest/components/Trades/MyTrades'

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
    jest.clearAllMocks()
  })

  it('renders correct tab when showMyTrades is true', () => {
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

  it('renders correct tab when showMyTrades is not defined', () => {
    const { getByRole, queryByRole } = render(<MyOrders />)
    const openOrdersTabButton = getByRole('tab', {
      name: 'Open Orders'
    }) as HTMLButtonElement
    const pastOrdersTabButton = getByRole('tab', {
      name: 'Past Orders'
    }) as HTMLButtonElement
    const myTradesTabButton = queryByRole('tab', {
      name: 'My Trades'
    })

    fireEvent.click(openOrdersTabButton, { bubbles: true, cancellable: true })
    expect(OpenOrders).toHaveBeenCalled()

    fireEvent.click(pastOrdersTabButton, { bubbles: true, cancellable: true })
    expect(PastOrderTable).toHaveBeenCalled()

    expect(myTradesTabButton).not.toBeInTheDocument()
  })
})
