import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { successfulResponse, unsuccessfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { withdrawCashArgs } from '__fixtures__/bank'
import { accountsURL } from 'config/apiURL'
import { virtualAccount } from '__fixtures__/virtualAccount'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'

describe('useWithdrawCash', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    const useVirtualAccountResponse = {
      list: [virtualAccount]
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it invokes push correctly when request was successful', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useWithdrawCash(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(withdrawCashArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            accountsURL.virtualAccounts.withdraw(user._id, virtualAccount._id),
            { ...withdrawCashArgs, virtualAccount: undefined }
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Cash withdrawal successfull',
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
        () => useWithdrawCash(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(withdrawCashArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            accountsURL.virtualAccounts.withdraw(user._id, virtualAccount._id),
            { ...withdrawCashArgs, virtualAccount: undefined }
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
