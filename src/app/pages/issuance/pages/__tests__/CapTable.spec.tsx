import { CapTable } from 'app/pages/issuance/pages/CapTable'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/pages/issuance/components/CapTable/CapTablePageHeader', () => ({
  CapTablePageHeader: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/Investors', () => ({
  Investors: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/Insights', () => ({
  Insights: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/TopInsights', () => ({
  TopInsights: jest.fn(() => null)
}))

describe('CapTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CapTable />)
  })
})
