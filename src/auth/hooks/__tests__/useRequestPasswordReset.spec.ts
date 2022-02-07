import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useRequestPasswordReset } from 'auth/hooks/useRequestPasswordReset'
import { successfulResponse } from '__fixtures__/api'
import { requestPasswordResetArgs } from '__fixtures__/auth'
import { authURL } from 'config/apiURL'

describe('useRequestPasswordReset', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce({
        ...successfulResponse,
        data: { email: 'a@investax.io' }
      })
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useRequestPasswordReset(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(requestPasswordResetArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            authURL.resetPassword,
            requestPasswordResetArgs
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(1, `success`)
        },
        { timeout: 1000 }
      )
    })
  })
})
