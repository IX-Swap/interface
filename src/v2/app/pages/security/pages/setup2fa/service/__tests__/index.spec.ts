import { setup2faService } from '../index'
import apiService from 'v2/services/api'
import storageService from 'v2/services/storage'
import { securityURLs, enable2faArgs } from '__fixtures__/security'
import { user } from '__fixtures__/user'

describe('setup2faService', () => {
  beforeEach(() => {
    jest.spyOn(apiService, 'post')
    jest.spyOn(storageService, 'get').mockReturnValue(user)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('enable2fa', () => {
    it('should call an apiService.post with correct payload', async () => {
      await setup2faService.enable2fa(enable2faArgs)
      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(securityURLs.enable2Fa, {})
    })
  })
  describe('setup2fa', () => {
    it('should call an apiService.post with correct payload', async () => {
      await setup2faService.setup2fa()
      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(securityURLs.setup2Fa, {})
    })
  })
})
