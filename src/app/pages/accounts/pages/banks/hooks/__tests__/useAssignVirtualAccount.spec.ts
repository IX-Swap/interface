import { act } from '@testing-library/react-hooks'
import { useAssignVirtualAccount } from 'app/pages/accounts/pages/banks/hooks/useAssignVirtualAccount'
import { QueryStatus } from 'react-query'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'
import { virtualAccounts } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useAssignVirtualAccount', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes api call and call back functions', async () => {
    await act(async () => {
      const args = {
        currency: 'USD',
        userId: '1231'
      }

      const callFn = jest.fn()
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateMutationResult({ queryStatus: QueryStatus.Success })
        )
      const showSnackbar = jest.fn()

      const apiObj = { post: apiFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useAssignVirtualAccount(callFn),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(args)
          expect(apiFn).toHaveBeenCalledWith(virtualAccounts.assign, {
            currency: 'USD',
            userId: '1231'
          })
          expect(callFn).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })

  it('invokes api call with logged in userId when no user id is in args', async () => {
    await act(async () => {
      const args = {
        currency: 'USD'
      }

      const objResponse = { user: user }

      jest
        .spyOn(useAuth, 'useAuth')
        .mockImplementation(() => objResponse as any)

      const callFn = jest.fn()
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateMutationResult({ queryStatus: QueryStatus.Success })
        )
      const showSnackbar = jest.fn()

      const apiObj = { post: apiFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useAssignVirtualAccount(callFn),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(args)
          expect(apiFn).toHaveBeenCalledWith(virtualAccounts.assign, {
            currency: 'USD',
            userId: user._id
          })
          expect(callFn).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
