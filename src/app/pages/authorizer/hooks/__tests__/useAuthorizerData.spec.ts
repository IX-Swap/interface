import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useAuthorizerData } from 'app/pages/authorizer/hooks/useAuthorizerData'
import { history } from 'config/history'
import * as useAuthorizerCategoryHook from 'hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'types/app'
import { AuthorizerRoute } from '../../router'
import * as useParsedDataHook from 'hooks/useParsedData'
import { bank } from '__fixtures__/authorizer'
import { paginationArgs } from 'config/defaults'
import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'

describe('useAuthorizerData', () => {
  const parsedDataFn = jest.fn().mockReturnValue({ map: {} })

  beforeEach(() => {
    history.push(AuthorizerRoute.viewItem, { bankId: bank._id })

    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.BankAccounts)
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('invokes useParsedData with correct response from api', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce({ data: [bank] })

      const apiObj = { post: postFn }
      const { result } = renderHookWithServiceProvider(
        () => useAuthorizerData(),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(3)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(2, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            3,
            [{ data: [bank] }],
            '_id'
          )
          expect(postFn).toHaveBeenCalledWith(
            authorizerItemMap[AuthorizerCategory.BankAccounts].uri,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
