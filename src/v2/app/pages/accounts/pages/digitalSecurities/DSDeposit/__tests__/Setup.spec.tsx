/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'v2/hooks/balance/useAllBalances'

import { DSDepositInput } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup'
import { asset } from '__fixtures__/authorizer'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

describe('DSDepositInput', () => {
  const balanceId = 'testId'

  beforeEach(() => {
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue({ data: { map: { [balanceId]: asset } } })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSDepositInput />)
  })

  it('renders balance name & symbol', () => {
    const { container } = render(<DSDepositInput />)
    expect(container).toHaveTextContent(`${asset.name} (${asset.symbol})`)
  })
})
