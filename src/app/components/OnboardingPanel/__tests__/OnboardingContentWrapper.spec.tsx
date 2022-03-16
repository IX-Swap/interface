import React from 'react'
import { render } from 'test-utils'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { history } from 'config/history'

jest.mock('app/components/OnboardingPanel/OnboardingPanel', () => ({
  OnboardingPanel: jest.fn(() => null)
}))

jest.mock('auth/components/LoadingFullScreen', () => ({
  LoadingFullScreen: jest.fn(() => null)
}))

describe('ContentWrapper', () => {
  beforeEach(() => {
    history.push('/app/settings')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('does not render wrapper when not in the onboardingPages path', () => {
    history.push('/some/other/path')

    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('does not render wrapper if user completed individual investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('does not render wrapper if user completed corporate investor onboarding journey and not started issuer onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isCorporateJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      isCorporateJourneyStarted: false,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('renders wrapper if user started individual investor onboarding journey', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started all onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isInvestorJourneyStarted: true,
      isIssuerJourneyStarted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started individual and corporate investor onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isInvestorJourneyStarted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started individual investor and issuer onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isIssuerJourneyStarted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started corporate investor and issuer onboarding journeys', () => {
    const objResponse = {
      isInvestorJourneyStarted: true,
      isIssuerJourneyStarted: true,
      isIdentitiesLoaded: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders only progress bar if identities not loaded', () => {
    const objResponse = {
      isIdentitiesLoaded: false
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingContentWrapper>
        <div />
      </OnboardingContentWrapper>
    )

    expect(LoadingFullScreen).toHaveBeenCalled()
    expect(OnboardingPanel).not.toHaveBeenCalled()
  })
})
