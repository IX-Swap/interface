import { MakeCommitment } from 'app/pages/invest/components/MakeCommitment/MakeCommitment'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/invest/components/DSOBlockChainDetails/DSOBlockchainDetails',
  () => ({
    DSOBlockchainDetails: jest.fn(() => null)
  })
)

describe('MakeCommitment', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MakeCommitment />)
  })

  it('should match snapshot', () => {
    const { container } = render(<MakeCommitment />)

    expect(container).toMatchSnapshot()
  })
})
