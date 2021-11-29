import { act } from '@testing-library/react-hooks'
import {
  waitFor,
  cleanup,
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

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects request with correct parameters and correct response', async () => {
    await act(async () => {
      apiServiceMock.post.mockResolvedValue(sampleResponse)

      await act(async () => {
        const { result } = renderHookWithServiceProvider(() => {
          return useActivitySummary()
        })

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
  })
})
