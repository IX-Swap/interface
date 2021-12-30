import React from 'react'
import { render } from 'test-utils'
import { OTCMarketRouter } from '../OTCMarketRouter'

describe('OTCMarketRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OTCMarketRouter />)
  })
})
