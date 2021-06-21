import { PairTableCell } from 'app/pages/exchange/components/PairTable/PairTableCell'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PairTableCell', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairTableCell />)
  })
})
