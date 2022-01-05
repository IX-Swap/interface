import { act } from '@testing-library/react-hooks'
import { useCreateCorporateByUserId } from 'app/pages/admin/hooks/useCreateCorporateByUserId'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { identityURL } from 'config/apiURL'

describe('useCreateCorporateByUserId', () => {
  const qc = ReactQuery.queryCache
  qc.invalidateQueries = jest.fn(() => null) as any

  beforeEach(() => {
    jest.spyOn(ReactQuery, 'useQueryCache').mockReturnValue(qc)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct mutation data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { post: postFn }

      const { result } = renderHookWithServiceProvider(
        () => useCreateCorporateByUserId(user._id, 'investor'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const uri = identityURL.corporates.create(user._id)
          const [mutate] = result.current
          void mutate({})

          expect(postFn).toHaveBeenCalledWith(uri, { type: 'investor' })
        },
        { timeout: 1000 }
      )
    })
  })
})
