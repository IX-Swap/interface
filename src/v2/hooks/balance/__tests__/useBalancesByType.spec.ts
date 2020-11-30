import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { useBalancesByType } from 'v2/hooks/balance/useBalancesByType'
import { user } from '__fixtures__/user'
import { balance } from '__fixtures__/balance'
import { asset } from '__fixtures__/authorizer'
import { paginationArgs } from 'v2/config/defaults'

describe('useBalancesByType', () => {
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
      const post = jest.fn().mockResolvedValueOnce({ data: balance })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useBalancesByType(asset.type),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, 'assetId')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: balance }],
            'assetId'
          )
          expect(post).toHaveBeenCalledWith(`/accounts/balance/${user._id}`, {
            ...paginationArgs,
            type: asset.type
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
