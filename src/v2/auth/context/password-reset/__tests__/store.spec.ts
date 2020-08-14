import PasswordResetStore from 'v2/auth/context/password-reset/store'
import authService from 'v2/auth/service'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import {
  completePasswordResetArgs,
  completePasswordResetResponseFailure,
  completePasswordResetResponseSuccess,
  requestPasswordResetArgs,
  requestPasswordResetResponseFailure,
  requestPasswordResetResponseSuccess
} from '__fixtures__/auth'

jest.mock('v2/auth/service')
jest.mock('v2/services/storage')
jest.mock('v2/services/socket')

const authServiceMocked = authService as jest.Mocked<typeof authService>

describe('PasswordResetStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have correct default values', () => {
    const store = new PasswordResetStore()

    expect(store.email).toBeFalsy()
    expect(store.currentStep).toBe(PasswordResetStep.Request)
  })

  describe('setCurrentStep', () => {
    it('should set current step equal to provided payload', () => {
      const store = new PasswordResetStore()

      store.setCurrentStep(PasswordResetStep.Reset)
      expect(store.currentStep).toBe(PasswordResetStep.Reset)

      store.setCurrentStep(PasswordResetStep.Confirmation)
      expect(store.currentStep).toBe(PasswordResetStep.Confirmation)
    })
  })

  describe('requestReset', () => {
    it('should call authService.requestPasswordReset once with correct payload', async () => {
      authServiceMocked.requestPasswordReset.mockResolvedValueOnce(
        requestPasswordResetResponseSuccess
      )
      const store = new PasswordResetStore()

      await store.requestReset(requestPasswordResetArgs)

      expect(authService.requestPasswordReset).toHaveBeenCalledTimes(1)
      expect(authService.requestPasswordReset).toHaveBeenCalledWith(
        requestPasswordResetArgs
      )
    })

    it('should set email to provided value and proceed to the next step if request succeeded', async () => {
      authServiceMocked.requestPasswordReset.mockResolvedValueOnce(
        requestPasswordResetResponseSuccess
      )
      const store = new PasswordResetStore()

      await store.requestReset(requestPasswordResetArgs)

      expect(store.email).toEqual(requestPasswordResetArgs.email)
      expect(store.message).toBe(requestPasswordResetResponseSuccess.message)
      expect(store.currentStep).toBe(PasswordResetStep.Reset)
    })

    it('should set error message if request failed', async () => {
      authServiceMocked.requestPasswordReset.mockResolvedValueOnce(
        requestPasswordResetResponseFailure
      )
      const store = new PasswordResetStore()

      await store.requestReset(requestPasswordResetArgs)

      expect(store.message).toBeFalsy()
      expect(store.error).toBe(requestPasswordResetResponseFailure.message)
    })
  })

  describe('completeReset', () => {
    it('should call authService.completePasswordReset once with correct payload', async () => {
      authServiceMocked.completePasswordReset.mockResolvedValueOnce(
        completePasswordResetResponseSuccess
      )
      const store = new PasswordResetStore()

      await store.completeReset(completePasswordResetArgs)

      expect(authService.completePasswordReset).toHaveBeenCalledTimes(1)
      expect(authService.completePasswordReset).toHaveBeenCalledWith(
        completePasswordResetArgs
      )
    })

    it('should set correct message and proceed to the next step if request succeeded', async () => {
      authServiceMocked.completePasswordReset.mockResolvedValueOnce(
        completePasswordResetResponseSuccess
      )
      const store = new PasswordResetStore()

      await store.completeReset(completePasswordResetArgs)

      expect(store.message).toBe(completePasswordResetResponseSuccess.message)

      expect(store.currentStep).toBe(PasswordResetStep.Confirmation)
    })

    it('should set error message if request failed', async () => {
      authServiceMocked.completePasswordReset.mockResolvedValueOnce(
        completePasswordResetResponseFailure
      )
      const store = new PasswordResetStore()

      await store.completeReset(completePasswordResetArgs)

      expect(store.message).toBeFalsy()
      expect(store.error).toBe(completePasswordResetResponseFailure.message)
    })
  })
})
