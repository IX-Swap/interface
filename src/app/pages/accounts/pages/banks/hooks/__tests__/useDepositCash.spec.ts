import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useDepositCash } from 'app/pages/accounts/pages/banks/hooks/useDepositCash'
import { successfulResponse, unsuccessfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { depositCashArgs } from '__fixtures__/bank'

describe('useDepositCash', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useDepositCash(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(depositCashArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            `/accounts/cash/deposits/${user._id}`,
            depositCashArgs
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            successfulResponse.message,
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
      const { result } = renderHookWithServiceProvider(() => useDepositCash(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(depositCashArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            `/accounts/cash/deposits/${user._id}`,
            depositCashArgs
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
