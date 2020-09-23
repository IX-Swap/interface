import { adminService } from '../index'
import apiService from 'v2/services/api'
import { setUserRoleArgs, adminURLs } from '__fixtures__/admin'

describe('adminService', () => {
  beforeEach(() => {
    jest.spyOn(apiService, 'put')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('setUserRole', () => {
    it('should call an apiService.put with correct payload', async () => {
      await adminService.setUserRole(setUserRoleArgs)

      expect(apiService.put).toHaveBeenCalledTimes(1)
      expect(apiService.put).toHaveBeenCalledWith(adminURLs.setUserRole, {
        roles: setUserRoleArgs.roles
      })
    })
  })
})
