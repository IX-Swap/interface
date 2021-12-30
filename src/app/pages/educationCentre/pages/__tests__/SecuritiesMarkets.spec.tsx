import { SecuritiesMarkets } from 'app/pages/educationCentre/pages/SecurtiesMarkets'
import React from 'react'
import { render } from 'test-utils'

describe('SecuritiesMarkets', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SecuritiesMarkets />)
  })
})
