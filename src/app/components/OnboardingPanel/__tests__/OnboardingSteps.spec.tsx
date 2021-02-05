import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import * as useOnboardingSteps from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'

describe('OnboardingSteps', () => {
  const objResponse = {
    activeStep: 0,
    onboardingSteps: [
      { title: 'Step One', content: ['This is step one'] },
      { title: 'Step Two', content: ['This is step two'] }
    ]
  }

  beforeEach(() => {
    jest
      .spyOn(useOnboardingSteps, 'useOnboardingSteps')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OnboardingSteps />)
  })

  it('renders steps correctly', () => {
    const { getByText } = render(<OnboardingSteps />)

    expect(getByText('Step One')).toBeTruthy()
    expect(getByText('This is step one')).toBeTruthy()
    expect(getByText('Step Two')).toBeTruthy()
    expect(getByText('This is step two')).toBeTruthy()
  })
})
