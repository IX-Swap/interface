import { TopPanel } from 'app/components/OnboardingPanel/TopPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Onboarding2FA } from 'app/components/OnboardingPanel/Onboarding2FA'
import { OnboardingHome } from 'app/components/OnboardingPanel/OnboardingHome'
import { MemoryRouter } from 'react-router-dom'

jest.mock('app/__tests__/OnboardingPanel/OnboardingHome', () => ({
  OnboardingHome: jest.fn(() => null)
}))

jest.mock('app/__tests__/OnboardingPanel/Onboarding2FA', () => ({
  Onboarding2FA: jest.fn(() => null)
}))

describe('TopPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TopPanel />)
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
