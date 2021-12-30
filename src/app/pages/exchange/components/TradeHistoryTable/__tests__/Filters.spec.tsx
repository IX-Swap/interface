import { Filters } from 'app/pages/exchange/components/TradeHistoryTable/Filter'
import React from 'react'
import { render } from 'test-utils'

describe('Filters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Filters />)
  })
})
