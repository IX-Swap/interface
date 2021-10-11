import { SecuritiesMarketsRouter } from 'app/pages/home/router/SecuritiesMarketsRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecuritiesMarketsRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecuritiesMarketsRouter />)
  })
})
