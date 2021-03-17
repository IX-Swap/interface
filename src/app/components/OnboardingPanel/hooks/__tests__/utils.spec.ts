import {
  getIdentityOnboardingSteps,
  getIdentityStatus
} from 'app/components/OnboardingPanel/hooks/utils'
import { cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

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

    const authorizedStepContent = getIdentityStatus('Approved')
    expect(authorizedStepContent).toEqual(['Verified!'])

    const defaultStepContent = getIdentityStatus()
    expect(defaultStepContent).toEqual(['In Progress'])
  })
})
