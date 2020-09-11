import authService from '../index'
import apiService from 'v2/services/api'
import {
  loginArgs,
  authURLs,
  signupArgs,
  verifySignupArgs,
  requestPasswordResetArgs,
  completePasswordResetArgs
} from '__fixtures__/auth'
import { userValue } from '__fixtures__/storage'

// jest.mock('v2/services/api')
// jest.mock('v2/services/storage')
// jest.mock('v2/services/socket')
//
// const apiServiceMock = apiService as jest.Mocked<typeof apiService>
// const storageServiceMock = storageService as jest.Mocked<typeof storageService>
// const socketServiceMock = socketService as jest.Mocked<typeof socketService>

describe('authService', () => {
  beforeEach(() => {
    jest.spyOn(apiService, 'post')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should call an apiService.post with correct payload', async () => {
      await authService.login(loginArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(authURLs.login, loginArgs)
    })

    // it('should handle success', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(loginResponseSuccess)
    //
    //   const response = await authService.login(loginArgs)
    //
    //   expect(response).toEqual(response)
    //   expect(storageServiceMock.set).toHaveBeenCalledTimes(2)
    //   expect(storageServiceMock.set).toHaveBeenNthCalledWith(
    //     1,
    //     userKey,
    //     userValue
    //   )
    //   expect(storageServiceMock.set).toHaveBeenNthCalledWith(
    //     2,
    //     visitedURLKey,
    //     visitedURLValue
    //   )
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(loginResponseFailure)
    //
    //   const response = await authService.login(loginArgs)
    //
    //   expect(response).toEqual(loginResponseFailure)
    //   expect(storageServiceMock.set).not.toHaveBeenCalled()
    // })
  })

  describe('signup', () => {
    it('should call an apiService.post with correct payload', async () => {
      await authService.signup(signupArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(authURLs.signup, signupArgs)
    })

    // it('should handle success', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(signupResponseSuccess)
    //
    //   const response = await authService.signup(signupArgs)
    //
    //   expect(response).toEqual(response)
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(signupResponseFailure)
    //
    //   const response = await authService.login(signupArgs)
    //
    //   expect(response).toEqual(signupResponseFailure)
    // })
  })

  describe('signup', () => {
    it('should call an apiService.post with correct payload', async () => {
      await authService.verifySignup(verifySignupArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(
        authURLs.verifySignup,
        verifySignupArgs
      )
    })

    // it('should handle success', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(verifySignupResponseSuccess)
    //
    //   const response = await authService.verifySignup(verifySignupArgs)
    //
    //   expect(response).toEqual(response)
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(verifySignupResponseFailure)
    //
    //   const response = await authService.verifySignup(verifySignupArgs)
    //
    //   expect(response).toEqual(verifySignupResponseFailure)
    // })
  })

  describe('getUser', () => {
    it('should call an apiService.get with correct user id from localStorage', async () => {
      jest.spyOn(apiService, 'get')
      const url = `${authURLs.getUser}/${userValue._id}`

      await authService.getUser({ userId: userValue._id })

      expect(apiService.get).toHaveBeenCalledTimes(1)
      expect(apiService.get).toHaveBeenCalledWith(url)
    })

    // it('should call an apiService.get with no user id if localStorage is empty', async () => {
    //   apiServiceMock.get.mockResolvedValueOnce(getUserResponseFailure)
    //   storageServiceMock.get.mockReturnValueOnce(undefined)
    //   const url = `${authURLs.getUser}/`
    //
    //   await authService.getUser()
    //
    //   expect(apiService.get).toHaveBeenCalledTimes(1)
    //   expect(apiService.get).toHaveBeenCalledWith(url)
    // })
    //
    // it('should handle success', async () => {
    //   apiServiceMock.get.mockResolvedValueOnce(getUserResponseSuccess)
    //   socketServiceMock._subscribeToSocket.mockImplementationOnce(jest.fn())
    //
    //   const response = await authService.getUser()
    //
    //   expect(response).toEqual(getUserResponseSuccess)
    //   expect(socketServiceMock._subscribeToSocket).toHaveBeenCalledTimes(1)
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.get.mockResolvedValueOnce(getUserResponseFailure)
    //   socketServiceMock._subscribeToSocket.mockImplementationOnce(jest.fn())
    //
    //   const response = await authService.getUser()
    //
    //   expect(response).toEqual(getUserResponseFailure)
    //   expect(socketServiceMock._subscribeToSocket).not.toHaveBeenCalled()
    // })
  })

  // describe('logout', () => {
  //   it('should remove user and visitedUrl from storage', () => {
  //     storageServiceMock.remove.mockImplementationOnce(jest.fn())
  //     const store = new UserStore()
  //
  //     store.logout()
  //
  //     expect(storageServiceMock.remove).toHaveBeenCalledTimes(2)
  //     expect(storageServiceMock.remove).toHaveBeenNthCalledWith(1, userKey)
  //     expect(storageServiceMock.remove).toHaveBeenNthCalledWith(
  //       2,
  //       visitedURLKey
  //     )
  //   })
  // })

  describe('requestPasswordReset', () => {
    it('should call an apiService.post with correct email', async () => {
      await authService.requestPasswordReset(requestPasswordResetArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(
        authURLs.requestPasswordReset,
        requestPasswordResetArgs
      )
    })

    // it('should handle success', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(
    //     requestPasswordResetResponseSuccess
    //   )
    //
    //   const response = await authService.requestPasswordReset(
    //     requestPasswordResetArgs
    //   )
    //
    //   expect(response).toEqual(requestPasswordResetResponseSuccess)
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(
    //     requestPasswordResetResponseFailure
    //   )
    //
    //   const response = await authService.requestPasswordReset(
    //     requestPasswordResetArgs
    //   )
    //
    //   expect(response).toEqual(requestPasswordResetResponseFailure)
    // })
  })

  describe('completePasswordReset', () => {
    it('should call an apiService.post with correct email, token & newPassword', async () => {
      await authService.completePasswordReset(completePasswordResetArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(
        authURLs.completePasswordReset,
        completePasswordResetArgs
      )
    })

    // it('should handle success', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(
    //     completePasswordResetResponseSuccess
    //   )
    //
    //   const response = await authService.completePasswordReset(
    //     completePasswordResetArgs
    //   )
    //
    //   expect(response).toEqual(completePasswordResetResponseSuccess)
    // })
    //
    // it('should handle failure', async () => {
    //   apiServiceMock.post.mockResolvedValueOnce(
    //     completePasswordResetResponseFailure
    //   )
    //
    //   const response = await authService.completePasswordReset(
    //     completePasswordResetArgs
    //   )
    //
    //   expect(response).toEqual(completePasswordResetResponseFailure)
    // })
  })
})
