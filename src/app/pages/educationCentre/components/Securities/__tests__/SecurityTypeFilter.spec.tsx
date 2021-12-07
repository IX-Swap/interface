import { SecurityTypeFilter } from 'app/pages/educationCentre/components/Securities/SecurityTypeFilter'
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
