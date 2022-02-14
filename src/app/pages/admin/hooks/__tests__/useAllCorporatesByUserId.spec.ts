import { act } from '@testing-library/react-hooks'
import { useAllCorporatesByUserId } from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import * as useParsedDataHook from 'hooks/useParsedData'

describe('useAllCorporatesByUserId', () => {
  const userId = user._id
  const mockData = { list: [corporate] }
  const apiFn = jest
    .fn()
    .mockResolvedValueOnce(generateInfiniteQueryResult(mockData))
  const apiObj = { post: apiFn }

  beforeEach(() => {
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(() => mockData as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useAllCorporatesByUserId({ userId, type: 'investor' }),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(mockData)
        },
        { timeout: 1000 }
      )
    })
  })
})
