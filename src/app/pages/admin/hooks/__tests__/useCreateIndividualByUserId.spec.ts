import { act } from '@testing-library/react-hooks'
import { useCreateIndividualByUserId } from 'app/pages/admin/hooks/useCreateIndividualByUserId'
import { identityURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('useCreateIndividualByUserId', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct mutation data', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { put: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useCreateIndividualByUserId(user._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const uri = identityURL.individuals.create(user._id)

          const [mutate] = result.current
          void mutate({ value: true })

          expect(apiFn).toHaveBeenCalledWith(uri, { value: true })
        },
        { timeout: 1000 }
      )
    })
  })
})
