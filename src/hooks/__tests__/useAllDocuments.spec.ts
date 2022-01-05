import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useParsedDataHook from 'hooks/useParsedData'
import { useAllDocuments } from 'hooks/useAllDocuments'
import { paginationArgs } from 'config/defaults'
import { documents } from '__fixtures__/identity'

describe('useAllDocuments', () => {
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
      const post = jest.fn().mockResolvedValueOnce({ data: documents })
      const apiObj = { post }

      const { result } = renderHookWithServiceProvider(
        () => useAllDocuments(),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(parsedDataFn).toHaveBeenCalledTimes(2)
          expect(parsedDataFn).toHaveBeenNthCalledWith(1, undefined, '_id')
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: documents }],
            '_id'
          )
          expect(post).toHaveBeenCalledWith(`/dataroom/list/`, {
            ...paginationArgs,
            skip: 100
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
