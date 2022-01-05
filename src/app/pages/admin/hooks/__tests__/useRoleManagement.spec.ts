import { act } from '@testing-library/react-hooks'
import { useRoleManagement } from 'app/pages/admin/hooks/useRoleManagement'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { managedUser } from '__fixtures__/user'
import * as useSetRoles from 'app/pages/admin/hooks/useSetRoles'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { AdminRoute } from 'app/pages/admin/router/config'

describe('useRoleManagement', () => {
  const initialRoles = managedUser.roles.split(',')

  beforeEach(() => {
    history.push(generatePath(AdminRoute.view, { userId: managedUser._id }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    await act(async () => {
      const setRoleFn = jest.fn()
      jest
        .spyOn(useSetRoles, 'useSetRoles')
        .mockImplementation(() => [setRoleFn] as any)

      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useRoleManagement(initialRoles),
        {
          apiService: apiObj
        },
        AdminRoute.view
      )

      await waitFor(
        () => {
          expect(result.current.selectedRoles).toEqual(initialRoles)

          void result.current.handleChange({ target: { name: 'admin' } })
          expect(result.current.selectedRoles).toEqual([
            'user',
            'accredited',
            'issuer',
            'authorizer'
          ])

          void result.current.handleChange({ target: { name: 'admin' } })
          expect(result.current.selectedRoles).toEqual(initialRoles)

          void result.current.handleUpdate()
          expect(setRoleFn).toHaveBeenCalledWith({
            userId: managedUser._id,
            roles: initialRoles.join(',')
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
