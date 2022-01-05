import { act } from '@testing-library/react-hooks'
import { useConfirmCommitment } from 'app/pages/accounts/hooks/useConfirmCommitment'
import { accountsURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useConfirmCommitment', () => {
  const callback = jest.fn(() => {})
  const url = accountsURL.commitments.confirmCommitment('1234')

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('confirms commitment without errors', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { put: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useConfirmCommitment(callback),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ commitmentId: '1234', otp: '098765' })
          expect(apiFn).toHaveBeenCalledWith(url, {
            otp: '098765'
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
