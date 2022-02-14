import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useAccessToken } from 'hooks/auth/useAccessToken'
import { user } from '__fixtures__/user'

describe('useAccessToken', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns access token correctly', async () => {
    await act(async () => {
      const getFn = jest.fn().mockReturnValue(user.accessToken)
      const storageObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => useAccessToken(), {
        storageService: storageObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('access-token')
          expect(result.current).toBe(user.accessToken)
        },
        { timeout: 1000 }
      )
    })
  })
})
