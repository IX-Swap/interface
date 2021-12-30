import { act, renderHook } from '@testing-library/react-hooks'
import {
  defaultOnboardingSteps,
  getIdentityOnboardingSteps
} from 'app/components/OnboardingPanel/hooks/utils'
import { waitFor } from 'test-utils'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { useHomeOnboardingSteps } from 'app/components/OnboardingPanel/hooks/useHomeOnboardingSteps'

describe('useHomeOnboardingSteps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct values when multiple journeys active', async () => {
    const getOnboardingJourneysResponse = {
      isMultipleJourneysActive: true
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(defaultOnboardingSteps)
          expect(result.current.activeStep).toEqual(1)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when details of issuance have no status', async () => {
    const getOnboardingJourneysResponse = {
      detailsOfIssuance: {}
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when details of issuance have submitted status', async () => {
    const getOnboardingJourneysResponse = {
      detailsOfIssuance: {
        status: 'Submitted'
      }
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true,
        issuanceDetailsStatus: 'Submitted'
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(1)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when details of issuance have approved status', async () => {
    const getOnboardingJourneysResponse = {
      detailsOfIssuance: {
        status: 'Approved'
      }
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true,
        issuanceDetailsStatus: 'Approved'
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when individual identity journey started', async () => {
    const getOnboardingJourneysResponse = {
      hasActiveIdentityJourney: true,
      isIndividualJourneyStarted: true
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps({
        identityType: 'individual',
        identityStatus: ''
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when corporate identity journey started', async () => {
    const getOnboardingJourneysResponse = {
      hasActiveIdentityJourney: true,
      isInvestorJourneyStarted: true,
      investorIdentities: [
        {
          status: ''
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const corporateSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: ''
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(corporateSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when issuer identity journey started', async () => {
    const getOnboardingJourneysResponse = {
      hasActiveIdentityJourney: true,
      isIssuerJourneyStarted: true,
      issuerIdentities: [
        {
          status: ''
        }
      ]
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when individual identity journey completed and have status submitted', async () => {
    const getOnboardingJourneysResponse = {
      hasActiveIdentityJourney: true,
      isIndividualJourneyStarted: true,
      isIndividualJourneyCompleted: true,
      individualIdentity: {
        status: 'Submitted'
      }
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps({
        identityType: 'individual',
        identityStatus: 'Submitted'
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(3)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when individual identity journey completed and have status approved', async () => {
    const getOnboardingJourneysResponse = {
      hasActiveIdentityJourney: true,
      isIndividualJourneyStarted: true,
      isIndividualJourneyCompleted: true,
      individualIdentity: {
        status: 'Approved'
      }
    }
    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => getOnboardingJourneysResponse as any)

    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps({
        identityType: 'individual',
        identityStatus: 'Approved'
      })

      const { result } = renderHook(() => useHomeOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(4)
        },
        { timeout: 1000 }
      )
    })
  })
})
