import { act } from '@testing-library/react-hooks'
import { useTopCorporates } from 'app/pages/educationCentre/hooks/useTopCorporates'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useTopCorporates', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data value', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useTopCorporates(),
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
