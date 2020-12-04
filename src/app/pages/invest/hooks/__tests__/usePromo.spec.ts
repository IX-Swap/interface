import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { usePromo } from 'app/pages/invest/hooks/usePromo'
import { successfulResponse } from '__fixtures__/api'

describe('usePromo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns response from api correctly', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => usePromo(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledTimes(1)
          expect(getFn).toHaveBeenCalledWith('/issuance/promo')
          expect(result.current).toHaveProperty('isError')
          expect(result.current).toHaveProperty('isLoading')
          expect(result.current).toHaveProperty('promoData')
        },
        { timeout: 1000 }
      )
    })
  })
})
