import { act } from '@testing-library/react-hooks'
import {
  renderHookWithServiceProvider,
  apiServiceMock,
  invokeMutationFn,
  snackbarServiceMock
} from 'test-utils'
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
      apiServiceMock.post.mockResolvedValue(successfulResponse)
      const { result } = renderHookWithServiceProvider(() =>
        useRemove2fa(handleSuccessRequest)
      )

      await invokeMutationFn(result, remove2faArgs)
      expect(handleSuccessRequest).toHaveBeenCalled()
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      apiServiceMock.post.mockRejectedValue(unsuccessfulResponse)
      const { result } = renderHookWithServiceProvider(() =>
        useRemove2fa(handleSuccessRequest)
      )

      await invokeMutationFn(result, remove2faArgs)
      expect(snackbarServiceMock.showSnackbar).toHaveBeenCalledWith(
        unsuccessfulResponse.message,
        'error'
      )
    })
  })
})
