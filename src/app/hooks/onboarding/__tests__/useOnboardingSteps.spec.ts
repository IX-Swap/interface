import { act, renderHook } from '@testing-library/react-hooks'
import * as useGetIdentities from 'app/hooks/onboarding/useGetIdentities'
import { useOnboardingSteps } from 'app/hooks/onboarding/useOnboardingSteps'
import { getIdentityOnboardingSteps } from 'app/hooks/onboarding/utils'
import { waitFor } from 'test-utils'
import { individual, corporate } from '__fixtures__/identity'

describe('useOnboardingSteps', () => {
  const getIdentitiesResponse = {
    hasIdentity: true,
    identityLoaded: individual,
    identityTypeLoaded: 'individual',
    individualIdentity: individual,
    corporateIdentities: {
      list: []
    }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct values when no identity type is passed', async () => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResponse as any)

    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps({
        identityType: 'individual',
        identityStatus: individual.status
      })
      const { result } = renderHook(() => useOnboardingSteps())

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(3)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when individual identity type is passed', async () => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResponse as any)

    await act(async () => {
      const individualSteps = getIdentityOnboardingSteps({
        identityType: 'individual',
        identityStatus: individual.status
      })
      const { result } = renderHook(() => useOnboardingSteps('individual'))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(individualSteps)
          expect(result.current.activeStep).toEqual(3)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when corporate identity type is passed', async () => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResponse as any)

    await act(async () => {
      const corporateSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: ''
      })
      const { result } = renderHook(() => useOnboardingSteps('corporate'))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(corporateSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when corporate identity type is passed and asIssuer is true', async () => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true
      })
      const { result } = renderHook(() => useOnboardingSteps('corporate', true))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(1)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when details of issuance have submitted status', async () => {
    const extendedGetIdentitiesResponse = {
      ...getIdentitiesResponse,
      identityLoaded: corporate,
      detailsOfIssuance: {
        status: 'Submitted'
      }
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => extendedGetIdentitiesResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true,
        issuanceDetailsStatus: 'Submitted'
      })
      const { result } = renderHook(() => useOnboardingSteps('corporate', true))

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
    const extendedGetIdentitiesResponse = {
      ...getIdentitiesResponse,
      identityLoaded: corporate,
      detailsOfIssuance: {
        status: 'Approved'
      }
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => extendedGetIdentitiesResponse as any)

    await act(async () => {
      const asIssuerSteps = getIdentityOnboardingSteps({
        identityType: 'corporate',
        identityStatus: '',
        asIssuer: true,
        issuanceDetailsStatus: 'Approved'
      })
      const { result } = renderHook(() => useOnboardingSteps('corporate', true))

      await waitFor(
        () => {
          expect(result.current.steps).toEqual(asIssuerSteps)
          expect(result.current.activeStep).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })
})
