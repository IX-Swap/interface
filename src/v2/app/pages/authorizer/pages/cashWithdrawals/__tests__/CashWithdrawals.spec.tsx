/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CashWithdrawals,
  renderWithdrawal
} from 'v2/app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'
import WithdrawalView from 'v2/app/components/withdrawal-preview'
import { cashWithdrawal } from '__fixtures__/authorizer'

jest.mock('v2/app/components/withdrawal-preview', () => jest.fn(() => null))

describe('CashWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CashWithdrawals />)
  })

  describe('renderWithdrawal', () => {
    it('renders WithdrawalView component with correct data', () => {
      const withdrawalView = renderWithdrawal(cashWithdrawal)
      expect(withdrawalView).toEqual(
        <WithdrawalView withdrawal={cashWithdrawal} />
      )
    })
  })
})
