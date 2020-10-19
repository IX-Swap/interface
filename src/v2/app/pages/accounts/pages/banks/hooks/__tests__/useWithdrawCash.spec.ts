/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { successfulResponse } from '__fixtures__/api'
import * as banksRouter from 'v2/app/pages/accounts/pages/banks/router'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { withdrawCashArgs } from '__fixtures__/bank'

describe('useWithdrawCash', () => {
  const push = jest.fn()
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest.spyOn(banksRouter, 'useBanksRouter').mockReturnValue({ push } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it invokes push correctly when request was successful', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)

      const apiObj = { post: postFn }
      const { result } = renderHookWithServiceProvider(
        () => useWithdrawCash(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(withdrawCashArgs)

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            `/accounts/cash/withdrawals/${user._id}`,
            withdrawCashArgs
          )
          expect(push).toHaveBeenNthCalledWith(1, 'list')
        },
        { timeout: 1000 }
      )
    })
  })
})
