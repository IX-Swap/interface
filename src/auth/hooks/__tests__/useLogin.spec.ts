import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useLogin } from 'auth/hooks/useLogin'
import { unsuccessfulResponse } from '__fixtures__/api'
import { loginArgs } from '__fixtures__/auth'
import { user } from '__fixtures__/user'

describe('useLogin', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls storageService.set with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce({
        data: user,
        message: 'success'
      })

      const apiService = { post: postFn }
      const snackbarService = { showSnackbar: jest.fn() }
      const storageService = { set: jest.fn() }
      const { result } = renderHookWithServiceProvider(() => useLogin(), {
        apiService,
        storageService,
        snackbarService
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(loginArgs)

          expect(postFn).toHaveBeenNthCalledWith(1, '/auth/sign-in', loginArgs)
          expect(storageService.set).toHaveBeenNthCalledWith(1, 'user', user)
          expect(storageService.set).toHaveBeenNthCalledWith(
            2,
            'access-token',
            user.accessToken
          )
          expect(storageService.set).toHaveBeenNthCalledWith(
            3,
            'visitedUrl',
            []
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValue(unsuccessfulResponse)

      const apiService = { post: postFn }
      const snackbarService = { showSnackbar: jest.fn() }
      const storageService = { set: jest.fn() }
      const { result } = renderHookWithServiceProvider(() => useLogin(), {
        apiService,
        storageService,
        snackbarService
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(loginArgs)

          expect(snackbarService.showSnackbar).toHaveBeenNthCalledWith(
            1,
            unsuccessfulResponse.message,
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
