import { act } from '@testing-library/react-hooks'
import { useVirtualAccountByUserId } from 'app/pages/accounts/hooks/useVirtualAccountByUserId'
import { virtualAccounts } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('useVirtualAccountByUserId', () => {
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(sampleResponse)
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useVirtualAccountByUserId(),
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
