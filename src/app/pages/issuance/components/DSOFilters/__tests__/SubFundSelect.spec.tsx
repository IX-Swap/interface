import { SubFundSelect } from 'app/pages/issuance/components/DSOFilters/SubFundSelect'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SubFundSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SubFundSelect />)
  })
})
