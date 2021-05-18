import { Trades } from 'app/pages/invest/components/Trades/Trades'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Trades', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Trades />)
  })
})
