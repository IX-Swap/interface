import React from 'react'
import { render } from 'test-utils'
import { Dashboard } from 'app/pages/accounts/pages/dashboard/Dashboard'
import * as useGetPortfolios from 'app/pages/accounts/hooks/useGetPortfolios'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { generateQueryResult } from '__fixtures__/useQuery'
import { fakePortfolio } from '__fixtures__/portfolio'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel',
  () => ({
    TopInfoPanel: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio',
  () => ({
    MarketPortfolio: jest.fn(() => null)
  })
)

describe('Dashboard', () => {
  jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
    isAuthenticated: true,
    user
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders preloader when data is loading', () => {
    const objResponse = generateQueryResult({
      data: fakePortfolio,
      isLoading: true
    })

    jest
      .spyOn(useGetPortfolios, 'useGetPortfolios')
      .mockReturnValue(objResponse)

    render(<Dashboard />)

    expect(LoadingIndicator).toHaveBeenCalledTimes(1)
  })

  it('renders children with correct props when data is loaded', () => {
    const objResponse = generateQueryResult({
      data: fakePortfolio,
      isLoading: false
    })

    jest
      .spyOn(useGetPortfolios, 'useGetPortfolios')
      .mockReturnValue(objResponse)

    render(<Dashboard />)

    expect(TopInfoPanel).toHaveBeenCalledWith(
      {
        accounts: fakePortfolio.accounts,
        balances: fakePortfolio.balances
      },
      {}
    )

    expect(MarketPortfolio).toHaveBeenCalledWith(
      {
        type: 'primary',
        currencySymbol: 'US$',
        marketInfo: fakePortfolio.primaryMarket
      },
      {}
    )
  })
})
