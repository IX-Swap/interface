import { DSOFilters } from 'app/pages/issuance/components/DSOFilters/DSOFilters'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/pages/issuance/components/DSOFilters/StatusFilter', () => ({
  StatusFilter: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/DSOFilters/SubFundSelect', () => ({
  SubFundSelect: jest.fn(() => null)
}))

describe('DSOFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DSOFilters />)
  })
})
