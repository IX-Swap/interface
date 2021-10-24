import { act } from '@testing-library/react-hooks'
import { virtualAccounts } from 'config/apiURL'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import {
  fakeVirtualAccountBalances,
  virtualAccount
} from '__fixtures__/virtualAccount'
import { useGetBalances } from 'app/pages/accounts/hooks/useGetBalances'

describe('useGetBalances', () => {
  const sampleResponse = generateQueryResult({
    data: fakeVirtualAccountBalances
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(sampleResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useGetBalances(virtualAccount._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(sampleResponse.data)
          expect(apiFn).toHaveBeenCalledWith(
            virtualAccounts.getBalances(virtualAccount._id),
            {}
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
