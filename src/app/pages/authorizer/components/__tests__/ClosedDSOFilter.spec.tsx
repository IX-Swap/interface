import { ClosedDSOsFilter } from 'app/pages/authorizer/components/ClosedDSOFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ClosedDSOFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ClosedDSOsFilter />)
  })
})
