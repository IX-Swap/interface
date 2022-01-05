import { act } from '@testing-library/react-hooks'
import { useNextDistribution } from 'app/pages/issuance/hooks/useNextDistribution'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useNextDistribution', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useNextDistribution('1'),
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
