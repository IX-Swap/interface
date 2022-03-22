import React from 'react'
import { render } from 'test-utils'
import { OnboardingLink } from 'app/pages/educationCentre/components/OnboardingLink'
import { OnboardingLinks } from 'app/pages/educationCentre/components/OnboardingLinks'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { history } from 'config/history'
import { AppRoute } from 'app/router/config'
import { IdentityRoute } from 'app/pages/identity/router/config'

jest.mock('app/pages/educationCentre/components/OnboardingLink', () => ({
  OnboardingLink: jest.fn(() => null)
}))

describe('OnboardingLinks', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    history.push(AppRoute.identity)
  })

  it('renders all links if user has no completed Indentity Journey', () => {
    const objResponse = {
      isCorporateJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      corporateIdentities: [
        {
          type: 'investor'
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<OnboardingLinks />)
    expect(getByText('Invest')).toBeTruthy()
    expect(getByText('Raise Capital')).toBeTruthy()
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Individual',
        to: IdentityRoute.createIndividual
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Corporate',
        to: IdentityRoute.createCorporate
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Fundraise',
        to: IdentityRoute.createDetailsOfIssuance
      }),
      {}
    )
  })

  it('renders only individual investor link if user completed individual investor onboarding journey', () => {
    const objResponse = {
      isCorporateJourneyCompleted: false,
      isIndividualJourneyCompleted: true,
      corporateIdentities: [
        {
          type: 'investor'
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { getByText, queryByText } = render(<OnboardingLinks />)
    expect(getByText('Invest')).toBeTruthy()
    expect(queryByText('Raise Capital')).toBeNull()
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Individual',
        to: IdentityRoute.createIndividual
      }),
      {}
    )
  })

  it('renders only corporate and issuer links if user completed corporate investor journey', () => {
    const objResponse = {
      isCorporateJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      corporateIdentities: [
        {
          type: 'issuer'
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<OnboardingLinks />)
    expect(getByText('Invest')).toBeTruthy()
    expect(getByText('Raise Capital')).toBeTruthy()

    expect(OnboardingLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Corporate',
        to: IdentityRoute.createCorporate
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: IdentityRoute.createDetailsOfIssuance
      }),
      {}
    )
  })

  it('renders only corporate links if user completed issuer journey', () => {
    const objResponse = {
      isCorporateJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      corporateIdentities: [
        {
          type: 'issuer'
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<OnboardingLinks />)
    expect(getByText('Invest')).toBeTruthy()
    expect(getByText('Raise Capital')).toBeTruthy()

    expect(OnboardingLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Corporate',
        to: IdentityRoute.createCorporate
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: IdentityRoute.createDetailsOfIssuance
      }),
      {}
    )
  })

  it('renders only corporate links if user completed both corporate and issuer journeys', () => {
    const objResponse = {
      isCorporateJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      corporateIdentities: [
        {
          type: 'investor'
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<OnboardingLinks />)
    expect(getByText('Invest')).toBeTruthy()
    expect(getByText('Raise Capital')).toBeTruthy()

    expect(OnboardingLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Corporate',
        to: IdentityRoute.createCorporate
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: IdentityRoute.createDetailsOfIssuance
      }),
      {}
    )
  })
})
