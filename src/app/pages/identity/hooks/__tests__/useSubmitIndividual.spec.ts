import { act } from '@testing-library/react-hooks'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { generatePath } from 'react-router-dom'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { individual } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { history } from 'config/history'
import { identityURL } from 'config/apiURL'
import { useSubmitIndividual } from 'app/pages/identity/hooks/useSubmitIndividual'

describe('useSubmitIndividual', () => {
  const callback = jest.fn()
  const showSnackbar = jest.fn()
  const uri = identityURL.individuals.submit(individual._id)
  const qc = ReactQuery.queryCache
  qc.invalidateQueries = jest.fn(() => null) as any

  beforeEach(() => {
    history.push(
      generatePath(IdentityRoute.editIndividual, {
        identityId: individual._id,
        userId: user._id
      })
    )
    jest.spyOn(ReactQuery, 'useQueryCache').mockReturnValue(qc)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('responds correctly on successful mutation', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { patch: apiFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useSubmitIndividual(callback),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        },
        IdentityRoute.editIndividual
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(individual._id)
          expect(apiFn).toHaveBeenCalledWith(uri, {})
          expect(showSnackbar).toHaveBeenCalled()
          expect(callback).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
