/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { useUser } from 'v2/auth/hooks/useUser'
import * as useCachedUserHook from 'v2/hooks/auth/useCachedUser'
import { user } from '__fixtures__/user'

describe('useUser', () => {
  beforeEach(() => {
    jest.spyOn(useCachedUserHook, 'useCachedUser').mockReturnValue(user)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls apiService.get with correct data', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)

      const apiObj = { get: getFn }
      const { result } = renderHookWithServiceProvider(() => useUser(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(getFn).toHaveBeenCalled()
          expect(getFn).toHaveBeenNthCalledWith(1, `/auth/profiles/${user._id}`)
        },
        { timeout: 1000 }
      )
    })
  })
})
