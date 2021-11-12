import { useGetCustodiansCount } from 'app/pages/admin/hooks/useGetCustodiansCount'
import { act } from '@testing-library/react-hooks'
import { custodyAccounts } from 'config/apiURL'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { fakeCustodiansCount } from '__fixtures__/custodyAccount'

describe('useGetCustodiansCount', () => {
  const sampleResponse = generateQueryResult({
    data: fakeCustodiansCount
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects request with correct parameters and correct response', async () => {
    apiServiceMock.get.mockResolvedValue(sampleResponse)

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() =>
        useGetCustodiansCount()
      )

      await waitFor(() => result.current.data)

      expect(result.current.data).toEqual(sampleResponse.data)
      expect(apiServiceMock.get).toHaveBeenCalledWith(
        custodyAccounts.getCustodiansCount
      )
    })
  })
})
