import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { MakeWithdrawalAddressArgs } from 'types/withdrawalAddress'
import { user } from '__fixtures__/user'
import { network } from '__fixtures__/network'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { useMakeWithdrawalAddress } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useMakeWithdrawalAddress'
import * as useAuthHook from 'hooks/auth/useAuth'

describe('useMakeWithdrawalAddress', () => {
  const makeWithdrawalAddressArgs: MakeWithdrawalAddressArgs = {
    address: '123',
    label: 'test label',
    network: network._id,
    memo: 'test memo'
  }

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiService = { post: postFn }
      const snackbarService = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMakeWithdrawalAddress(),
        { apiService, snackbarService }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(makeWithdrawalAddressArgs)

          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiService = { post: postFn }
      const snackbarService = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMakeWithdrawalAddress(),
        { apiService, snackbarService }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(makeWithdrawalAddressArgs)

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
