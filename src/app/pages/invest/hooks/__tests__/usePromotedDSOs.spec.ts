import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useParsedDataHook from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { usePromotedDSOs } from 'app/pages/invest/hooks/usePromotedDSOs'
import { issuanceURL } from 'config/apiURL'
import { dso } from '__fixtures__/authorizer'

describe('usePromotedDSOs', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes useParsedData with correct response from api', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce({ data: [dso] })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => usePromotedDSOs(),
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
          expect(post).toHaveBeenCalledWith(
            issuanceURL.dso.getAllPromoted,
            paginationArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
