import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { emptyBanner } from '__fixtures__/banner'
import { useDeleteBanner } from 'app/pages/admin/hooks/useDeleteBanner'

describe('useDeleteBanner', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const deleteFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { delete: deleteFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDeleteBanner(emptyBanner._id),
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
    await act(async () => {
      const deleteFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { delete: deleteFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDeleteBanner(emptyBanner._id),
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
