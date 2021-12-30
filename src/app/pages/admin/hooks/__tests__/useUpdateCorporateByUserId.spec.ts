import { act } from '@testing-library/react-hooks'
import { useUpdateCorporateByUserId } from 'app/pages/admin/hooks/useUpdateCorporateByUserId'
import { identityURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('useUpdateCorporateByUserId', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { put: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useUpdateCorporateByUserId(user._id, corporate._id, 'investor'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const uri = identityURL.corporates.update(user._id, corporate._id)
          const [mutate] = result.current
          void mutate({ value: true })

          expect(apiFn).toHaveBeenCalledWith(uri, {
            value: true,
            type: 'investor'
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
