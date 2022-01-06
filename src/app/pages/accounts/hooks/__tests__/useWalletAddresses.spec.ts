import { act } from '@testing-library/react-hooks'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'

describe('useWalletAddresses', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return correct data', async () => {
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce({ data: [{ documents: [] }] })
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useWalletAddresses(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual([])
        },
        { timeout: 1000 }
      )
    })
  })
})
