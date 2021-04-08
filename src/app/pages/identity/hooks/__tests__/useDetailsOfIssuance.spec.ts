import { act } from '@testing-library/react-hooks'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useDetailsOfIssuance', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useDetailsOfIssuance(),
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
