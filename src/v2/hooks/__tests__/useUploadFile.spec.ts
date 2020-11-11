/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useUploadFile, UploadDocumentArgs } from 'v2/hooks/useUploadFile'
import { unsuccessfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { DataroomFile } from 'v2/types/dataroomFile'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'

describe('useUploadFile', () => {
  const callbacks: QueryOrMutationCallbacks<DataroomFile[]> = {
    onSuccess: jest.fn(),
    onError: jest.fn()
  }
  const file = new File([''], 'filename.txt', { type: 'text/plain' })
  const uploadDocumentArgs: UploadDocumentArgs = {
    documents: [file, file]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const response = { data: [file, file] }
      const postFn = jest.fn().mockResolvedValue(response)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUploadFile(callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(uploadDocumentArgs)

          expect(callbacks.onSuccess).toHaveBeenCalledWith(response)
          expect(showSnackbar).toHaveBeenCalledWith(
            `Successfully uploaded ${response.data.length} files`,
            'success'
          )
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
      const postFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUploadFile(callbacks),
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
