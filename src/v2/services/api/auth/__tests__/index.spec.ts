import authService from '../index'
import apiService from 'v2/services/api'
import storageService from 'v2/services/storage'
import socketService from 'v2/services/socket'
import {
  loginArgs,
  loginResponseFailure,
  loginResponseSuccess,
  authURLs,
  signupResponseSuccess,
  signupArgs,
  signupResponseFailure,
  verifySignupResponseSuccess,
  verifySignupArgs,
  verifySignupResponseFailure, getUserResponseSuccess, getUserResponseFailure
} from '__fixtures__/auth'
import { userKey, userValue, visitedURLKey, visitedURLValue } from '__fixtures__/storage'
import User from '../../../../types/user'
import { APIServiceResponse } from '../../types'

jest.mock('v2/services/api')
jest.mock('v2/services/storage')
jest.mock('v2/services/socket')

const apiServiceMock = apiService as jest.Mocked<typeof apiService>
const storageServiceMock = storageService as jest.Mocked<typeof storageService>
const socketServiceMock = socketService as jest.Mocked<typeof socketService>

describe('authService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should call an apiService.post with correct payload', async () => {
      apiServiceMock.post.mockResolvedValueOnce(loginResponseSuccess)

      await authService.login(loginArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(authURLs.login, loginArgs)
    })

    it('should handle success', async () => {
      apiServiceMock.post.mockResolvedValueOnce(loginResponseSuccess)

      const response = await authService.login(loginArgs)

      expect(response).toEqual<APIServiceResponse<User>>(response)
      expect(storageServiceMock.set).toHaveBeenCalledTimes(2)
      expect(storageServiceMock.set).toHaveBeenNthCalledWith(1, userKey, userValue)
      expect(storageServiceMock.set).toHaveBeenNthCalledWith(2, visitedURLKey, visitedURLValue)
    })

    it('should handle failure', async () => {
      apiServiceMock.post.mockResolvedValueOnce(loginResponseFailure)

      const response = await authService.login(loginArgs)

      expect(response).toEqual<APIServiceResponse<User>>(loginResponseFailure)
      expect(storageServiceMock.set).not.toHaveBeenCalled()
    })
  })

  describe('signup', () => {
    it('should call an apiService.post with correct payload', async () => {
      apiServiceMock.post.mockResolvedValueOnce(signupResponseSuccess)

      await authService.signup(signupArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(authURLs.signup, signupArgs)
    })

    it('should handle success', async () => {
      apiServiceMock.post.mockResolvedValueOnce(signupResponseSuccess)

      const response = await authService.signup(signupArgs)

      expect(response).toEqual<APIServiceResponse>(response)
    })

    it('should handle failure', async () => {
      apiServiceMock.post.mockResolvedValueOnce(signupResponseFailure)

      const response = await authService.login(signupArgs)

      expect(response).toEqual<APIServiceResponse>(signupResponseFailure)
    })
  })

  describe('signup', () => {
    it('should call an apiService.post with correct payload', async () => {
      apiServiceMock.post.mockResolvedValueOnce(verifySignupResponseSuccess)

      await authService.verifySignup(verifySignupArgs)

      expect(apiService.post).toHaveBeenCalledTimes(1)
      expect(apiService.post).toHaveBeenCalledWith(authURLs.verifySignup, verifySignupArgs)
    })

    it('should handle success', async () => {
      apiServiceMock.post.mockResolvedValueOnce(verifySignupResponseSuccess)

      const response = await authService.verifySignup(verifySignupArgs)

      expect(response).toEqual<APIServiceResponse>(response)
    })

    it('should handle failure', async () => {
      apiServiceMock.post.mockResolvedValueOnce(verifySignupResponseFailure)

      const response = await authService.verifySignup(verifySignupArgs)

      expect(response).toEqual<APIServiceResponse>(verifySignupResponseFailure)
    })
  })

  describe('getUser', () => {
    it('should call an apiService.get with correct user id from localStorage', async () => {
      apiServiceMock.get.mockResolvedValueOnce(getUserResponseSuccess)
      storageServiceMock.get.mockReturnValueOnce(userValue)
      const url = `${authURLs.getUser}/${userValue._id}`

      await authService.getUser()

      expect(apiService.get).toHaveBeenCalledTimes(1)
      expect(apiService.get).toHaveBeenCalledWith(url)
    })

    it('should call an apiService.get with no user id if localStorage is empty', async () => {
      apiServiceMock.get.mockResolvedValueOnce(getUserResponseFailure)
      storageServiceMock.get.mockReturnValueOnce(undefined)
      const url = `${authURLs.getUser}/`

      await authService.getUser()

      expect(apiService.get).toHaveBeenCalledTimes(1)
      expect(apiService.get).toHaveBeenCalledWith(url)
    })

    it('should handle success', async () => {
      apiServiceMock.get.mockResolvedValueOnce(getUserResponseSuccess)
      socketServiceMock._subscribeToSocket.mockImplementationOnce(jest.fn())

      const response = await authService.getUser()

      expect(response).toEqual<APIServiceResponse<User>>(getUserResponseSuccess)
      expect(socketServiceMock._subscribeToSocket).toHaveBeenCalledTimes(1)
    })

    it('should handle failure', async () => {
      apiServiceMock.get.mockResolvedValueOnce(getUserResponseFailure)
      socketServiceMock._subscribeToSocket.mockImplementationOnce(jest.fn())

      const response = await authService.getUser()

      expect(response).toEqual<APIServiceResponse<User>>(getUserResponseFailure)
      expect(socketServiceMock._subscribeToSocket).not.toHaveBeenCalled()
    })
  })
})
