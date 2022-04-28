import { act, renderHook } from '@testing-library/react-hooks'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import * as useAllCorporateIdentities from 'app/pages/identity/hooks/useAllCorporates'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import { waitFor } from 'test-utils'
import { corporate, individual } from '__fixtures__/identity'

describe('useGetIdentities', () => {
  const individualIdentityResponse = {
    data: individual
  }
  const allCorporateIdentities = {
    data: { list: [corporate] }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct values', async () => {
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => individualIdentityResponse as any)

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporates')
      .mockImplementation(() => allCorporateIdentities as any)

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

  it('returns correct identityLoaded value', async () => {
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockReturnValue({ data: undefined } as any)

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporates')
      .mockImplementation(() => allCorporateIdentities as any)

    await act(async () => {
      const { result } = renderHook(() => useGetIdentities())

      await waitFor(
        () => {
          expect(result.current.identityLoaded).toEqual(corporate)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct values if individualIdentity is undefined and corporateIdentities length < 1', async () => {
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockReturnValue({ data: undefined } as any)

    jest.spyOn(useAllCorporateIdentities, 'useAllCorporates').mockReturnValue({
      data: { list: [] }
    } as any)

    await act(async () => {
      const { result } = renderHook(() => useGetIdentities())

      await waitFor(
        () => {
          expect(result.current.hasIdentity).toEqual(false)
          expect(result.current.identityTypeLoaded).toEqual('corporate')
          expect(result.current.identityLoaded).toEqual(undefined)
        },
        { timeout: 1000 }
      )
    })
  })
})
