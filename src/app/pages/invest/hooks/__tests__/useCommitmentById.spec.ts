import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useCommitmentById } from 'app/pages/invest/hooks/useCommitmentById'
import { successfulResponse } from '__fixtures__/api'
import { commitment } from '__fixtures__/authorizer'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { issuanceURL } from 'config/apiURL'

describe('useCommitmentById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns response from api correctly', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useCommitmentById(commitment._id),
        { apiService: apiObj }
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(successfulResponse.data)
        expect(getFn).toHaveBeenNthCalledWith(
          1,
          issuanceURL.commitments.getById(user._id, commitment._id)
        )
      })
    })
  })
})
