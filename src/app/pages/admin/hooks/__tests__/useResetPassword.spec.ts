import { act } from '@testing-library/react-hooks'
import { useResetPassword } from 'app/pages/admin/hooks/useResetPassword'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { authURL } from 'config/apiURL'
import { generateMutationResult } from '__fixtures__/useQuery'
import * as useAdminRouter from 'app/pages/admin/router'
import { usersQueryKeys } from 'config/queryKeys'

describe('useResetPassword', () => {
  const qc = ReactQuery.queryCache
  qc.invalidateQueries = jest.fn(() => null) as any

  beforeEach(() => {
    jest.spyOn(ReactQuery, 'useQueryCache').mockReturnValue(qc)
  })

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

      const postFn = jest.fn().mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { post: postFn }
      const successHandlerMock = jest.fn()

      const { result } = renderHookWithServiceProvider(
        () => useResetPassword(managedUser.email, successHandlerMock),
        {
          apiService: apiObj
        }
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
