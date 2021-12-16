import { Dashboard } from 'app/pages/issuance/pages/Dashboard'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('app/pages/issuance/components/DSOFilters/DSOFilters', () => ({
  DSOFilters: jest.fn(() => null)
}))

describe('Dashboard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<Dashboard />)
    expect(container).toMatchSnapshot()
  })
})
