/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useCompletePasswordReset } from 'v2/auth/hooks/useCompletePasswordReset'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as authRouter from 'v2/auth/router'
import { completePasswordResetArgs } from '__fixtures__/auth'

describe('useCompletePasswordReset', () => {
  const push = jest.fn()
  beforeEach(() => {
    jest.spyOn(authRouter, 'useAuthRouter').mockReturnValue({ push } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCompletePasswordReset(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(completePasswordResetArgs)

          expect(push).toHaveBeenCalledTimes(1)
          expect(push).toHaveBeenCalledWith('login')
          expect(postFn).toHaveBeenNthCalledWith(
            1,
            '/auth/password/reset/confirm',
            completePasswordResetArgs
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Password reset has been successful',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCompletePasswordReset(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(completePasswordResetArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
