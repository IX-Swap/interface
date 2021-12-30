import { act } from '@testing-library/react-hooks'
import { useVirtualAccounts } from 'app/pages/authorizer/hooks/useVirtualAccounts'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('useVirtualAccounts', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data from api', async () => {
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateQueryResult({ data: [{ documents: virtualAccountsSample }] })
        )
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVirtualAccounts(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toBe(virtualAccountsSample)
        },
        { timeout: 1000 }
      )
    })
  })
})
