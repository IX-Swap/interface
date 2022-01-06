import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { document } from '__fixtures__/identity'
import { useDownloadRawOutboundACKFile } from 'app/pages/admin/hooks/useDownloadRawOutboundACKFile'

describe('useDownloadRawOutboundACKFile', () => {
  const downloadFile = { documentId: document._id }
  const callbacks = { onSuccess: jest.fn(), onError: jest.fn() }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls onSuccess callback with response data', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDownloadRawOutboundACKFile(downloadFile, callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(callbacks.onSuccess).toHaveBeenNthCalledWith(
            1,
            successfulResponse
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const getFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useDownloadRawOutboundACKFile(downloadFile, callbacks),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
