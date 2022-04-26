import { Side } from 'app/pages/accounts/components/TradeHistoryTable/Side'
import React from 'react'
import { render } from 'test-utils'
import { OrderSide } from 'types/order'

describe('Side', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Buy when side is BID', () => {
    const { getByText } = render(<Side side={OrderSide.BID} />)
    expect(getByText('Buy')).toBeTruthy()
  })

  it('renders Sell when side is ASK', () => {
    const { getByText } = render(<Side side={OrderSide.ASK} />)
    expect(getByText('Sell')).toBeTruthy()
  })
})
