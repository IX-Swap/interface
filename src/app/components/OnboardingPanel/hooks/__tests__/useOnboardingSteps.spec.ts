import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useOnboardingSteps } from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import * as useAuth from 'hooks/auth/useAuth'

describe('useOnboardingSteps', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct initial stepper data', () => {
    const objResponse = {
      user: {
        totpConfirmed: false
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { result } = renderHook(() => useOnboardingSteps())

    expect(result.current.activeStep).toEqual(0)
  })

  it('returns correct stepper data when totpConfirmed is true', () => {
    const objResponse = {
      user: {
        totpConfirmed: true
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { result } = renderHook(() => useOnboardingSteps())

    expect(result.current.activeStep).toEqual(1)
  })
})
