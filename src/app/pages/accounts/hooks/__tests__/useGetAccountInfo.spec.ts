import { accountsURL } from 'config/apiURL'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as UseAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { useGetAccountInfo } from 'app/pages/accounts/hooks/useGetAccountInfo'
import { fakeAccountInfo } from '__fixtures__/reports'

describe('useGetAccountInfo', () => {
  const sampleResponse = generateQueryResult({
    data: fakeAccountInfo
  })

  jest
    .spyOn(UseAuth, 'useAuth')
    .mockReturnValue({ user, isAuthenticated: true })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects request with correct parameters and correct response', async () => {
    apiServiceMock.get.mockResolvedValue(sampleResponse)

    const { result } = renderHookWithServiceProvider(() => useGetAccountInfo())

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(sampleResponse.data)
    expect(apiServiceMock.get).toHaveBeenCalledWith(
      accountsURL.reports.getAccountInfo(user._id)
    )
  })
})
