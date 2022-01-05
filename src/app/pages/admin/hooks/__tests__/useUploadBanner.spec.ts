import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse } from '__fixtures__/api'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { useUploadBanner } from 'app/pages/admin/hooks/useUploadBanner'
import { DataroomBanner } from 'types/dataroomBanner'

describe('useUploadBanner', () => {
  const callbacks: QueryOrMutationCallbacks<DataroomBanner[]> = {
    onSuccess: jest.fn(),
    onError: jest.fn()
  }
  const file = new File([''], 'filename.txt', { type: 'text/plain' })
  const uploadDocumentArgs = {
    banner: file
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const response = { data: [file, file] }
      const postFn = jest.fn().mockResolvedValue(response)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUploadBanner(callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(uploadDocumentArgs)

          expect(callbacks.onSuccess).toHaveBeenCalledWith(response)
          expect(showSnackbar).toHaveBeenCalledWith(
            `Banner saved successfully.`,
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
        () => useUploadBanner(callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(uploadDocumentArgs)

          expect(callbacks.onError).toHaveBeenNthCalledWith(
            1,
            unsuccessfulResponse
          )
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
