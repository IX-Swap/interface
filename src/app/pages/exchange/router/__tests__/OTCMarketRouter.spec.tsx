import React from 'react'
import { render, cleanup } from 'test-utils'
import { OTCMarketRouter } from '../OTCMarketRouter'

describe('OTCMarketRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OTCMarketRouter />)
  })
})
