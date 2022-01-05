import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useIssuanceQueryHook from 'app/pages/issuance/hooks/useIssuanceQuery'
import { dso } from '__fixtures__/authorizer'
import { investmentGrowthChartData } from '__fixtures__/chart'
import { issuanceURL } from 'config/apiURL'
import { useInvestmentGrowth } from 'app/pages/issuance/hooks/useInvestmentGrowth'

describe('useInvestmentGrowth', () => {
  const getFn = jest
    .fn()
    .mockResolvedValueOnce({ data: investmentGrowthChartData })
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
        useInvestmentGrowth()
      )

      await waitFor(() => {
        expect(result.current.status).toBe('success')
        expect(result.current.data).toBe(investmentGrowthChartData)
        expect(getFn).toHaveBeenCalledWith(
          issuanceURL.dso.investmentGrowth(dso._id)
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
      renderHookWithServiceProvider(() => useInvestmentGrowth())

      await waitFor(() => {
        expect(getFn).not.toHaveBeenCalled()
      })
    })
  })
})
