import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useAllNetworks } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { networks } from '__fixtures__/network'

describe('useAllNetworks', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: networks })
      const apiService = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => useAllNetworks(), {
        apiService
      })

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith('/blockchain/networks')

          expect(result.current.data).toEqual(networks)
        },
        { timeout: 1000 }
      )
    })
  })
})
