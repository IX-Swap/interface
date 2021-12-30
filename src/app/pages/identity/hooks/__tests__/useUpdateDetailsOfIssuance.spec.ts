import { act } from '@testing-library/react-hooks'
import { useUpdateDetailsOfIssuance } from 'app/pages/identity/hooks/useUpdateDetailsOfIssuance'
import { identityURL } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { user } from '__fixtures__/user'

describe('useUpdateDetailsOfIssuance', () => {
  beforeEach(() => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => ({ user } as any))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn()
      const apiObj = { put: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useUpdateDetailsOfIssuance('123'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()
          expect(apiFn).toHaveBeenCalledWith(
            identityURL.detailsOfIssuance.update(user._id, '123'),
            undefined
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
