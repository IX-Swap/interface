import { SecuritiesMarketsRouter } from 'app/pages/educationCentre/router/SecuritiesMarketsRouter'
import React from 'react'
import { render } from 'test-utils'

describe('SecuritiesMarketsRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SecuritiesMarketsRouter />)
  })
})
