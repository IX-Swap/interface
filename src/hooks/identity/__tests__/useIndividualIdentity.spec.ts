import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { user } from '__fixtures__/user'
import { individual } from '__fixtures__/identity'

describe('useIndividualIdentity', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest
        .fn()
        .mockResolvedValueOnce({ data: { data: individual } })
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useIndividualIdentity(),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith(
            `/identity/individuals/${user._id}`
          )

          expect(result.current.data).toEqual({ data: individual })
        },
        { timeout: 1000 }
      )
    })
  })
})
