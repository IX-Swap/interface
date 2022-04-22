import { TopPanel } from 'app/components/OnboardingPanel/TopPanel'
import React from 'react'
import { render } from 'test-utils'
import { Onboarding2FA } from 'app/components/OnboardingPanel/Onboarding2FA'
import { OnboardingHome } from 'app/components/OnboardingPanel/OnboardingHome'
import { MemoryRouter } from 'react-router-dom'

jest.mock('app/components/OnboardingPanel/OnboardingHome', () => ({
  OnboardingHome: jest.fn(() => null)
}))

jest.mock('app/components/OnboardingPanel/Onboarding2FA', () => ({
  Onboarding2FA: jest.fn(() => null)
}))

describe('TopPanel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct component based on path', () => {
    render(
      <MemoryRouter initialEntries={['/app/settings/setup-2fa']}>
        <TopPanel />
      </MemoryRouter>
    )
    expect(Onboarding2FA).toHaveBeenCalled()
  })

  it('renders default component when no path name is matched', () => {
    render(
      <MemoryRouter initialEntries={['/app/accounts']}>
        <TopPanel />
      </MemoryRouter>
    )
    expect(OnboardingHome).toHaveBeenCalled()
  })
})
