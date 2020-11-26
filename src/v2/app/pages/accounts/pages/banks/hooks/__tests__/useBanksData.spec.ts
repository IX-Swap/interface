import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { useBanksData } from '../useBanksData'
import { user } from '__fixtures__/user'
import { bank } from '__fixtures__/authorizer'

describe('useBanksData', () => {
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
      const post = jest.fn().mockResolvedValueOnce({ data: [bank] })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(() => useBanksData(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: [bank] }],
            '_id'
          )
          expect(post).toHaveBeenCalledWith(
            `/accounts/banks/list/${user._id}`,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
