import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'

describe('ContentWrapper', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )
  })
})
