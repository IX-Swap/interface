import { act } from '@testing-library/react-hooks'
import { useIndividualIdentityById } from 'app/pages/admin/hooks/useIndividualIdentityById'
import { identityURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('useIndividualIdentityById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct query result', async () => {
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(generateQueryResult({ data: individual }))
      const apiObj = { get: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useIndividualIdentityById(user._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const uri = identityURL.individuals.get(user._id)

          expect(result.current.data).toEqual(individual)
          expect(apiFn).toHaveBeenCalledWith(uri)
        },
        { timeout: 1000 }
      )
    })
  })
})
