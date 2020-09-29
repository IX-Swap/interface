import { changePasswordService } from '../index'
import apiService from 'v2/services/api'
import storageService from 'v2/services/storage'
import { changePasswordArgs, securityURLs } from '__fixtures__/security'
import { user } from '__fixtures__/user'

describe('changePasswordService', () => {
  beforeEach(() => {
    jest.spyOn(apiService, 'post')
    jest.spyOn(storageService, 'get').mockReturnValue(user)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('changePassword', () => {
    it('should call an apiService.post with correct payload', async () => {
      await changePasswordService.changePassword(changePasswordArgs)
      const { newPassword, oldPassword } = changePasswordArgs
      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(
        securityURLs.changePassword,
        { newPassword, oldPassword }
      )
    })
  })
})
