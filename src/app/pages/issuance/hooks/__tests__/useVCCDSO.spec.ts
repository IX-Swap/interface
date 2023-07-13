import { act } from '@testing-library/react-hooks'
import * as useAllCorporates from 'app/pages/identity/hooks/useAllCorporates'
import { useVCCDSO } from 'app/pages/issuance/hooks/useVCCDSO'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'

describe('useVCCDSO', () => {
  beforeEach(() => {
    history.push('/?status=Closed')
    const objResponse = generateInfiniteQueryResult({ list: [corporate] })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it returns correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(() => useVCCDSO(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
        },
        { timeout: 1000 }
      )
    })
  })
})