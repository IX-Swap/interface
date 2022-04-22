import { CorporateOnboardingSteps } from 'app/components/OnboardingPanel/CorporateOnboardingSteps'
import * as useOnboardingSteps from 'app/hooks/onboarding/useOnboardingSteps'
import React from 'react'
import { render } from 'test-utils'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'

jest.mock('app/components/OnboardingPanel/OnboardingSteps', () => ({
  OnboardingSteps: jest.fn(() => null)
}))

describe('CorporateOnboardingSteps', () => {
  const onboardingSteps = {
    activeStep: 1,
    steps: [
      {
        title: 'Step 1',
        content: ['This is step 1']
      }
    ]
  }
  beforeEach(() => {
    jest
      .spyOn(useOnboardingSteps, 'useOnboardingSteps')
      .mockImplementation(() => onboardingSteps as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders OnboardingSteps correctly', () => {
    render(<CorporateOnboardingSteps />)

    expect(OnboardingSteps).toHaveBeenCalledWith(
      {
        ...onboardingSteps
      },
      {}
    )
  })
})
