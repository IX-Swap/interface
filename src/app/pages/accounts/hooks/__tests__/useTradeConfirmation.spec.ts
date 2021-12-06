import {
  waitFor,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { useTradeConfirmation } from 'app/pages/accounts/hooks/useTradeConfirmation'
import { fakeTradeItem } from '__fixtures__/reports'
import { accountsURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useTradeConfirmation', () => {
  const sampleResponse = generateQueryResult({
    data: [fakeTradeItem]
  })

  it('expects request with correct parameters and correct response', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    apiServiceMock.post.mockResolvedValue(sampleResponse)

    const { result } = renderHookWithServiceProvider(useTradeConfirmation)

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(sampleResponse.data)
    expect(apiServiceMock.post).toHaveBeenCalledWith(
      accountsURL.reports.getTradeConfirmation(user._id),
      {
        from: undefined,
        to: undefined
      }
    )
  })
})
