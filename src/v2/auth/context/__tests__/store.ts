import { UserStore } from '../store'
import authService from 'v2/auth/service'
import {
  getUserResponseFailure,
  getUserResponseSuccess,
  loginArgs,
  loginResponseFailure,
  loginResponseSuccess,
  signupArgs,
  signupResponseFailure,
  signupResponseSuccess,
  verifySignupArgs,
  verifySignupResponseFailure,
  verifySignupResponseSuccess
} from '__fixtures__/auth'
import { user } from '__fixtures__/user'

jest.mock('v2/auth/service')
jest.mock('v2/services/storage')
jest.mock('v2/services/socket')

const authServiceMocked = authService as jest.Mocked<typeof authService>

describe('UserStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have correct default values', () => {
    const store = new UserStore()

    expect(store.user).toBeUndefined()
    expect(store.activeTab).toBe(0)
    expect(store.isAuthenticated).toBeFalsy()
    expect(store.isVerified).toBeFalsy()
  })

  describe('setActiveTab', () => {
    it('should set an active tab equal to provided payload', () => {
      const store = new UserStore()

      store.setActiveTab(1)
      expect(store.activeTab).toBe(1)

      store.setActiveTab(2)
      expect(store.activeTab).toBe(2)
    })
  })

  describe('login', () => {
    it('should call an authService once with correct payload', async () => {
      authServiceMocked.login.mockResolvedValueOnce(loginResponseSuccess)
      const store = new UserStore()

      await store.login(loginArgs)

      expect(authService.login).toHaveBeenCalledTimes(1)
      expect(authService.login).toHaveBeenCalledWith(loginArgs)
    })

    it('should set the user to received value if Login succeeded', async () => {
      authServiceMocked.login.mockResolvedValueOnce(loginResponseSuccess)
      const store = new UserStore()

      await store.login(loginArgs)

      expect(store.user).toEqual(loginResponseSuccess.data)
      expect(store.message).toBe(loginResponseSuccess.message)
    })

    it('should have user value as undefined and error set if Login failed', async () => {
      authServiceMocked.login.mockResolvedValueOnce(loginResponseFailure)
      const store = new UserStore()

      await store.login(loginArgs)

      expect(store.user).toBeUndefined()
      expect(store.error).toBe(loginResponseFailure.message)
    })
  })

  describe('signup', () => {
    it('should call an authService once with correct payload', async () => {
      authServiceMocked.signup.mockResolvedValueOnce(signupResponseSuccess)
      const store = new UserStore()

      await store.signup(signupArgs)

      expect(authService.signup).toHaveBeenCalledTimes(1)
      expect(authService.signup).toHaveBeenCalledWith(signupArgs)
    })

    it('should set a message if signup succeeded', async () => {
      authServiceMocked.signup.mockResolvedValueOnce(signupResponseSuccess)
      const store = new UserStore()

      await store.signup(signupArgs)

      expect(store.message).toBe(signupResponseSuccess.message)
      expect(store.error).toBeFalsy()
    })

    it('should set an error if signup failed', async () => {
      authServiceMocked.signup.mockResolvedValueOnce(signupResponseFailure)
      const store = new UserStore()

      await store.signup(signupArgs)

      expect(store.message).toBeFalsy()
      expect(store.error).toBe(signupResponseFailure.message)
    })
  })

  describe('logout', () => {
    it('should set user to undefined', () => {
      const store = new UserStore()

      store.logout()

      expect(store.user).toBeUndefined()
      expect(authServiceMocked.logout).toBeCalledTimes(1)
    })
  })

  describe('verifySignup', () => {
    it('should call an authService once with correct payload', async () => {
      authServiceMocked.verifySignup.mockResolvedValueOnce(
        verifySignupResponseSuccess
      )
      const store = new UserStore()

      await store.verifySignup(verifySignupArgs)

      expect(authService.verifySignup).toHaveBeenCalledTimes(1)
      expect(authService.verifySignup).toHaveBeenCalledWith(verifySignupArgs)
    })

    it('should set a message if verification succeeded', async () => {
      authServiceMocked.verifySignup.mockResolvedValueOnce(
        verifySignupResponseSuccess
      )
      const store = new UserStore()

      await store.verifySignup(verifySignupArgs)

      expect(store.message).toBe(verifySignupResponseSuccess.message)
      expect(store.error).toBeFalsy()
    })

    it('should set an error if verification failed', async () => {
      authServiceMocked.verifySignup.mockResolvedValueOnce(
        verifySignupResponseFailure
      )
      const store = new UserStore()

      await store.verifySignup(verifySignupArgs)

      expect(store.message).toBeFalsy()
      expect(store.error).toBe(verifySignupResponseFailure.message)
    })
  })

  describe('getUser', () => {
    it('should call an authService once with correct payload', async () => {
      authServiceMocked.getUser.mockResolvedValueOnce(getUserResponseSuccess)
      const store = new UserStore()

      await store.getUser()

      expect(authService.getUser).toHaveBeenCalledTimes(1)
      expect(authService.getUser).toHaveBeenCalledWith()
    })

    it('should set the user if request succeeded', async () => {
      authServiceMocked.getUser.mockResolvedValueOnce(getUserResponseSuccess)
      const store = new UserStore()

      await store.getUser()

      expect(store.user).toEqual(getUserResponseSuccess.data)
      expect(store.message).toBe(getUserResponseSuccess.message)
      expect(store.error).toBeFalsy()
    })

    it('should set an error and logout if request failed', async () => {
      authServiceMocked.getUser.mockResolvedValueOnce(getUserResponseFailure)
      authServiceMocked.logout.mockImplementationOnce(jest.fn())
      const store = new UserStore()

      await store.getUser()

      expect(store.user).toBeUndefined()
      expect(store.message).toBeFalsy()
      expect(store.error).toBe(getUserResponseFailure.message)
      expect(authService.logout).toHaveBeenCalledTimes(1)
    })
  })

  describe('setUser', () => {
    it('should set the user to provided payload', async () => {
      const store = new UserStore()

      await store.setUser(user)

      expect(store.user).toEqual(user)
    })
  })
})
