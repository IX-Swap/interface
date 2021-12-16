import { act } from '@testing-library/react-hooks'
import * as useAllCorporates from 'app/pages/identity/hooks/useAllCorporates'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { useVCCFundStats } from 'app/pages/issuance/hooks/useVCCFundStats'

describe('useVCCFundStats', () => {
  beforeEach(() => {
    const objResponse = generateInfiniteQueryResult({ list: [corporate] })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it returns correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVCCFundStats(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data[0])
        },
        { timeout: 1000 }
      )
    })
  })
})
