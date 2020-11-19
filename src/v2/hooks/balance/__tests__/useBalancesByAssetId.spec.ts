import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { useBalancesByAssetId } from 'v2/hooks/balance/useBalancesByAssetId'
import { user } from '__fixtures__/user'
import { balance } from '__fixtures__/balance'
import { paginationArgs } from 'v2/config/defaults'

describe('useBalancesByAssetId', () => {
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
        () => useBalancesByAssetId(balance.assetId),
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
          expect(post).toHaveBeenCalledWith(
            `/accounts/balance/${user._id}/${balance.assetId}`,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('will not make request if asset id is undefined', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce({ data: balance })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useBalancesByAssetId((undefined as unknown) as string),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('idle')
          expect(parsedDataFn).toHaveBeenCalledTimes(1)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, 'assetId')
          expect(post).not.toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
