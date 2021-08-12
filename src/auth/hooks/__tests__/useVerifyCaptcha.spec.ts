import { act } from '@testing-library/react-hooks'
import { useVerifyCaptcha } from 'auth/hooks/useVerifyCaptcha'
import { QueryStatus } from 'react-query'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useVerifyCaptcha', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('calls api endpoint and success callback correctly ', async () => {
    await act(async () => {
      const token = 'qwerty'
      const successCallback = jest.fn()
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateMutationResult({ queryStatus: QueryStatus.Success })
        )
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVerifyCaptcha(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [verify] = result.current
          void verify(token)
          expect(apiFn).toHaveBeenCalledWith('/auth/verify-captcha', {
            token: 'qwerty'
          })
          expect(successCallback).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
