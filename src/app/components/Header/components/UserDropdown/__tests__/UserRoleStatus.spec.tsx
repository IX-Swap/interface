import React from 'react'
import { render } from 'test-utils'
import * as useOnboardingJourneys from 'app/hooks/onboarding/useOnboardingJourneys'
import { UserRoleStatus } from 'app/components/Header/components/UserDropdown/UserRoleStatus/UserRoleStatus'

describe('UserRoleStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct content if isIndividualJourneyCompleted is true', () => {
    const objResponse = {
      isIndividualJourneyCompleted: true,
      isCorporateJourneyCompleted: false,
      corporateIdentities: []
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<UserRoleStatus />)

    expect(container).toHaveTextContent('Individual Investor')
  })

  it('renders correct content if isCorporateJourneyCompleted is true and corporateIdentities type is investor', () => {
    const objResponse = {
      isIndividualJourneyCompleted: false,
      isCorporateJourneyCompleted: true,
      corporateIdentities: [{ type: 'investor' }]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<UserRoleStatus />)

    expect(container).toHaveTextContent('Corporate Investor')
  })

  it('renders correct content if isCorporateJourneyCompleted is true and corporateIdentities type is issuer', () => {
    const objResponse = {
      isIndividualJourneyCompleted: false,
      isCorporateJourneyCompleted: true,
      corporateIdentities: [{ type: 'issuer' }]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<UserRoleStatus />)

    expect(container).toHaveTextContent('Corporate Issuer')
  })

  it('renders empty component if other cases', () => {
    const objResponse = {
      isIndividualJourneyCompleted: false,
      isCorporateJourneyCompleted: true,
      corporateIdentities: [{ type: '' }]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<UserRoleStatus />)

    expect(container).toBeEmptyDOMElement()
  })
})
