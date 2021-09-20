import { act } from '@testing-library/react-hooks'
import { useBulkAuthorizeCommitments } from 'app/pages/authorizer/hooks/useBulkAuthorizeCommitment'
import { authorizerURL } from 'config/apiURL'
import * as useAuthorizerCategory from 'hooks/location/useAuthorizerCategory'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { commitment } from '__fixtures__/authorizer'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useBulkAuthorizeCommitments', () => {
  beforeEach(() => {
    const objResponse = 'commitments'

    jest
      .spyOn(useAuthorizerCategory, 'useAuthorizerCategory')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('calls correct approve url', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useBulkAuthorizeCommitments('approve'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const url = authorizerURL.bulkAuthorizeCommitments('approve')

          const [commit] = result.current
          void commit([commitment._id])
          expect(apiFn).toHaveBeenCalledWith(url, {
            commitments: [commitment._id]
          })
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls correct reject url', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useBulkAuthorizeCommitments('reject'),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const url = authorizerURL.bulkAuthorizeCommitments('reject')

          const [commit] = result.current
          void commit([commitment._id])
          expect(apiFn).toHaveBeenCalledWith(url, {
            commitments: [commitment._id]
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
