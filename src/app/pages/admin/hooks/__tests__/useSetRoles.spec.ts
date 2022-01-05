import { act } from '@testing-library/react-hooks'
import { useSetRoles, SetRolesArgs } from 'app/pages/admin/hooks/useSetRoles'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useSetRoles', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    await act(async () => {
      const patchFn = jest
        .fn()
        .mockResolvedValueOnce(generateMutationResult({}))
      const adminServiceObj = { setUserRole: patchFn }

      const onSuccessMock = jest.fn()
      const onErrorMock = jest.fn()

      const args: SetRolesArgs = {
        onSuccess: onSuccessMock,
        onError: onErrorMock
      }

      const { result } = renderHookWithServiceProvider(
        () => useSetRoles(args),
        {
          adminService: adminServiceObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(onSuccessMock).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
