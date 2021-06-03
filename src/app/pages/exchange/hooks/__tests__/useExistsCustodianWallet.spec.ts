import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse } from '__fixtures__/api'
import { user } from '__fixtures__/user'
import { useExistsCustodianWallet } from '../useExistsCustodianWallet'
import { custodyAccountMock } from '__fixtures__/custodyAccount'

describe('useExistsCustodianWallet', () => {
  const onSuccess = jest.fn()
  const userId = user._id

  afterEach(async () => {
    await cleanup()
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
        () => useExistsCustodianWallet({ userId, onSuccess }),
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
      const getFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { get: getFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useExistsCustodianWallet({ userId, onSuccess }),
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
})
