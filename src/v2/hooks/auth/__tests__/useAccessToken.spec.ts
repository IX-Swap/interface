/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useAccessToken } from 'v2/hooks/auth/useAccessToken'
import { user } from '__fixtures__/user'

describe('useAccessToken', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns access token correctly', async () => {
    await act(async () => {
      const getFn = jest.fn().mockReturnValue(user)
      const storageObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => useAccessToken(), {
        storageService: storageObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('user')
          expect(result.current).toBe(user.accessToken)
        },
        { timeout: 1000 }
      )
    })
  })
})
