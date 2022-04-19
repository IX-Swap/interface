import { act } from '@testing-library/react-hooks'
import { useMarketList } from 'app/pages/invest/hooks/useMarketList'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

describe('useMarketList', () => {
  const response = generateInfiniteQueryResult({})

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(response)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(() => useMarketList(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(result.current.data).toEqual(response.data)
        },
        { timeout: 1000 }
      )
    })
  })
})
