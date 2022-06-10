import { BlockchainAddress } from 'app/pages/invest/components/BlockchainWallet/BlockchainAddress'
import { WalletModalContextWrapper } from 'components/WalletModal/WalletModalContextWrapper'
import React from 'react'
import { render } from 'test-utils'
import { BlockchainWallet } from '../BlockchainWallet/BlockchainWallet'
import * as useActiveWeb3React from 'hooks/blockchain/web3'
import * as useWithdrawalAddressAdded from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'

jest.mock(
  'app/pages/invest/components/BlockchainWallet/BlockchainAddress',
  () => ({
    BlockchainAddress: jest.fn(() => null)
  })
)

describe('BlockchainWallet', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should render connected wallet', () => {
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '12345',
      chainId: 137,
      active: true
    } as any)
    jest
      .spyOn(useWithdrawalAddressAdded, 'useWithdrawalAddressAdded')
      .mockReturnValueOnce({
        found: true,
        label: 'hello'
      } as any)
    render(
      <WalletModalContextWrapper>
        <BlockchainWallet />
      </WalletModalContextWrapper>
    )
    expect(BlockchainAddress).toBeCalledWith(
      expect.objectContaining({
        chainId: 137,
        account: '12345',
        labelName: 'hello'
      }),
      {}
    )
  })
  it('Should render add wallet', () => {
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '12345',
      chainId: 137,
      active: true
    } as any)
    jest
      .spyOn(useWithdrawalAddressAdded, 'useWithdrawalAddressAdded')
      .mockReturnValueOnce({
        found: false
      } as any)
    const { getByTestId } = render(
      <WalletModalContextWrapper>
        <BlockchainWallet />
      </WalletModalContextWrapper>
    )
    expect(getByTestId('add-wallet-button')).toBeDefined()
  })
  it('Should render connect wallet', () => {
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: undefined,
      active: false
    } as any)
    jest
      .spyOn(useWithdrawalAddressAdded, 'useWithdrawalAddressAdded')
      .mockReturnValueOnce({
        found: false
      } as any)
    const { getByTestId } = render(
      <WalletModalContextWrapper>
        <BlockchainWallet />
      </WalletModalContextWrapper>
    )
    expect(getByTestId('connect-wallet-button')).toBeDefined()
  })
})
