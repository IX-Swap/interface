import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useEnable2fa } from 'app/pages/security/pages/setup2fa/hooks/useEnable2fa'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { useLogout } from 'auth/hooks/useLogout'
import { enable2faArgs } from '__fixtures__/security'

jest.mock('auth/hooks/useLogout')

const useLogoutMock = (useLogout as Function) as jest.Mock<
  Partial<ReturnType<typeof useLogout>>
>

describe('useEnable2fa', () => {
  const logout = jest.fn()

  beforeEach(() => {
    useLogoutMock.mockReturnValue(logout)
    jest.useFakeTimers()
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useEnable2fa(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(logout).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Google Authenticator Setup Success! You will be redirected to Login page.',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const post = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useEnable2fa(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(logout).toHaveBeenCalledTimes(0)
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            unsuccessfulResponse.toString(),
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
