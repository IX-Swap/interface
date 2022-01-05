import { act } from '@testing-library/react-hooks'
import { useGetExchangeRules } from 'app/pages/admin/hooks/useGetExchangeRules'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useGetExchangeRules', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls correct api endpoint and return correct response', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useGetExchangeRules(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(apiFn).toHaveBeenCalled()
          expect(result.current.data).toEqual(successfulResponse.data)
        },
        { timeout: 1000 }
      )
    })
  })
})
