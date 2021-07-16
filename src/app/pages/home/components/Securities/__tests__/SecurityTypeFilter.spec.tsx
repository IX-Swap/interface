import { SecurityTypeFilter } from 'app/pages/home/components/Securities/SecurityTypeFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecurityTypeFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecurityTypeFilter />)
  })
})
