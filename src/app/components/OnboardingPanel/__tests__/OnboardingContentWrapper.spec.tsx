import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { history } from 'config/history'

jest.mock('app/__tests__/OnboardingPanel/OnboardingPanel', () => ({
  OnboardingPanel: jest.fn(() => null)
}))

jest.mock('auth/__tests__/LoadingFullScreen', () => ({
  LoadingFullScreen: jest.fn(() => null)
}))

describe('ContentWrapper', () => {
  beforeEach(() => {
    history.push('/app/home')
  })

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
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      isIssuerJourneyStarted: false,
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

  it('does not render wrapper if user completed issuer onboarding journey and not started corporate investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      isInvestorJourneyStarted: false,
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

  it('renders wrapper if user completed issuer onboarding journey and started corporate investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      isInvestorJourneyStarted: true,
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
    expect(OnboardingPanel).not.toHaveBeenCalled()
  })

  it('renders wrapper if user completed corporate investor onboarding journey and started issuer onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      isIssuerJourneyStarted: true,
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
    expect(OnboardingPanel).not.toHaveBeenCalled()
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
