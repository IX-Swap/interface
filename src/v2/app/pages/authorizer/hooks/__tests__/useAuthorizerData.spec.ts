/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useAuthorizerData } from 'v2/app/pages/authorizer/hooks/useAuthorizerData'
import { history } from 'v2/history'
import * as useAuthorizerCategoryHook from 'v2/hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'v2/types/app'
import { AuthorizerRoute } from '../../router'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { bank } from '__fixtures__/authorizer'
import { paginationArgs } from 'v2/config/defaults'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'

describe('useAuthorizerData', () => {
  const parsedDataFn = jest.fn().mockReturnValue({ map: {} })
  beforeEach(() => {
    history.push(AuthorizerRoute.viewItem, { bankId: bank._id })
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory['Bank Accounts'])
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
            authorizerItemMap[AuthorizerCategory['Bank Accounts']].uri,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
