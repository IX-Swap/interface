import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useDeleteFile } from 'hooks/useDeleteFile'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { document } from '__fixtures__/identity'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useDeleteFile', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const deleteFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { delete: deleteFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDeleteFile(document._id),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const deleteFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { delete: deleteFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDeleteFile(document._id),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
