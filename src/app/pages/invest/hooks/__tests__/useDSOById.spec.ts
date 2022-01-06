import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { successfulResponse } from '__fixtures__/api'
import { dso } from '__fixtures__/authorizer'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useDSOById', () => {
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
        () => useDSOById(dso._id, dso.user),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
          expect(getFn).toHaveBeenCalledTimes(1)
          expect(getFn).toHaveBeenCalledWith(
            `/issuance/dso/${user._id}/${dso._id}`
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns response from api correctly if issuerId is not defined', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useDSOById(dso._id, undefined),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(successfulResponse.data)
          expect(getFn).toHaveBeenCalledTimes(1)
          expect(getFn).toHaveBeenCalledWith(
            `/issuance/dso/${user._id}/${dso._id}`
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
