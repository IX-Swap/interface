import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useUpdateBank } from 'app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { successfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { user } from '__fixtures__/user'
import { updateBankArgs } from '__fixtures__/bank'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

describe('useUpdateBank', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it redirects user back to the list when request was successful', async () => {
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
          expect(history.location.pathname).toBe(BanksRoute.list)
        },
        { timeout: 1000 }
      )
    })
  })
})
