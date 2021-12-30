import React from 'react'
import { render } from 'test-utils'
import { PairTableFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter'

describe('PairTableFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PairTableFilter />)
  })
})
