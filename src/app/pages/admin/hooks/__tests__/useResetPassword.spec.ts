import { act } from '@testing-library/react-hooks'
import { useResetPassword } from 'app/pages/admin/hooks/useResetPassword'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { authURL } from 'config/apiURL'
import { generateMutationResult } from '__fixtures__/useQuery'
import { usersQueryKeys } from 'config/queryKeys'
import { generatePath } from 'react-router-dom'
import { history } from 'config/history'
import { AdminRoute } from 'app/pages/admin/router/config'

describe('useResetPassword', () => {
  const qc = ReactQuery.queryCache
  qc.invalidateQueries = jest.fn(() => null) as any

  beforeEach(() => {
    history.push(generatePath(AdminRoute.view, { userId: managedUser._id }))
    jest.spyOn(ReactQuery, 'useQueryCache').mockReturnValue(qc)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { post: postFn }
      const successHandlerMock = jest.fn()

      const { result } = renderHookWithServiceProvider(
        () => useResetPassword(managedUser.email, successHandlerMock),
        {
          apiService: apiObj
        },
        AdminRoute.view
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(true)

          expect(postFn).toHaveBeenCalledWith(authURL.resetPassword, {
            email: managedUser.email
          })

          expect(qc.invalidateQueries).toHaveBeenCalledWith(
            usersQueryKeys.getUserById(managedUser._id)
          )
          expect(successHandlerMock).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
