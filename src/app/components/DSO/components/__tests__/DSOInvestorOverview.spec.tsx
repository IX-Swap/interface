import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('DSOInvestorOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOInvestorOverview dso={dso} />)
  })

  it('should match snapshot', () => {
    const { container } = render(<DSOInvestorOverview dso={dso} />)

    expect(container).toMatchSnapshot()
  })
})
