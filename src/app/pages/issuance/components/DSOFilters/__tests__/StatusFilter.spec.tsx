import React from 'react'
import { render, cleanup } from 'test-utils'
import { StatusFilter } from 'app/pages/issuance/components/DSOFilters/StatusFilter'

describe('StatusFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<StatusFilter />)
  })
})
