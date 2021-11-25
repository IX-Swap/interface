import { act } from 'react-dom/test-utils'
import {
  apiServiceMock,
  invokeMutationFn,
  renderHookWithServiceProvider
} from 'test-utils'
import {
  GenerateWalletHashArgs,
  useGenerateWalletHash
} from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useGenerateWalletHash'
import { blockchainNetworksURL } from 'config/apiURL'

describe('useGenerateWalletHash', () => {
  const payload: GenerateWalletHashArgs = { walletAddress: '1234567890' }

  it('should generate wallet hash', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(() =>
        useGenerateWalletHash()
      )

      await invokeMutationFn(result, payload)
      expect(apiServiceMock.post).toBeCalledWith(
        blockchainNetworksURL.generateWalletHash,
        payload
      )
    })
  })
})
