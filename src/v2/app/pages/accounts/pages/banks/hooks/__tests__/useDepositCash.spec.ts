/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useDepositCash } from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { successfulResponse } from '__fixtures__/api'
import * as accountsRouter from 'v2/app/pages/accounts/router'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { depositCashArgs } from '__fixtures__/bank'

describe('useDepositCash', () => {
  const push = jest.fn()
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest
      .spyOn(accountsRouter, 'useAccountsRouter')
      .mockReturnValue({ push } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it invokes push correctly when request was successful', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)

      const apiObj = { post: postFn }
      const { result } = renderHookWithServiceProvider(() => useDepositCash(), {
        apiService: apiObj
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
          expect(push).toHaveBeenNthCalledWith(1, 'landing')
        },
        { timeout: 1000 }
      )
    })
  })
})
