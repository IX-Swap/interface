/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'v2/hooks/balance/useAllBalances'
import { BalancesList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList'
import { balance } from '__fixtures__/balance'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import LabelValue from 'v1/components/LabelValue'
import { history } from 'v2/history'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

jest.mock('v1/components/LabelValue', () => jest.fn(() => null))

describe('BalancesList', () => {
  const balanceId = 'testId'

  beforeEach(() => {
    history.push(DSRoute.deposit, { balanceId })
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: balance } })
      )
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<BalancesList />)
  })
  it('renders LabelValue with correct props', () => {
    render(<BalancesList />)

    expect(LabelValue).toHaveBeenCalledTimes(3)
    expect(LabelValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Total Balance:', value: 123 },
      {}
    )
    expect(LabelValue).toHaveBeenNthCalledWith(
      2,
      { label: 'On Hold Balance:', value: 1 },
      {}
    )
    expect(LabelValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Available Balance:', value: 1 },
      {}
    )
  })
})
