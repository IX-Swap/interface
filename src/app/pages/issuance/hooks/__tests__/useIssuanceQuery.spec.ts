import { useIssuanceQuery } from 'app/pages/issuance/hooks/useIssuanceQuery'
import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

describe('useIssuanceQuery', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct data if dsoId is valid', async () => {
    history.push(
      generatePath(IssuanceRoute.view, {
        dsoId: 'dso-id',
        issuerId: 'issuer-id'
      })
    )

    const apiObj = {}

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIssuanceQuery(),
        { apiService: apiObj },
        IssuanceRoute.view
      )

      await waitFor(() => {
        expect(result.current.dsoId).toBe('dso-id')
        expect(result.current.queryEnabled).toBe(true)
      })
    })
  })

  it('returns correct data if dsoId is ":dsoId"', async () => {
    history.push(
      generatePath(IssuanceRoute.view, {
        dsoId: ':dsoId',
        issuerId: ':issuerId'
      })
    )

    const apiObj = {}

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIssuanceQuery(),
        { apiService: apiObj },
        IssuanceRoute.view
      )

      await waitFor(() => {
        expect(result.current.dsoId).toBe(':dsoId')
        expect(result.current.queryEnabled).toBe(false)
      })
    })
  })
})
