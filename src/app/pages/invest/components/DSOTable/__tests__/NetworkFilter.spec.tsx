import React from 'react'
import { render, cleanup } from 'test-utils'
import { NetworkFilter } from 'app/pages/invest/components/DSOTable/NetworkFilter'

describe('Network Filter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any error', () => {
    render(<NetworkFilter />)
  })
})
