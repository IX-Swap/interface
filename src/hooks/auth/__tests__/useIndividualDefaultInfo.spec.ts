import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useIndividualDefaultInfo } from 'hooks/auth/useIndividualDefaultInfo'
import { user } from '__fixtures__/user'

describe('useIndividualDefaultInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns user individual default info', async () => {
    await act(async () => {
      const getFn = jest.fn().mockReturnValue(user)
      const storageObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useIndividualDefaultInfo(undefined),
        {
          storageService: storageObj
        }
      )

      await waitFor(
        () => {
          expect(getFn).toHaveBeenCalledWith('user')
          expect(result.current.email).toBe('alex@investax.io')
          expect(result.current.firstName).toBe('Alex')
          expect(result.current.lastName).toBe('Solovev')
          expect(result.current.isDisabled).toBe(true)
        },
        { timeout: 1000 }
      )
    })
  })
})
