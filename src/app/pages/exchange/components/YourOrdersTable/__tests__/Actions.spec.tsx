import { Actions } from 'app/pages/exchange/components/YourOrdersTable/Actions'
import { Order } from 'app/pages/exchange/components/YourOrdersTable/YourOrderstable'
import React from 'react'
import { render } from 'test-utils'

describe('Actions', () => {
  const order: Order = {
    _id: '60a61141488ee046bbfe7824',
    type: 'LIMIT',
    side: 'BID',
    price: 200,
    amount: 15,
    date: '2021-05-20T07:35:29.110Z',
    pair: 'EUR/SGD',
    total: 3000,
    filled: 0,
    average: null,
    status: 'Open'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Cancel button when status is not Cancelled', () => {
    const { getByText } = render(<Actions item={order} />)
    expect(getByText('CANCEL')).toBeTruthy()
  })

  it('renders Cancelled text when status is not Cancelled', () => {
    const { getByText } = render(
      <Actions item={{ ...order, status: 'Cancelled' }} />
    )
    expect(getByText('CANCELLED')).toBeTruthy()
  })
})
