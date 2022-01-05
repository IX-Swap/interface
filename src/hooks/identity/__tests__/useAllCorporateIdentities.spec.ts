import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { user } from '__fixtures__/user'

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
    jest.clearAllMocks()
  })

  it('invokes useParsedData with correct response from api', async () => {
    // await act(async () => {
    //   const post = jest.fn().mockResolvedValueOnce({ data: corporate })
    //   const apiObj = { post }
    //   const { result } = renderHookWithServiceProvider(
    //     () => useAllCorporates({}),
    //     { apiService: apiObj }
    //   )
    //   await waitFor(
    //     () => {
    //       expect(result.current.status).toBe('success')
    //       expect(parsedDataFn).toHaveBeenCalledTimes(2)
    //       expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
    //       expect(parsedDataFn).toHaveBeenNthCalledWith(
    //         2,
    //         [{ data: corporate }],
    //         '_id'
    //       )
    //       expect(post).toHaveBeenCalledWith(
    //         `/identity/corporates/${user._id}/list`,
    //         paginationArgs
    //       )
    //     },
    //     { timeout: 1000 }
    //   )
    // })
  })
})
