import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'

describe('useIssuanceQuery', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data if dsoId is valid', async () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockImplementation(() => ({ params: { dsoId: 'dso-id' } } as any))
    const apiObj = {}

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIssuanceQuery(),
        { apiService: apiObj }
      )

      await waitFor(() => {
        expect(result.current.dsoId).toBe('dso-id')
        expect(result.current.queryEnabled).toBe(true)
      })
    })
  })

  it('returns correct data if dsoId is undefined', async () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockImplementation(() => ({ params: { dsoId: undefined } } as any))
    const apiObj = {}

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIssuanceQuery(),
        { apiService: apiObj }
      )

      await waitFor(() => {
        expect(result.current.dsoId).toBe(undefined)
        expect(result.current.queryEnabled).toBe(false)
      })
    })
  })

  it('returns correct data if dsoId is ":dsoId"', async () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockImplementation(() => ({ params: { dsoId: ':dsoId' } } as any))
    const apiObj = {}

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIssuanceQuery(),
        { apiService: apiObj }
      )

      await waitFor(() => {
        expect(result.current.dsoId).toBe(':dsoId')
        expect(result.current.queryEnabled).toBe(false)
      })
    })
  })
})
