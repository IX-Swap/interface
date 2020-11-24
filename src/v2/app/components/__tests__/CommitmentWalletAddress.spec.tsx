import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentWalletAddress,
  CommitmentWalletAddressProps
} from 'v2/app/components/CommitmentWalletAddress'
import { WalletAddress } from 'v2/app/components/WalletAddress'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

jest.mock('v2/app/components/WalletAddress', () => ({
  WalletAddress: jest.fn(() => null)
}))

describe('CommitmentWalletAddress', () => {
  const props: CommitmentWalletAddressProps = {
    address: withdrawalAddress.address
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentWalletAddress {...props} />)
  })

  it('renders WalletAddress with correct props', () => {
    render(<CommitmentWalletAddress {...props} />)

    expect(WalletAddress).toHaveBeenCalledTimes(1)
    expect(WalletAddress).toHaveBeenCalledWith(
      {
        address: props.address,
        link: true
      },
      {}
    )
  })

  it('renders error message if wallet address is undefined', () => {
    const { container } = render(<CommitmentWalletAddress />)

    expect(WalletAddress).not.toHaveBeenCalled()
    expect(container).toHaveTextContent('Not provided by a Investor')
  })
})
