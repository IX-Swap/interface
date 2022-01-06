import { act } from '@testing-library/react-hooks'
import { useTopIssuers } from 'app/pages/educationCentre/hooks/useTopIssuers'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useTopIssuers', () => {
  afterEach(async () => {
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
