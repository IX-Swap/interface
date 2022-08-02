import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

jest.mock(
  'app/pages/invest/components/DSOBlockChainDetails/DSOBlockchainDetails',
  () => ({
    DSOBlockchainDetails: jest.fn(() => null)
  })
)

describe('DSOInvestorView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOInvestorView dso={dso} />)
  })

  it('matches snapshot', () => {
    const { container } = render(<DSOInvestorView dso={dso} />)
    expect(container).toMatchSnapshot()
  })
})
