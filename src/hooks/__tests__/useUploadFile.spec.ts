import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useUploadFile, UploadDocumentArgs } from 'hooks/useUploadFile'
import { unsuccessfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { DataroomFile } from 'types/dataroomFile'
import { QueryOrMutationCallbacks } from 'hooks/types'

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
    jest.clearAllMocks()
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
