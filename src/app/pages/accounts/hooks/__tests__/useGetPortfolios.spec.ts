import { act } from '@testing-library/react-hooks'
import { accountsURL } from 'config/apiURL'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { fakeVirtualAccountBalances } from '__fixtures__/virtualAccount'
import { useGetPortfolios } from 'app/pages/accounts/hooks/useGetPortfolios'
import * as UseAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useGetPortfolios', () => {
  const sampleResponse = generateQueryResult({
    data: fakeVirtualAccountBalances
  })

  jest
    .spyOn(UseAuth, 'useAuth')
    .mockReturnValue({ user, isAuthenticated: true })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects', async () => {
    apiServiceMock.get.mockResolvedValue(sampleResponse)

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() => useGetPortfolios())

      await waitFor(() => result.current.data)

      expect(result.current.data).toEqual(sampleResponse.data)
      expect(apiServiceMock.get).toHaveBeenCalledWith(
        accountsURL.getPortfolios(user._id)
      )
    })
  })
})
