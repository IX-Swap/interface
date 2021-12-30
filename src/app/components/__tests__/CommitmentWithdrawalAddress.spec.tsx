import React from 'react'
import { render } from 'test-utils'
import {
  CommitmentWithdrawalAddress,
  CommitmentWithdrawalAddressProps
} from 'app/components/CommitmentWithdrawalAddress'
import { WalletAddress } from 'app/components/WalletAddress'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

jest.mock('app/components/WalletAddress', () => ({
  WalletAddress: jest.fn(() => null)
}))

describe('CommitmentWalletAddress', () => {
  const props: CommitmentWithdrawalAddressProps = {
    address: withdrawalAddress.address
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders WalletAddress with correct props', () => {
    render(<CommitmentWithdrawalAddress {...props} />)

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
    const { container } = render(<CommitmentWithdrawalAddress />)

    expect(WalletAddress).not.toHaveBeenCalled()
    expect(container).toHaveTextContent('Not provided by the Investor')
  })
})
