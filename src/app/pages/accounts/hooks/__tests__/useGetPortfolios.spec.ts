import { act } from '@testing-library/react-hooks'
import { accountsURL } from 'config/apiURL'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

import { useGetPortfolios } from 'app/pages/accounts/hooks/useGetPortfolios'
import * as UseAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { fakePortfolio } from '__fixtures__/portfolio'

describe('useGetPortfolios', () => {
  const sampleResponse = generateQueryResult({
    data: fakePortfolio
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

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() => useGetPortfolios())

      await waitFor(() => result.current.data)

      expect(result.current.data).toEqual(sampleResponse.data)
      expect(apiServiceMock.get).toHaveBeenCalledWith(
        accountsURL.dashboard.getPortfolios(user._id)
      )
    })
  })
})
