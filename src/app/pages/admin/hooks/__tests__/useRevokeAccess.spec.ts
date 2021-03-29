import { act } from '@testing-library/react-hooks'
import { useRevokeAccess } from 'app/pages/admin/hooks/useRevokeAccess'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { authURL } from 'config/apiURL'
import { managedUser } from '__fixtures__/user'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { generatePath } from 'react-router'
import { AdminRoute } from 'app/pages/admin/router/config'

describe('useRevokeAccess', () => {
  beforeEach(() => {
    history.push(generatePath(AdminRoute.view, { userId: managedUser._id }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', async () => {
    await act(async () => {
      const deleteFn = jest
        .fn()
        .mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { delete: deleteFn }

      const { result } = renderHookWithServiceProvider(
        () => useRevokeAccess(),
        {
          apiService: apiObj
        },
        AdminRoute.view
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
