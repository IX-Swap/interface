import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PairListDropdown', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairListDropdown pairName='IXPS/SGD' />)
  })
})
