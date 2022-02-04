import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { remove2faArgs } from '__fixtures__/security'
import { useRemove2fa } from 'app/pages/security/pages/update2fa/hooks/useRemove2fa'

describe('useRemove2fa', () => {
  const handleSuccessRequest = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls nextStep when remove 2FA is successful', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useRemove2fa(handleSuccessRequest),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(remove2faArgs)

          expect(handleSuccessRequest).toHaveBeenCalled()
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
      const { result } = renderHookWithServiceProvider(
        () => useRemove2fa(handleSuccessRequest),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(remove2faArgs)

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
