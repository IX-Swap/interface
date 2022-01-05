import { act } from '@testing-library/react-hooks'
import { useReset2FA } from 'app/pages/admin/hooks/useReset2FA'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { authURL } from 'config/apiURL'
import { generateMutationResult } from '__fixtures__/useQuery'
import { usersQueryKeys } from 'config/queryKeys'
import { history } from 'config/history'
import { AdminRoute } from 'app/pages/admin/router/config'
import { generatePath } from 'react-router-dom'

describe('useReset2FA', () => {
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
        () => useReset2FA(successHandlerMock),
        {
          apiService: apiObj
        },
        AdminRoute.view
      )

      await waitFor(
        () => {
          const [mutate] = result.current.mutation
          void mutate(true)

          expect(postFn).toHaveBeenCalledWith(
            authURL.reset2fa(managedUser._id),
            { otp: '' }
          )

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
