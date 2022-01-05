import { act } from '@testing-library/react-hooks'
import { useRemoveBank } from 'app/pages/accounts/pages/banks/hooks/useRemoveBank'
import { accountsURL } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { user } from '__fixtures__/user'

describe('useRemoveBank', () => {
  beforeEach(() => {
    const objResponse = { user: user }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes correct api call', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { put: apiFn }

      const { result } = renderHookWithServiceProvider(() => useRemoveBank(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ bankId: 'bank-id', otp: '123456' })
          expect(apiFn).toHaveBeenCalledWith(
            accountsURL.banks.remove(user._id, 'bank-id'),
            { otp: '123456' }
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
