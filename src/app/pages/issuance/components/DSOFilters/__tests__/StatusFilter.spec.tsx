import React from 'react'
import { render } from 'test-utils'
import { StatusFilter } from 'app/pages/issuance/components/DSOFilters/StatusFilter'

describe('StatusFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<StatusFilter />)
  })
})
