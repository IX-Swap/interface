import { DSOOverview } from 'app/pages/invest/components/MakeCommitment/DSOOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

jest.mock(
  'app/pages/invest/components/DSOBlockChainDetails/DSOBlockchainDetails',
  () => ({
    DSOBlockchainDetails: jest.fn(() => null)
  })
)

describe('DSOOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOOverview dso={dso} />)
  })

  it('should match snapshot', () => {
    const { container } = render(<DSOOverview dso={dso} />)

    expect(container).toMatchSnapshot()
  })
})
