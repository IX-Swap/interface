import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  act
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import {
  useBankById,
  UseBankByIdArgs
} from 'app/pages/accounts/pages/banks/hooks/useBankById'
import { user } from '__fixtures__/user'
import { bank } from '__fixtures__/authorizer'

describe('useBankById', () => {
  jest
    .spyOn(useAuthHook, 'useAuth')
    .mockImplementation(() => ({ user, isAuthenticated: true }))

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: bank })
      const apiObj = { get: getFn }
      const args: UseBankByIdArgs = { bankId: bank._id, ownerId: '123' }

      const { result } = renderHookWithServiceProvider(
        () => useBankById(args),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith(
            `accounts/banks/${args.ownerId as string}/${bank._id}`
          )

          expect(result.current.data).toEqual(bank)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns data with correct response from api if ownerId is undefined', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: bank })
      const apiObj = { get: getFn }
      const args: UseBankByIdArgs = { bankId: bank._id }

      const { result } = renderHookWithServiceProvider(
        () => useBankById(args),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith(
            `accounts/banks/${user._id}/${bank._id}`
          )

          expect(result.current.data).toEqual(bank)
        },
        { timeout: 1000 }
      )
    })
  })

  it('will not invoke api if id is undefined', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: bank })
      const apiObj = { get: getFn }
      const args: UseBankByIdArgs = { bankId: (undefined as unknown) as string }

      const { result } = renderHookWithServiceProvider(
        () => useBankById(args),
        { apiService: apiObj }
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
