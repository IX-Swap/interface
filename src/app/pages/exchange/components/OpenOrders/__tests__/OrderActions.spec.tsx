import { OrderActions } from 'app/pages/exchange/components/OpenOrders/OrderActions'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { orders } from '__fixtures__/orders'

jest.mock('app/pages/exchange/components/OpenOrders/CancelOrderButton', () => ({
  CancelOrderButton: jest.fn(() => null)
}))

describe('OrderActions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OrderActions item={orders[0]} />)
  })
})
