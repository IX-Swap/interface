import { act } from '@testing-library/react-hooks'
import { useUpdateCorporate } from 'app/pages/identity/hooks/useUpdateCorporate'
import { identityURL } from 'config/apiURL'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { user } from '__fixtures__/user'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    identityId: 'identity-id'
  })
}))

describe('useUpdateCorporate', () => {
  beforeEach(() => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => ({ user } as any))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn()
      const showFn = jest.fn()
      const apiObj = { put: apiFn }
      const snackbarObj = {
        showSnackbar: showFn
      }

      const { result } = renderHookWithServiceProvider(
        () => useUpdateCorporate('investor'),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const values = {
            formField: 'One'
          }
          const [mutate] = result.current
          void mutate(values)
          expect(apiFn).toHaveBeenCalledWith(
            identityURL.corporates.update(user._id, 'identity-id'),
            {
              ...values,
              type: 'investor'
            }
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
