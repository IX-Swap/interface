import React from 'react'
import { render, cleanup } from 'test-utils'
import { PairTableFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter'

describe('PairTableFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairTableFilter />)
  })
})
