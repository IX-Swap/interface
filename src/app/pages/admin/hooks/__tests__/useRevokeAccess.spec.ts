import { act } from '@testing-library/react-hooks'
import { useRevokeAccess } from 'app/pages/admin/hooks/useRevokeAccess'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { authURL } from 'config/apiURL'
import { managedUser } from '__fixtures__/user'
import * as useAdminRouter from 'app/pages/admin/router'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useRevokeAccess', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', async () => {
    await act(async () => {
      jest
        .spyOn(useAdminRouter, 'useAdminRouter')
        .mockImplementation(
          () => ({ params: { userId: managedUser._id } } as any)
        )

      const deleteFn = jest
        .fn()
        .mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { delete: deleteFn }

      const { result } = renderHookWithServiceProvider(
        () => useRevokeAccess(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          const sessionId = undefined
          void mutate(sessionId)

          expect(deleteFn).toHaveBeenCalledWith(authURL.revokeAccess, {
            userId: managedUser._id,
            sessionId: sessionId
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
