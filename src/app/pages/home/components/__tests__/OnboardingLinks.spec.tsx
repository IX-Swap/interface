import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useIdentitiesRouter from 'app/pages/_identity/router'
import { OnboardingLink } from 'app/pages/home/components/OnboardingLink'
import { OnboardingLinks } from 'app/pages/home/components/OnboardingLinks'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

jest.mock('app/pages/home/components/OnboardingLink', () => ({
  OnboardingLink: jest.fn(() => null)
}))

describe('OnboardingLinks', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      paths: {
        createIndividual: '/create/individuals',
        createCorporate: '/create/corporate',
        createIssuer: '/create/corporate'
      }
    }

    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => objResponse as any)

    render(<OnboardingLinks />)
  })

  it('renders all links if user has no completed Indentity Journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false
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
        to: '/create/individuals'
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Corporate',
        to: '/create/corporate'
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Fundraise',
        to: '/create/corporate'
      }),
      {}
    )
  })

  it('renders links if user has completed Individual Indentity Journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: true
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
        to: '/create/individuals'
      }),
      {}
    )
  })

  it('renders links if user has complete Corporate Identity Journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false
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
        to: '/create/corporate'
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: '/create/corporate'
      }),
      {}
    )
  })

  it('renders links if user has complete Issuer Identity Journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false
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
        to: '/create/corporate'
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: '/create/corporate'
      }),
      {}
    )
  })

  it('renders links if user has complete Corporate and Issuer Identity Journeys', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false
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
        to: '/create/corporate'
      }),
      {}
    )
    expect(OnboardingLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Fundraise',
        to: '/create/corporate'
      }),
      {}
    )
  })
})
