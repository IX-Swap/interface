import { SortByFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/SortByFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SortByFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SortByFilter filterValue='pair' label='pair' />)
  })
})
