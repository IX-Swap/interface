import { act } from '@testing-library/react-hooks'
import { useIdentityStats } from 'app/pages/admin/hooks/useIdentityStats'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useIdentityStats', () => {
  const data = {
    identity: {
      total: 178,
      totalLastWeek: 1
    },
    userWithoutIdentity: {
      total: 65,
      totalLastWeek: 1
    },
    user: {
      total: 149,
      totalLastWeek: 2
    }
  }
  const useIdentityStatsResponse = generateQueryResult({
    data,
    isLoading: false
  })

  const apiFn = jest.fn().mockResolvedValueOnce(useIdentityStatsResponse)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useIdentityStats(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(apiFn).toHaveBeenCalled()
          expect(result.current.data).toEqual(data)
        },
        { timeout: 1000 }
      )
    })
  })
})
