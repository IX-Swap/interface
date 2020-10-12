/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useUploadFile, UploadDocumentArgs } from 'v2/hooks/useUploadFile'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { DataroomFile } from 'v2/types/dataroomFile'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'

describe('useUploadFile', () => {
  const callbacks: QueryOrMutationCallbacks<DataroomFile[]> = {
    onSuccess: jest.fn(),
    onError: jest.fn()
  }
  const uploadDocumentArgs: UploadDocumentArgs = {
    documents: new File([''], 'filename.txt', { type: 'text/plain' })
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
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
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

          expect(callbacks.onSuccess).toHaveBeenNthCalledWith(
            1,
            successfulResponse
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'File uploaded',
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
            'Failed to upload the file',
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
