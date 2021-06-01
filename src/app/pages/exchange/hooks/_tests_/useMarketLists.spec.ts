import { act } from '@testing-library/react-hooks'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'

describe('useMarketList', () => {
  const response = {
    data: [
      {
        documents: []
      }
    ]
  }

  afterEach(async () => {
    await cleanup()
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
          expect(result.current.data).toEqual(response.data[0].documents)
        },
        { timeout: 1000 }
      )
    })
  })
})
