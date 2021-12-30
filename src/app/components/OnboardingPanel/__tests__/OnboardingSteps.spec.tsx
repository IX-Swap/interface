import React from 'react'
import { render } from 'test-utils'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'

describe('OnboardingSteps', () => {
  const onboardingSteps = [
    { title: 'Step One', content: ['This is step one'] },
    { title: 'Step Two', content: ['This is step two'] }
  ]

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OnboardingSteps steps={onboardingSteps} activeStep={0} />)
  })

  it('renders steps correctly', () => {
    const { getByText } = render(
      <OnboardingSteps steps={onboardingSteps} activeStep={0} />
    )

    expect(getByText('Step One')).toBeTruthy()
    expect(getByText('This is step one')).toBeTruthy()
    expect(getByText('Step Two')).toBeTruthy()
    expect(getByText('This is step two')).toBeTruthy()
  })
})
