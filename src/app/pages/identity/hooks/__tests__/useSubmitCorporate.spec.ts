import { act } from '@testing-library/react-hooks'
import { useSubmitCorporate } from 'app/pages/identity/hooks/useSubmitCorporate'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { corporate } from '__fixtures__/identity'

describe('useSubmitCorporate', () => {
  const callback = jest.fn()
  const showSnackbar = jest.fn()

  beforeEach(() => {
    history.push(IdentityRoute.editCorporate, { identityId: corporate._id })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('responds correctly on successful mutation', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useSubmitCorporate(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(callback)

          expect(showSnackbar).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
