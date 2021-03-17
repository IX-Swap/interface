import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import * as useIdentitiesRouter from 'app/pages/_identity/router'
import * as useSecurityRouter from 'app/pages/security/router'
import * as useHomeRouter from 'app/pages/home/router'
import { MemoryRouter } from 'react-router-dom'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

jest.mock('app/components/OnboardingPanel/OnboardingPanel', () => ({
  OnboardingPanel: jest.fn(() => null)
}))

describe('ContentWrapper', () => {
  const identitiesRouter = {
    paths: {
      createIndividual: '/individual',
      createCorporate: '/corporate',
      createIssuer: '/corporate'
    }
  }
  const securityRouter = {
    paths: {
      setup2fa: '/setup2fa'
    }
  }

  const homeRouter = {
    paths: {
      landing: '/home'
    }
  }

  beforeEach(() => {
    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => identitiesRouter as any)
    jest
      .spyOn(useSecurityRouter, 'useSecurityRouter')
      .mockImplementation(() => securityRouter as any)
    jest
      .spyOn(useHomeRouter, 'useHomeRouter')
      .mockImplementation(() => homeRouter as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )
  })

  it('does not render wrapper when not in the onboardingPages path', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/accounts']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('does not render wrapper if user completed individual investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('does not render wrapper if user completed corporate investor onboarding journey and not started issuer onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      isIssuerJourneyStarted: false
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('does not render wrapper if user completed issuer onboarding journey and not started corporate investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      isInvestorJourneyStarted: false
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('renders wrapper if user completed issuer onboarding journey and started corporate investor onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: true,
      isInvestorJourneyCompleted: false,
      isIndividualJourneyCompleted: false,
      isInvestorJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user completed corporate investor onboarding journey and started issuer onboarding journey', () => {
    const objResponse = {
      isIssuerJourneyCompleted: false,
      isInvestorJourneyCompleted: true,
      isIndividualJourneyCompleted: false,
      isIssuerJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started individual investor onboarding journey', () => {
    const objResponse = {
      isIndividualJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started all onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isInvestorJourneyStarted: true,
      isIssuerJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started individual and corporate investor onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isInvestorJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started individual investor and issuer onboarding journeys', () => {
    const objResponse = {
      isIndividualJourneyStarted: true,
      isIssuerJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })

  it('renders wrapper if user started corporate investor and issuer onboarding journeys', () => {
    const objResponse = {
      isInvestorJourneyStarted: true,
      isIssuerJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => objResponse as any)

    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )

    expect(OnboardingPanel).toHaveBeenCalled()
  })
})
