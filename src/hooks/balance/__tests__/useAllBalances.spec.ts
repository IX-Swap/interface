import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { user } from '__fixtures__/user'
import { balance } from '__fixtures__/balance'
import { paginationArgs } from 'config/defaults'

describe('useAllBalances', () => {
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
    jest.clearAllMocks()
  })

  it('invokes useParsedData with correct response from api', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce({ data: balance })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(() => useAllBalances(), {
        apiService: apiObj
      })

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
            `/accounts/balance/${user._id}`,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
