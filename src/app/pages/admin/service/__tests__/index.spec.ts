import { adminService } from '../index'
import apiService from 'services/api'
import { setUserRoleArgs, adminURLs } from '__fixtures__/admin'

describe('adminService', () => {
  beforeEach(() => {
    jest.spyOn(apiService, 'patch')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('setUserRole', () => {
    it('should call an apiService.put with correct payload', async () => {
      await adminService.setUserRole(setUserRoleArgs)

      expect(apiService.patch).toHaveBeenCalledTimes(1)
      expect(apiService.patch).toHaveBeenCalledWith(adminURLs.setUserRole, {
        roles: setUserRoleArgs.roles
      })
    })
  })
})
