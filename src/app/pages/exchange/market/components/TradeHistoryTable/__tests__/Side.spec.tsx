import { Side } from 'app/pages/exchange/market/components/TradeHistoryTable/Side'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Side', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Side side='ASK' />)
  })

  it('renders SELL when side is BID', () => {
    const { getByText } = render(<Side side='BID' />)
    expect(getByText('SELL')).toBeTruthy()
  })

  it('renders BUY when side is ASK', () => {
    const { getByText } = render(<Side side='ASK' />)
    expect(getByText('BUY')).toBeTruthy()
  })
})
