import { HomeOnboardingSteps } from 'app/components/OnboardingPanel/HomeOnboardingSteps'
import * as useOnboardingSteps from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/components/OnboardingPanel/OnboardingSteps', () => ({
  OnboardingSteps: jest.fn(() => null)
}))

describe('HomeOnboardingSteps', () => {
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

  it.skip('renders without errors', () => {
    render(<HomeOnboardingSteps />)
  })

  // it('renders OnboardingSteps correctly', () => {
  //   render(<HomeOnboardingSteps />)

  //   expect(OnboardingSteps).toHaveBeenCalledWith(
  //     {
  //       ...onboardingSteps
  //     },
  //     {}
  //   )
  // })
})
