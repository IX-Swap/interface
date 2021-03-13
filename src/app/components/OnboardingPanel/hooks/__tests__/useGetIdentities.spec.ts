import { act, renderHook } from '@testing-library/react-hooks'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import * as useAllCorporateIdentities from 'app/pages/_identity/hooks/useAllCorporates'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import { waitFor, cleanup } from 'test-utils'
import { corporate, individual } from '__fixtures__/identity'

describe('useGetIdentities', () => {
  const individualIdentityResponse = {
    data: individual
  }
  const allCorporateIdentities = {
    data: { list: [corporate] }
  }
  beforeEach(() => {
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => individualIdentityResponse as any)

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporateIdentities')
      .mockImplementation(() => allCorporateIdentities as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct values', async () => {
    await act(async () => {
      const { result } = renderHook(() => useGetIdentities())

      await waitFor(
        () => {
          expect(result.current.hasIdentity).toEqual(true)
          expect(result.current.identityTypeLoaded).toEqual('individual')
          expect(result.current.identityLoaded).toEqual(individual)
          expect(result.current.individualIdentity).toEqual(individual)
          expect(result.current.corporateIdentities).toEqual({
            list: [corporate]
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
