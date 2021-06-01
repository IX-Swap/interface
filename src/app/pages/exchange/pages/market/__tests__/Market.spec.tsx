import React from 'react'
import { render, cleanup } from 'test-utils'
import { Market } from '../Market'

jest.mock('app/pages/exchange/market/MarketRoot', () => ({
  MarketRoot: jest.fn(() => null)
}))

describe('Market', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Market />)
  })
})
