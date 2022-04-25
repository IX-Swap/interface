import { act, renderHook } from '@testing-library/react-hooks'
import * as useGetIdentities from 'app/hooks/onboarding/useGetIdentities'
import { waitFor } from 'test-utils'
import { corporate, detailsOfIssuance, individual } from '__fixtures__/identity'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'

describe('useOnboardingJourneys', () => {
  const getIdentitiesResult = {
    hasIdentity: false,
    identityTypeLoaded: 'individual',
    identityLoaded: individual,
    individualIdentity: individual,
    corporateIdentities: { list: [corporate] },
    isIdentitiesLoaded: false,
    detailsOfIssuance: detailsOfIssuance,
    isLoadingIdentities: false
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct values', async () => {
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => getIdentitiesResult as any)

    await act(async () => {
      const { result } = renderHook(() => useOnboardingJourneys())

      await waitFor(
        () => {
          expect(result.current.isIdentitiesLoaded).toEqual(
            getIdentitiesResult.isIdentitiesLoaded
          )
          expect(result.current.hasActiveIdentityJourney).toEqual(true)
          expect(result.current.individualIdentity).toEqual(
            getIdentitiesResult.individualIdentity
          )
          expect(result.current.isIndividualJourneyStarted).toEqual(true)
          expect(result.current.isIndividualJourneyCompleted).toEqual(false)
          expect(result.current.corporateIdentities).toEqual(
            getIdentitiesResult.corporateIdentities.list
          )
          expect(result.current.isCorporateJourneyStarted).toEqual(true)
          expect(result.current.isCorporateJourneyCompleted).toEqual(false)
          expect(result.current.getIsJourneyCompleted('individual')).toEqual(
            false
          )
          expect(result.current.getIsJourneyCompleted('corporate')).toEqual(
            false
          )
          expect(result.current.detailsOfIssuance).toEqual(
            getIdentitiesResult.detailsOfIssuance
          )
          expect(result.current.isMultipleJourneysActive).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values when in identities authorizations has items with approved status', async () => {
    const identitiesResult = {
      ...getIdentitiesResult,
      individualIdentity: {
        ...individual,
        authorizations: [{ status: 'Approved' }]
      },
      corporateIdentities: {
        list: [
          {
            ...corporate,
            authorizations: [
              {
                status: 'Approved'
              }
            ]
          }
        ]
      }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => identitiesResult as any)

    await act(async () => {
      const { result } = renderHook(() => useOnboardingJourneys())

      await waitFor(
        () => {
          expect(result.current.isIndividualJourneyCompleted).toEqual(true)

          expect(result.current.isCorporateJourneyCompleted).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })
})
