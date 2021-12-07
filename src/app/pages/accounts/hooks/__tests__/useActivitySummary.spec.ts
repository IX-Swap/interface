import {
  waitFor,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { fakeActivitySummary } from '__fixtures__/reports'
import { accountsURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'
import { useActivitySummary } from 'app/pages/accounts/hooks/useActivitySummary'

describe('useActivitySummary', () => {
  const sampleResponse = generateQueryResult({
    data: fakeActivitySummary
  })

  it('expects request with correct parameters and correct response', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    apiServiceMock.post.mockResolvedValue(sampleResponse)

    const { result } = renderHookWithServiceProvider(useActivitySummary)

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(sampleResponse.data)
    expect(apiServiceMock.post).toHaveBeenCalledWith(
      accountsURL.reports.getActivitySummary(user._id),
      {
        from: undefined,
        to: undefined
      }
    )
  })
})
