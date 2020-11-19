import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useUpdateDSO } from 'v2/app/pages/issuance/hooks/useUpdateDSO'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { createDSOArgs } from '__fixtures__/issuance'
import { dso } from '__fixtures__/authorizer'
import { history } from 'v2/history'

describe('useUpdateDSO', () => {
  const callbacks = { onSuccess: jest.fn(), onError: jest.fn() }

  beforeEach(() => {
    history.push('/', { dsoId: dso._id })
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { put: putFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUpdateDSO(dso._id, callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createDSOArgs)

          expect(callbacks.onSuccess).toHaveBeenCalledWith(successfulResponse)
          expect(showSnackbar).toHaveBeenCalledWith('Success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { put: putFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUpdateDSO(dso._id, callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createDSOArgs)

          expect(callbacks.onError).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(
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
