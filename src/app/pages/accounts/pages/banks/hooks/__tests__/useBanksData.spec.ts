import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
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
