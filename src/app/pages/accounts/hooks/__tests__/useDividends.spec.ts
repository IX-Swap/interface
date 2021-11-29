import { act } from '@testing-library/react-hooks'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { fakeDividend } from '__fixtures__/reports'
import { accountsURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'
import { useDividends } from 'app/pages/accounts/hooks/useGetDistributionHistory'

describe('useDividends', () => {
  const sampleResponse = generateQueryResult({
    data: [fakeDividend]
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
  })
})
