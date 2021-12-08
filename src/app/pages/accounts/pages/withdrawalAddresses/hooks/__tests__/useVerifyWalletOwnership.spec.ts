import { act } from 'react-dom/test-utils'
import {
  apiServiceMock,
  invokeMutationFn,
  renderHookWithServiceProvider
} from 'test-utils'
import { blockchainNetworksURL } from 'config/apiURL'
import {
  useVerifyWalletOwnership,
  VerifyWalletOwnershipArgs
} from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useVerifyWalletOwnership'

describe('useVerifyWalletOwnership', () => {
  const payload: VerifyWalletOwnershipArgs = {
    walletAddress: '1234567890',
    signedHash: '0000000000'
  }

  it('should verify wallet ownership', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(useVerifyWalletOwnership)

      await invokeMutationFn(result, payload)
      expect(apiServiceMock.post).toBeCalledWith(
        blockchainNetworksURL.verifyWalletOwnership,
        payload
      )
    })
  })
})
