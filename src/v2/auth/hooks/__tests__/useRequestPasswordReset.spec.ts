import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useRequestPasswordReset } from 'v2/auth/hooks/useRequestPasswordReset'
import { successfulResponse } from '__fixtures__/api'
import * as authRouter from 'v2/auth/router'
import { requestPasswordResetArgs } from '__fixtures__/auth'

describe('useRequestPasswordReset', () => {
  const replace = jest.fn()
  beforeEach(() => {
    jest.spyOn(authRouter, 'useAuthRouter').mockReturnValue({ replace } as any)
  })

  afterEach(async () => {
    await cleanup()
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

          expect(replace).toHaveBeenCalled()
          expect(replace).toHaveBeenCalledWith('login')
          expect(postFn).toHaveBeenNthCalledWith(
            1,
            '/auth/password/reset/start',
            requestPasswordResetArgs
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            `Email has been sent to a@investax.io`
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
