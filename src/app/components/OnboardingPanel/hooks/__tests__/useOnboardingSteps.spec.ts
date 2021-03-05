import { act, renderHook } from '@testing-library/react-hooks'
import * as useGetIdentities from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import {
  useOnboardingSteps,
  getIdentityOnboardingSteps,
  getIdentityStatus
} from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import { waitFor, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('useOnboardingSteps', () => {
  const getIdentitiesResponse = {
    hasIdentity: true,
    identityLoaded: individual,
    identityTypeLoaded: 'individual',
    individualIdentity: individual,
    corporateIdentities: {
      list: []
    }
  }

  beforeEach(() => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct values when no identity type is passed', async () => {
    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps(
        'individual',
        individual.status
      )
      const { result } = renderHook(() => useOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(3)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when individual identity type is passed', async () => {
    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps(
        'individual',
        individual.status
      )
      const { result } = renderHook(() => useOnboardingSteps('individual'))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(3)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when corporate identity type is passed', async () => {
    await act(async () => {
      const corporateSteps = getIdentityOnboardingSteps('corporate', 'Draft')
      const { result } = renderHook(() => useOnboardingSteps('corporate'))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(corporateSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when corporate identity type is passed and asIssuer is true', async () => {
    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps(
        'corporate',
        'Draft',
        true
      )
      const { result } = renderHook(() => useOnboardingSteps('corporate', true))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(1)
        },
        { timeout: 1000 }
      )
    })
  })
})

describe('getIdentityOnboardingSteps', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct steps and status', () => {
    const steps = getIdentityOnboardingSteps('individual', individual.status)

    expect(steps).toEqual([
      { title: 'Get Started', content: ['Access platform and reports'] },
      { title: 'To Invest', content: ['As individual'] },
      { title: 'Create Identity', content: ['For Verification'] },
      { title: 'Complete Onboarding', content: [''] }
    ])
  })
})

describe('getIdentityStatus', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct step content', () => {
    const rejectedStepContent = getIdentityStatus('Rejected')
    expect(rejectedStepContent).toEqual(['Rejected'])

    const submittedStepContent = getIdentityStatus('Submitted')
    expect(submittedStepContent).toEqual(['For Verification'])

    const authorizedStepContent = getIdentityStatus('Authorized')
    expect(authorizedStepContent).toEqual(['Verified!'])

    const defaultStepContent = getIdentityStatus()
    expect(defaultStepContent).toEqual(['In Progress'])
  })
})
