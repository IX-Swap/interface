import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse, unsuccessfulResponse } from '__fixtures__/api'
import { useUser } from 'auth/hooks/useUser'
import * as useCachedUserHook from 'hooks/auth/useCachedUser'
import { user } from '__fixtures__/user'

describe('useUser', () => {
  beforeEach(() => {
    jest.spyOn(useCachedUserHook, 'useCachedUser').mockReturnValue(user)
  })

  afterEach(async () => {
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

  it('removes all user related data from localStorage and redirects to the /', async () => {
    await act(async () => {
      const getFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const removeFn = jest.fn()

      const apiObj = { get: getFn }
      const storageServiceMock = {
        remove: removeFn
      }
      const { result } = renderHookWithServiceProvider(() => useUser(), {
        apiService: apiObj,
        storageService: storageServiceMock
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(storageServiceMock.remove).toHaveBeenNthCalledWith(1, 'user')
          expect(storageServiceMock.remove).toHaveBeenNthCalledWith(
            2,
            'visitedUrl'
          )
          expect(storageServiceMock.remove).toHaveBeenNthCalledWith(
            3,
            'access-token'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
