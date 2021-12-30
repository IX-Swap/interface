import { act } from '@testing-library/react-hooks'
import { useTokenListing } from 'app/pages/authorizer/hooks/useTokenListing'
import { QueryStatus } from 'react-query'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    dsoId: '1'
  })
}))

describe('useTokenListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls apiService and snackbarService correctly', async () => {
    await act(async () => {
      const showsnackbarFn = jest.fn()
      const snackObj = {
        showSnackbar: showsnackbarFn
      }
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateMutationResult({ queryStatus: QueryStatus.Success })
        )
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useTokenListing(),
        {
          apiService: apiObj,
          snackbarService: snackObj
        }
      )

      await waitFor(
        () => {
          const args = { custody: 'HEX' }
          const [mutate] = result.current
          void mutate(args)
          expect(apiFn).toHaveBeenCalledWith(
            `/custody/hex-token-listing/1`,
            args
          )

          expect(showsnackbarFn).toHaveBeenCalledWith('Success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls  snackbarService correctly when ther is error', async () => {
    await act(async () => {
      const showsnackbarFn = jest.fn()
      const snackObj = {
        showSnackbar: showsnackbarFn
      }
      const apiFn = jest.fn().mockRejectedValue({ message: 'Error' })
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useTokenListing(),
        {
          apiService: apiObj,
          snackbarService: snackObj
        }
      )

      await waitFor(
        () => {
          const args = { custody: 'HEX' }
          const [mutate] = result.current
          void mutate(args)
          expect(apiFn).toHaveBeenCalledWith(
            `/custody/hex-token-listing/1`,
            args
          )

          expect(showsnackbarFn).toHaveBeenCalledWith('Error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
