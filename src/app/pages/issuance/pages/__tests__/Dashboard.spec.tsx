import { Dashboard } from 'app/pages/fundsManagement/pages/Dashboard'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useVCCFundStats from 'app/pages/issuance/hooks/useVCCFundStats'
import { fakeSubFundStats } from '__fixtures__/vccDashboard'
import { history } from 'config/history'

jest.mock('app/pages/issuance/components/DSOFilters/DSOFilters', () => ({
  DSOFilters: jest.fn(() => null)
}))

describe('Dashboard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    history.push(`/?subfunds=fakesubfundid`)

    jest.spyOn(useVCCFundStats, 'useVCCFundStats').mockReturnValue({
      subFundStats: generateQueryResult({
        data: fakeSubFundStats,
        isLoading: false
      }),
      subFundInvestmentStats: generateQueryResult({})
    })

    const { container } = render(<Dashboard />)
    expect(container).toMatchSnapshot()
  })
})
