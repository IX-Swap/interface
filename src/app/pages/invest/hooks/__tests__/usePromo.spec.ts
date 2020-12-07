import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { usePromo } from 'app/pages/invest/hooks/usePromo'
import { promoResponse, mockPromoData } from '__fixtures__/promo'

describe('usePromo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(promoResponse)
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => usePromo(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('/issuance/promo')
          expect(result.current).toEqual(mockPromoData)
        },
        { timeout: 1000 }
      )
    })
  })
})
