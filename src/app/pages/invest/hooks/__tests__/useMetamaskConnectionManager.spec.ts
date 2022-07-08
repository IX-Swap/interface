import { renderHook } from '@testing-library/react-hooks'
import * as useWithdrawalAddressAdded from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import * as useMetamaskWalletState from 'app/pages/invest/hooks/useMetamaskWalletState'
import * as usePairTokenAddressNetwork from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import * as useActiveWeb3React from 'hooks/blockchain/web3'
import * as useSwitchChain from 'hooks/blockchain/useSwitchChain'

describe('useMetamaskConnectionManager', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should render hook', () => {
    const switchChain = jest.fn()
    jest
      .spyOn(usePairTokenAddressNetwork, 'usePairTokenAddressNetwork')
      .mockReturnValueOnce({
        chainId: 137
      } as any)

    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '1254'
    } as any)

    jest
      .spyOn(useWithdrawalAddressAdded, 'useWithdrawalAddressAdded')
      .mockImplementation((address?: string | null) => ({
        found: true,
        label: '1234565'
      }))
    jest
      .spyOn(useMetamaskWalletState, 'useMetamaskWalletState')
      .mockImplementation(() => ({
        accountState: useMetamaskWalletState.AccountState.SAME_CHAIN
      }))

    jest.spyOn(useSwitchChain, 'useSwitchChain').mockImplementation(() => ({
      switchChain: jest.fn()
    }))

    const { result } = renderHook(() => useMetamaskConnectionManager())
    expect(result.current).toEqual(
      expect.objectContaining({
        accountState: useMetamaskWalletState.AccountState.SAME_CHAIN,
        targetChainName: 'Polygon',
        isWhitelisted: {
          found: true,
          label: '1234565'
        }
      })
    )
  })
})
