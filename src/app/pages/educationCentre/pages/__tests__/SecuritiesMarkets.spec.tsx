import { SecuritiesMarkets } from 'app/pages/educationCentre/pages/SecurtiesMarkets'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecuritiesMarkets', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecuritiesMarkets />)
  })
})
