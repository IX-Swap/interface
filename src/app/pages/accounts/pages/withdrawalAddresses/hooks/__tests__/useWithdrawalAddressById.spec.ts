import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useWithdrawalAddressById } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { user } from '__fixtures__/user'
import { successfulResponse } from '__fixtures__/api'
import * as useAuthHook from 'hooks/auth/useAuth'

describe('useWithdrawalAddressById', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns response from api correctly', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiService = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useWithdrawalAddressById(withdrawalAddress._id),
        { apiService }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
          expect(getFn).toHaveBeenCalledTimes(1)
          expect(getFn).toHaveBeenCalledWith(
            `accounts/withdrawal-addresses/${user._id}/${withdrawalAddress._id}`
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('will not invoke api if id is undefined', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiService = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useWithdrawalAddressById(undefined as unknown as string),
        { apiService }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('idle')
          expect(getFn).not.toHaveBeenCalled()
          expect(result.current.data).toEqual(undefined)
        },
        { timeout: 1000 }
      )
    })
  })
})
