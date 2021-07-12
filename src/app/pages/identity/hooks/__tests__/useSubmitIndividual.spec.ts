import { act } from '@testing-library/react-hooks'
import { useSubmitIndividual } from 'app/pages/identity/hooks/useSubmitIndividual'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { individual } from '__fixtures__/identity'

describe('useSubmitIndividual', () => {
  const callback = jest.fn()
  const showSnackbar = jest.fn()

  beforeEach(() => {
    history.push(IdentityRoute.editIndividual, { identityId: individual._id })
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
        () => useSubmitIndividual(),
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
