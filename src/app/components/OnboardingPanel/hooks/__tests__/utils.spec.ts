import {
  getIdentityOnboardingSteps,
  getIdentityStatus
} from 'app/components/OnboardingPanel/hooks/utils'
import {} from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('getIdentityOnboardingSteps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct steps and status', () => {
    const steps = getIdentityOnboardingSteps({
      identityType: 'individual',
      identityStatus: individual.status
    })

    expect(steps).toEqual([
      { title: 'Get Started', content: ['Access platform and reports'] },
      { title: 'To Invest', content: ['As individual'] },
      { title: 'Create Identity', content: ['For verification'] },
      { title: 'Complete Onboarding', content: [''] }
    ])
  })
})

describe('getIdentityStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct step content', () => {
    const rejectedStepContent = getIdentityStatus('Rejected')
    expect(rejectedStepContent).toEqual(['Rejected'])

    const submittedStepContent = getIdentityStatus('Submitted')
    expect(submittedStepContent).toEqual(['For verification'])

    const authorizedStepContent = getIdentityStatus('Approved')
    expect(authorizedStepContent).toEqual(['Verified!'])

    const draftStepContent = getIdentityStatus('Draft')
    expect(draftStepContent).toEqual(['In progress'])

    const skippedStepContent = getIdentityStatus('Skipped')
    expect(skippedStepContent).toEqual(['Skipped'])

    const defaultStepContent = getIdentityStatus()
    expect(defaultStepContent).toEqual([''])
  })
})
