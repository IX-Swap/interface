import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useIssuanceQueryHook from 'app/pages/issuance/hooks/useIssuanceQuery'
import { dso } from '__fixtures__/authorizer'
import { issuanceURL } from 'config/apiURL'
import { useInvestorsByCountry } from 'app/pages/issuance/hooks/useInvestorsByCountry'

describe('useInvestorsByCountry', () => {
  const sampleData = { singapore: 100 }
  const getFn = jest.fn().mockResolvedValueOnce({ data: sampleData })
  const apiObj = { get: getFn }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct response from api', async () => {
    jest
      .spyOn(useIssuanceQueryHook, 'useIssuanceQuery')
      .mockImplementation(() => ({
        apiService: apiObj as any,
        dsoId: dso._id,
        queryEnabled: true
      }))

    await act(async () => {
      const { result } = renderHookWithServiceProvider(() =>
        useInvestorsByCountry()
      )

      await waitFor(() => {
        expect(result.current.status).toBe('success')
        expect(result.current.data).toBe(sampleData)
        expect(getFn).toHaveBeenCalledWith(
          issuanceURL.dso.topCountries(dso._id)
        )
      })
    })
  })

  it('it does not make an api call if query enabled is false', async () => {
    jest
      .spyOn(useIssuanceQueryHook, 'useIssuanceQuery')
      .mockImplementation(() => ({
        apiService: apiObj as any,
        dsoId: dso._id,
        queryEnabled: false
      }))

    await act(async () => {
      renderHookWithServiceProvider(() => useInvestorsByCountry())

      await waitFor(() => {
        expect(getFn).not.toHaveBeenCalled()
      })
    })
  })
})
