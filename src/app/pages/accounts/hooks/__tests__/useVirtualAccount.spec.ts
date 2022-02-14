import { act } from '@testing-library/react-hooks'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { virtualAccounts } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('useVirtualAccount', () => {
  const sampleResponse = generateQueryResult({
    data: [{ documents: virtualAccountsSample }]
  })
  beforeEach(() => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(sampleResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVirtualAccount(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.list).toEqual(sampleResponse.data[0].documents)
          expect(apiFn).toHaveBeenCalledWith(
            virtualAccounts.getByUserId(user._id)
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
