import { act, renderHook } from '@testing-library/react-hooks'
import { useHasIdentity } from 'app/pages/educationCentre/hooks/useHasIdentity'
import * as useAllCorporateIdentities from 'app/pages/identity/hooks/useAllCorporates'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import { QueryStatus } from 'react-query'
import { waitFor, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useHasIdentity', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct isLoaded and hasIdentity values when individual or corporate identities have data', async () => {
    const individualIdentity = generateQueryResult({
      data: { name: 'Individual' },
      queryStatus: QueryStatus.Success
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => individualIdentity as any)

    const objResponse = generateQueryResult({
      data: { list: ['one', 'two'] },
      queryStatus: QueryStatus.Success
    })

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporates')
      .mockImplementation(() => objResponse as any)

    await act(async () => {
      const { result } = renderHook(() => useHasIdentity())

      await waitFor(
        () => {
          expect(result.current.hasIdentity).toEqual(true)
          expect(result.current.isLoaded).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct isLoaded and hasIdentity values when individual or corporate identities do not have data', async () => {
    const individualIdentity = generateQueryResult({
      data: undefined,
      queryStatus: QueryStatus.Success
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => individualIdentity as any)

    const objResponse = generateQueryResult({
      data: { list: [] },
      queryStatus: QueryStatus.Success
    })

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporates')
      .mockImplementation(() => objResponse as any)

    await act(async () => {
      const { result } = renderHook(() => useHasIdentity())

      await waitFor(
        () => {
          expect(result.current.hasIdentity).toEqual(false)
          expect(result.current.isLoaded).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })
})
