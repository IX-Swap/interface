import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'hooks/balance/useAllBalances'
import { AssetInfo } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router'
import { balance } from '__fixtures__/balance'
import { BalanceDetails } from 'app/components/BalanceDetails'

jest.mock('app/components/BalanceDetails', () => ({
  BalanceDetails: jest.fn(() => <div />)
}))

describe('DSDepositInput', () => {
  const balanceId = 'testId'

  beforeEach(() => {
    history.push(DSRoute.deposit, { balanceId })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<AssetInfo />)
  })

  it('does not renders BalanceDetails if data is fetching', () => {
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))

    render(<AssetInfo />)

    expect(BalanceDetails).not.toHaveBeenCalled()
  })

  it('renders BalanceDetails with correct props', () => {
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: balance } })
      )

    render(<AssetInfo />)

    expect(BalanceDetails).toHaveBeenCalledWith({ data: balance }, {})
  })
})
