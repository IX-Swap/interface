import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { usePromo } from 'app/pages/invest/hooks/usePromo'
import { mockPromoData } from '__fixtures__/promo'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('usePromo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest
        .fn()
        .mockResolvedValueOnce(generateQueryResult({ data: mockPromoData }))
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => usePromo(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('/issuance/promo')
          expect(result.current.data).toEqual(mockPromoData)
        },
        { timeout: 1000 }
      )
    })
  })
})
