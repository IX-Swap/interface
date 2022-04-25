import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse } from '__fixtures__/api'
import { user } from '__fixtures__/user'
import { useCreateCustodianWallet } from 'app/pages/invest/hooks/useCreateCustodianWallet'
import { custodyAccountMock } from '__fixtures__/custodyAccount'

describe('useCreateCustodianWallet', () => {
  const onSuccess = jest.fn()
  const onError = jest.fn()
  const userId = user._id

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls onSuccess and snackbarService.showSnackbar', async () => {
    await act(async () => {
      const postFn = jest
        .fn()
        .mockResolvedValueOnce({ data: custodyAccountMock })
      const showSnackbar = jest.fn()
      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateCustodianWallet({ userId, onSuccess, onError }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ userId })

          expect(onSuccess).toHaveBeenCalledTimes(1)

          expect(snackbarObj.showSnackbar).toHaveBeenCalledWith(
            'You have been assigned with the blockchain address',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateCustodianWallet({ userId, onSuccess, onError }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ userId })

          expect(onError).toHaveBeenCalledTimes(1)
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
