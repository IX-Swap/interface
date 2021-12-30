import { OrderActions } from 'app/pages/exchange/components/OpenOrders/OrderActions'
import React from 'react'
import { render } from 'test-utils'
import { orders } from '__fixtures__/orders'

jest.mock('app/pages/exchange/components/OpenOrders/CancelOrderButton', () => ({
  CancelOrderButton: jest.fn(() => null)
}))

describe('OrderActions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OrderActions item={orders[0]} />)
  })
})
