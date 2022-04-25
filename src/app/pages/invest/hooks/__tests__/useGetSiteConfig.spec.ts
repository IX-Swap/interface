import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { useGetSiteConfig } from 'app/pages/invest/hooks/useGetSiteConfig'

describe('useGetSiteConfig', () => {
  const response = generateQueryResult({})

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(response)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useGetSiteConfig(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(response.data)
        },
        { timeout: 1000 }
      )
    })
  })
})
