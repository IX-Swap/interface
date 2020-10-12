/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useAuth', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns user correctly as authenticated', async () => {
    await act(async () => {
      const getFn = jest.fn().mockReturnValue(user)
      const storageObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => useAuth(), {
        storageService: storageObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('user')
          expect(result.current.isAuthenticated).toBe(true)
          expect(result.current.user).toBe(user)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns isAuthenticated as false if user is not defined', async () => {
    await act(async () => {
      const getFn = jest.fn()
      const storageObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(() => useAuth(), {
        storageService: storageObj
      })

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('user')
          expect(result.current.isAuthenticated).toBe(false)
          expect(result.current.user).toBe(undefined)
        },
        { timeout: 1000 }
      )
    })
  })
})
