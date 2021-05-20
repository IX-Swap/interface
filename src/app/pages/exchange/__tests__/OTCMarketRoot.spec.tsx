import React from 'react'
import { render, cleanup } from 'test-utils'
import { OTCMarketRoot } from '../OTCMarketRoot'

describe('OTCMarketRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<OTCMarketRoot />)
  })
})
