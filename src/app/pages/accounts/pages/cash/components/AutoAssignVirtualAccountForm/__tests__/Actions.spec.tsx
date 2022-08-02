import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/cash/components/Actions'
import React from 'react'
import { render } from 'test-utils'
import { cashBalance, cashBalanceSubmitted } from '__fixtures__/balance'
import { CashStatus } from 'app/pages/accounts/pages/cash/components/CashStatus'

jest.mock('app/pages/accounts/pages/cash/components/CashStatus', () => ({
  CashStatus: jest.fn(() => null)
}))

describe('Actions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('displays action buttons for status Approved', async () => {
    const props: ActionsProps = {
      item: cashBalance
    }
    const { getByText } = render(<Actions {...props} />)

    expect(getByText('Deposit')).toBeTruthy()
    expect(getByText('Withdraw')).toBeTruthy()
  })
  it('displays action buttons for status Approved', async () => {
    const props: ActionsProps = {
      item: cashBalanceSubmitted
    }
    render(<Actions {...props} />)

    expect(CashStatus).toHaveBeenCalledWith(
      {
        item: cashBalanceSubmitted
      },
      {}
    )
  })
})
