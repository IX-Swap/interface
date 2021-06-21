import { FilterToggles } from 'app/pages/exchange/components/PairTable/PairTableFilter/FilterToggles'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FilterToggles', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FilterToggles />)
  })
})
