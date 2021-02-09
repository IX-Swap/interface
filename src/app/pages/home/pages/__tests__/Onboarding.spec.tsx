import { Onboarding } from 'app/pages/home/pages/Onboarding'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'
import { Onboarding2FADialog } from 'app/pages/home/components/Onboarding2FADialog'
import { OnboardingIdentityDialog } from 'app/pages/home/components/OnboardingIdentityDialog'
import { OnboardingAccreditedDialog } from 'app/pages/home/components/OnboardingAccreditedDialog'
import { AccessReports } from 'app/pages/home/components/AccessReports'
import { OnboardingLinks } from 'app/pages/home/components/OnboardingLinks'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'

jest.mock('app/pages/home/components/Onboarding2FADialog', () => ({
  Onboarding2FADialog: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/OnboardingIdentityDialog', () => ({
  OnboardingIdentityDialog: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/OnboardingAccreditedDialog', () => ({
  OnboardingAccreditedDialog: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/AccessReports', () => ({
  AccessReports: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/OnboardingLinks', () => ({
  OnboardingLinks: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/TopIssuers', () => ({
  TopIssuers: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/TopCorporates', () => ({
  TopCorporates: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/PromoBanner', () => ({
  PromoBanner: jest.fn(() => null)
}))

describe('Onboarding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    render(<Onboarding />)
  })

  it('renders components correctly', () => {
    render(<Onboarding />)

    expect(OnboardingLinks).toHaveBeenCalled()
    expect(AccessReports).toHaveBeenCalled()
    expect(TopIssuers).toHaveBeenCalled()
    expect(TopCorporates).toHaveBeenCalled()
    expect(PromoBanner).toHaveBeenCalled()
    expect(OnboardingIdentityDialog).toHaveBeenCalled()
    expect(OnboardingAccreditedDialog).toHaveBeenCalled()
  })

  it('renders Onboarding2FADialog correctly when user.totpConfirmed is false', () => {
    const objResponse = {
      user: { ...user, totpConfirmed: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    render(<Onboarding />)
    expect(Onboarding2FADialog).toHaveBeenCalledWith({ initOpened: true }, {})
  })
})
