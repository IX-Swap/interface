import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useUpdateBank } from 'v2/app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { successfulResponse } from '__fixtures__/api'
import * as banksRouter from 'v2/app/pages/accounts/pages/banks/router'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { updateBankArgs } from '__fixtures__/bank'

describe('useUpdateBank', () => {
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
      const putFn = jest.fn().mockResolvedValueOnce(successfulResponse)

      const apiObj = { put: putFn }
      const { result } = renderHookWithServiceProvider(() => useUpdateBank(), {
        apiService: apiObj
      })
      const { bankId, ...argsWithoutBankId } = updateBankArgs

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(updateBankArgs)

          expect(putFn).toHaveBeenNthCalledWith(
            1,
            `/accounts/banks/${user._id}/${updateBankArgs.bankId}`,
            argsWithoutBankId
          )
          expect(push).toHaveBeenNthCalledWith(1, 'list')
        },
        { timeout: 1000 }
      )
    })
  })
})
