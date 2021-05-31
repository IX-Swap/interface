import React from 'react'
import { render, cleanup } from 'test-utils'
import { PastOrderFilter } from 'app/pages/exchange/market/components/PastOrderFilter/PastOrderFilter'

describe('PastOrderFilter', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    render(<PastOrderFilter />)
  })
})
