import { act } from '@testing-library/react-hooks'
import { useSubmitCorporateById } from 'app/pages/admin/hooks/useSubmitCorporateById'
import { identityURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('useSubmitCorporateById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { patch: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useSubmitCorporateById(user._id, corporate._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const uri = identityURL.corporates.submit(corporate._id)
          const [mutate] = result.current
          void mutate()

          expect(apiFn).toHaveBeenCalledWith(uri, {})
        },
        { timeout: 1000 }
      )
    })
  })
})
