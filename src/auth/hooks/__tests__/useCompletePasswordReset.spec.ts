import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useCompletePasswordReset } from 'auth/hooks/useCompletePasswordReset'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { completePasswordResetArgs } from '__fixtures__/auth'
import { authURL } from 'config/apiURL'

describe('useCompletePasswordReset', () => {
  afterEach(async () => {
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

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            authURL.resetPasswordConfirm,
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
