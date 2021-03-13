import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { user } from '__fixtures__/user'
import { paginationArgs } from 'config/defaults'
import { corporate } from '__fixtures__/identity'

describe('useAllCorporateIdentities', () => {
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
      const post = jest.fn().mockResolvedValueOnce({ data: corporate })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useAllCorporates({}),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: corporate }],
            '_id'
          )
          expect(post).toHaveBeenCalledWith(
            `/identity/corporates/${user._id}/list`,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
