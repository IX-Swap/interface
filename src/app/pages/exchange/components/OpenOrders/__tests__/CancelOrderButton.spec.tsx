import React from 'react'
import { render, cleanup, fireEvent } from 'test-utils'
import { CancelOrderButton } from 'app/pages/exchange/components/OpenOrders/CancelOrderButton'
import { orders } from '__fixtures__/orders'
import * as useCancelOrder from 'app/pages/exchange/hooks/useCancelOrder'

describe('CancelOrderButton', () => {
  const mutateFn = jest.fn()
  const order = orders[0]
  beforeEach(() => {
    const objResponse = [mutateFn, { status: '' }]

    jest
      .spyOn(useCancelOrder, 'useCancelOrder')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CancelOrderButton order={orders[0]} />)
  })

  it('calls mutate function correctly', () => {
    const { getByRole } = render(<CancelOrderButton order={order} />)
    const cancelButton = getByRole('button', {
      name: 'Cancel'
    }) as HTMLButtonElement

    fireEvent.click(cancelButton, { bubbles: true, cancellable: true })
    expect(mutateFn).toHaveBeenCalledWith({
      pair: order.pair,
      side: order.side,
      type: order.type,
      price: order.price,
      amount: order.amount
    })
  })
})
