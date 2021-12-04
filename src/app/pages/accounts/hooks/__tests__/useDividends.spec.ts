import {
  waitFor,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { fakeDividend } from '__fixtures__/reports'
import { accountsURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'
import { useDividends } from 'app/pages/accounts/hooks/useDividends'

describe('useDividends', () => {
  const sampleResponse = generateQueryResult({
    data: [fakeDividend]
  })

  it('expects request with correct parameters and correct response', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    apiServiceMock.post.mockResolvedValue(sampleResponse)

    const { result } = renderHookWithServiceProvider(() => {
      return useDividends()
    })

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(sampleResponse.data)
    expect(apiServiceMock.post).toHaveBeenCalledWith(
      accountsURL.reports.getDividends(user._id),
      {
        from: undefined,
        to: undefined
      }
    )
  })
})
