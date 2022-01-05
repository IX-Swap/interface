import { act } from '@testing-library/react-hooks'
import { useTokenInfo } from 'app/pages/accounts/hooks/useTokenInfo'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useTokenInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useTokenInfo('RHT Coin'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
        },
        { timeout: 1000 }
      )
    })
  })
})
