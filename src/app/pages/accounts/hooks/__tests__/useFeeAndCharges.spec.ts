import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { fakeFeeAndCharges } from '__fixtures__/reports'
import { accountsURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'
import { useFeeAndCharges } from 'app/pages/accounts/hooks/useFeeAndCharges'

describe('useFeeAndCharges', () => {
  const sampleResponse = generateQueryResult({
    data: fakeFeeAndCharges
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
    apiServiceMock.post.mockResolvedValue(sampleResponse)

    const { result } = renderHookWithServiceProvider(() => {
      return useFeeAndCharges()
    })

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(sampleResponse.data)
    expect(apiServiceMock.post).toHaveBeenCalledWith(
      accountsURL.reports.getFeeAndCharges(user._id),
      {
        from: undefined,
        to: undefined
      }
    )
  })
})
