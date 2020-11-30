import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { useWithdrawalAddresses } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { user } from '__fixtures__/user'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

describe('useWithdrawalAddresses', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('invokes useParsedData with correct response from api', async () => {
    await act(async () => {
      const post = jest
        .fn()
        .mockResolvedValueOnce({ data: [withdrawalAddress] })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useWithdrawalAddresses({}),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: [withdrawalAddress] }],
            '_id'
          )
          expect(
            post
          ).toHaveBeenCalledWith(
            `/accounts/withdrawal-addresses/list/${user._id}`,
            { ...paginationArgs, status: 'Approved' }
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
