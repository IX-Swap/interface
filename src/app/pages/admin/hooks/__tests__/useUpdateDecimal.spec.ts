import { act } from '@testing-library/react-hooks'
import {
  waitFor,
  renderHookWithServiceProvider,
  apiServiceMock,
  snackbarServiceMock
} from 'test-utils'
import {
  UPDATE_DECIMAL_ERROR_MESSAGE,
  UPDATE_DECIMAL_SUCCESS_MESSAGE,
  UpdateDecimalArgs,
  useUpdateDecimal
} from 'app/pages/admin/hooks/useUpdateDecimal'
import { successfulResponse } from '__fixtures__/api'
import { blockchainNetworksURL } from 'config/apiURL'
import * as UseAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useUpdateDecimal', () => {
  const payload: UpdateDecimalArgs = {
    decimal: 12,
    network: 'XTZ',
    otp: '123456'
  }

  jest
    .spyOn(UseAuth, 'useAuth')
    .mockReturnValue({ user, isAuthenticated: true })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('sends update decimal request with provided payload', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(() => useUpdateDecimal())

      await waitFor(() => result.current)
      await result.current[0](payload)

      expect(apiServiceMock.put).toBeCalledTimes(1)
      expect(
        apiServiceMock.put
      ).toBeCalledWith(
        blockchainNetworksURL.getUpdateDecimal(
          payload.network,
          payload.decimal
        ),
        { userId: user._id, otp: payload.otp }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    apiServiceMock.put.mockResolvedValue(successfulResponse)

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() => useUpdateDecimal())

      await waitFor(() => result.current)
      await result.current[0](payload)

      expect(snackbarServiceMock.showSnackbar).toBeCalledTimes(1)
      expect(snackbarServiceMock.showSnackbar).toBeCalledWith(
        UPDATE_DECIMAL_SUCCESS_MESSAGE,
        'success'
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    apiServiceMock.put.mockRejectedValue(undefined)

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() => useUpdateDecimal())

      await waitFor(() => result.current)
      await result.current[0](payload)

      expect(snackbarServiceMock.showSnackbar).toBeCalledTimes(1)
      expect(snackbarServiceMock.showSnackbar).toBeCalledWith(
        UPDATE_DECIMAL_ERROR_MESSAGE,
        'error'
      )
    })
  })
})
