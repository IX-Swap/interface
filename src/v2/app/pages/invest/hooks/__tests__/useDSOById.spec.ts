/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { successfulResponse } from '__fixtures__/api'
import { dso } from '__fixtures__/authorizer'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useDSOById', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns response from api correctly', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: false })
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
      .mockReturnValue({ user: user, isAuthenticated: false })
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

  it('returns response from api correctly if user and issuerId are not defined', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: undefined, isAuthenticated: false })
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
          expect(getFn).toHaveBeenCalledWith(`/issuance/dso/${''}/${dso._id}`)
        },
        { timeout: 1000 }
      )
    })
  })
})
