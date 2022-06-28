import React from 'react'
import { render } from 'test-utils'
import { fakeOTCMatch1, order1 } from '__fixtures__/otcOrders'
import { getColumnMatchedOrder } from '../helpers'
import { ConfirmOTCOrderActions, OTCOrderActions } from '../OTCOrderActions'

describe('OTC order actions', () => {
  it('renders actions correctly', () => {
    const { container } = render(<OTCOrderActions item={order1} />)
    expect(container).toMatchSnapshot()
  })
})

describe('OTC Confirm order actions', () => {
  it('renders confirm actions correctly', () => {
    const { container } = render(
      <ConfirmOTCOrderActions
        item={getColumnMatchedOrder(order1, fakeOTCMatch1)}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
