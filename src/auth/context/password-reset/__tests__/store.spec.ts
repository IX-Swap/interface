import PasswordResetStore from 'auth/context/password-reset/store'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { user } from '__fixtures__/user'

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
    it('should set current step to provided payload', () => {
      const store = new PasswordResetStore()

      store.setCurrentStep(PasswordResetStep.Reset)
      expect(store.currentStep).toBe(PasswordResetStep.Reset)
    })
  })

  describe('setEmail', () => {
    it('should set email to provided payload', () => {
      const store = new PasswordResetStore()

      store.setEmail(user.email)
      expect(store.email).toBe(user.email)
    })
  })
})
