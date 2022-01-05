import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse } from '__fixtures__/api'
import { user } from '__fixtures__/user'
import { useExistsCustodianWallet } from '../useExistsCustodianWallet'
import { custodyAccountMock } from '__fixtures__/custodyAccount'
import { errorCodes } from 'services/api/errorCodes'

describe('useExistsCustodianWallet', () => {
  const onSuccess = jest.fn()
  const onError = jest.fn()
  const userId = user._id

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls onSuccess with the result', async () => {
    await act(async () => {
      const getFn = jest
        .fn()
        .mockResolvedValueOnce({ data: custodyAccountMock })
      const showSnackbar = jest.fn()
      const param = { response: custodyAccountMock }
      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useExistsCustodianWallet({ userId, onSuccess, onError }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(onSuccess).toHaveBeenCalledWith(param)
        },
        { timeout: 1000 }
      )
    })
  })
  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const unsuccessfulResponseWithCode = {
        ...unsuccessfulResponse,
        code: '1234'
      }
      const getFn = jest
        .fn()
        .mockRejectedValueOnce(unsuccessfulResponseWithCode)
      const showSnackbar = jest.fn()

      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useExistsCustodianWallet({ userId, onSuccess, onError }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenCalledTimes(1)
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
  it('it calls onError when receives a result of not found', async () => {
    await act(async () => {
      const unsuccessfulResponseWithCode = {
        ...unsuccessfulResponse,
        code: errorCodes.COULD_NOT_GET_CUSTODY_ACCOUNT
      }
      const getFn = jest
        .fn()
        .mockRejectedValueOnce(unsuccessfulResponseWithCode)
      const showSnackbar = jest.fn()

      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useExistsCustodianWallet({ userId, onSuccess, onError }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(onError).toHaveBeenCalledTimes(1)
        },
        { timeout: 1000 }
      )
    })
  })
})
