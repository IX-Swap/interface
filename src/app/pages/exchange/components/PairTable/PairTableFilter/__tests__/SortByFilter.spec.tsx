import { SortByFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/SortByFilter'
import React from 'react'
import { render } from 'test-utils'

describe('SortByFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SortByFilter filterValue='pair' label='pair' />)
  })
})
