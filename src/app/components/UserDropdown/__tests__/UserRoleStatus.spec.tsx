import React from 'react'
import { render } from 'test-utils'
import { UserRoleStatus } from 'app/components/UserDropdown/UserRoleStatus'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

describe('UserRoleStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<UserRoleStatus />)
  })

  it.skip('renders with correct status when Individual Identity Journey was completed successful', () => {
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockReturnValue({ isIndividualJourneyCompleted: true } as any)
    const { getByText } = render(<UserRoleStatus />)
    const message = getByText('Individual Investor')

    expect(message).toBeInTheDocument()
  })

  it.skip('renders with correct status when Corporate Identity Journey was completed successful', () => {
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockReturnValue({ isInvestorJourneyCompleted: true } as any)
    const { getByText } = render(<UserRoleStatus />)
    const message = getByText('Corporate Investor')

    expect(message).toBeInTheDocument()
  })

  it.skip('renders with correct status when Corporate Issuer Identity Journey was completed successful', () => {
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockReturnValue({ isIssuerJourneyCompleted: true } as any)
    const { getByText } = render(<UserRoleStatus />)
    const message = getByText('Corporate Issuer')

    expect(message).toBeInTheDocument()
  })

  it.skip('renders with correct status when Corporate and Corporate Issuer Identity Journeys were completed successful', () => {
    jest.spyOn(useOnboardingJourneys, 'useOnboardingJourneys').mockReturnValue({
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: true
    } as any)
    const { getByText } = render(<UserRoleStatus />)
    const message = getByText('Issuer/Investor')

    expect(message).toBeInTheDocument()
  })

  it("renders without status when any of Identity Journeys weren't completed successful", () => {
    jest.spyOn(useOnboardingJourneys, 'useOnboardingJourneys').mockReturnValue({
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false
    } as any)
    const { container } = render(<UserRoleStatus />)

    expect(container).toBeEmpty()
  })
})
