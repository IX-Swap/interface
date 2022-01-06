import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useCommitmentActivity } from 'app/pages/invest/hooks/useCommitmentActivity'
import { successfulResponse } from '__fixtures__/api'
import { dso } from '__fixtures__/authorizer'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { issuanceURL } from 'config/apiURL'

describe('useCommitmentActivity', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns response from api correctly', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    await act(async () => {
      const postFn = jest.fn().mockResolvedValue(successfulResponse)
      const apiObj = { post: postFn }

      renderHookWithServiceProvider(() => useCommitmentActivity(dso._id), {
        apiService: apiObj
      })

      await waitFor(() => {
        expect(postFn).toHaveBeenNthCalledWith(
          1,
          issuanceURL.commitments.createDSOActivity(user._id, dso._id),
          {
            action: 'Click',
            type: 'Invest',
            invariant: 'Invest button was clicked',
            value: null
          }
        )
      })
    })
  })
})
