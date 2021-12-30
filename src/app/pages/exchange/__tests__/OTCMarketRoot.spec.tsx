import React from 'react'
import { render } from 'test-utils'
import { OTCMarketRoot } from '../OTCMarketRoot'

describe('OTCMarketRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<OTCMarketRoot />)
  })
})
