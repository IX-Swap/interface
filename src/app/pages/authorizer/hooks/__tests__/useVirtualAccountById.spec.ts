import { act } from '@testing-library/react-hooks'
import { useVirtualAccountById } from 'app/pages/authorizer/hooks/useVirtualAccountById'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccount } from '__fixtures__/virtualAccount'

describe('useVirtualAccountById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data from api', async () => {
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(generateQueryResult({ data: virtualAccount }))
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVirtualAccountById(virtualAccount._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(virtualAccount)
        },
        { timeout: 1000 }
      )
    })
  })
})
