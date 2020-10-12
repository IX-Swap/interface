/** * @jest-environment jsdom-sixteen */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useParsedDataHook from 'v2/hooks/useParsedData'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { asset } from '__fixtures__/authorizer'
import { paginationArgs } from 'v2/config/defaults'

describe('useAssetsData', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
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
      const post = jest.fn().mockResolvedValueOnce({ data: asset })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useAssetsData(asset.type),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: asset }],
            '_id'
          )
          expect(post).toHaveBeenCalledWith(`/accounts/assets/list`, {
            ...paginationArgs,
            type: asset.type
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
