import { IndividualOnboardingSteps } from 'app/components/OnboardingPanel/IndividualOnboardingSteps'
import * as useOnboardingSteps from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'

jest.mock('app/__tests__/OnboardingPanel/OnboardingSteps', () => ({
  OnboardingSteps: jest.fn(() => null)
}))

describe('IndividualOnboardingSteps', () => {
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndividualOnboardingSteps />)
  })

  it('renders OnboardingSteps correctly', () => {
    render(<IndividualOnboardingSteps />)

    expect(OnboardingSteps).toHaveBeenCalledWith(
      {
        ...onboardingSteps
      },
      {}
    )
  })
})
