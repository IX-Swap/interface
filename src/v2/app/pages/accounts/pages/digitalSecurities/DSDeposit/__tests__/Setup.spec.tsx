/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'v2/hooks/balance/useAllBalances'

import { DSDepositInput } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'v2/history'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { balance } from '__fixtures__/balance'

describe('DSDepositInput', () => {
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
    render(<DSDepositInput />)
  })

  it('renders balance name & symbol', () => {
    const { container } = render(<DSDepositInput />)
    expect(container).toHaveTextContent(`${balance.name} (${balance.symbol})`)
  })
})
