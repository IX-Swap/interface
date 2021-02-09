import { act } from '@testing-library/react-hooks'
import { useTopIssuers } from 'app/pages/home/hooks/useTopIssuers'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useTopIssuers', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data value', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(() => useTopIssuers(), {
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
