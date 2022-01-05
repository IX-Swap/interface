import { act } from '@testing-library/react-hooks'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { userURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { managedUser } from '__fixtures__/user'

describe('useUserById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return response from api correctly', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useUserById(managedUser._id),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
          expect(getFn).toHaveBeenCalledTimes(1)
          expect(getFn).toHaveBeenCalledWith(
            userURL.getUserById(managedUser._id)
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
