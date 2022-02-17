import { act } from '@testing-library/react-hooks'
import {
  renderHookWithServiceProvider,
  apiServiceMock,
  snackbarServiceMock,
  invokeMutationFn
} from 'test-utils'
import { useEnable2fa } from 'app/pages/security/hooks/useEnable2fa'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { enable2faArgs } from '__fixtures__/security'

describe('useEnable2fa', () => {
  const nextStep = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls nextStep and snackbarService.showSnackbar with success message when enable 2FA is successful', async () => {
    await act(async () => {
      apiServiceMock.post.mockResolvedValue(successfulResponse)
      const { result } = renderHookWithServiceProvider(() =>
        useEnable2fa(nextStep)
      )

      await invokeMutationFn(result, enable2faArgs)
      expect(nextStep).toHaveBeenCalled()
      expect(snackbarServiceMock.showSnackbar).toHaveBeenCalledWith(
        'Google Authenticator Setup Success!',
        'success'
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      apiServiceMock.post.mockRejectedValue(unsuccessfulResponse)
      const { result } = renderHookWithServiceProvider(() =>
        useEnable2fa(nextStep)
      )

      await invokeMutationFn(result, enable2faArgs)
      expect(snackbarServiceMock.showSnackbar).toHaveBeenCalledWith(
        unsuccessfulResponse.message,
        'error'
      )
    })
  })
})
