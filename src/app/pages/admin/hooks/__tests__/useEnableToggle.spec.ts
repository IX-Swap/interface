import { act } from '@testing-library/react-hooks'
import { useEnabledToggle } from 'app/pages/admin/hooks/useEnabledToggle'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import * as ReactQuery from 'react-query'
import { userURL } from 'config/apiURL'
import { generateMutationResult } from '__fixtures__/useQuery'
import { usersQueryKeys } from 'config/queryKeys'

describe('useEnabledToggle', () => {
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
      const patchFn = jest
        .fn()
        .mockResolvedValueOnce(generateMutationResult({}))
      const apiObj = { patch: patchFn }
      const successHandlerMock = jest.fn()

      const { result } = renderHookWithServiceProvider(
        () => useEnabledToggle(true, successHandlerMock),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(true)

          expect(patchFn).toHaveBeenCalledWith(userURL.enableUser, {
            userId: managedUser._id,
            enabled: false
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
