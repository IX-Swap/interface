/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'v2/hooks/balance/useAllBalances'
import { BalancesList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList'
import { balance } from '__fixtures__/balance'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

describe('BalancesList', () => {
  const balanceId = 'testId'

  beforeEach(() => {
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue({ data: { map: { [balanceId]: balance } } })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BalancesList />)
  })
})
