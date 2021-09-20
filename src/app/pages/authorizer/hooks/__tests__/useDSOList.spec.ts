import { act } from '@testing-library/react-hooks'
import { useDSOList } from 'app/pages/authorizer/hooks/useDSOList'
import { issuanceURL } from 'config/apiURL'
import * as useParsedData from 'hooks/useParsedData'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { paginationArgs } from 'config/defaults'

describe('useDSOList', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest.spyOn(useParsedData, 'useParsedData').mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders withour errors', async () => {
    await act(async () => {
      const url = issuanceURL.dso.getDSOList

      const apiFn = jest.fn().mockResolvedValueOnce({ data: [dso] })
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useDSOList('Closed'),
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
            [{ data: [dso] }],
            '_id'
          )
          expect(apiFn).toHaveBeenCalledWith(url, {
            ...paginationArgs,
            dealStatus: 'Closed'
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
