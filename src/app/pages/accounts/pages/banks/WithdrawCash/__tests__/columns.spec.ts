/* eslint-disable @typescript-eslint/no-non-null-assertion */
import columns from 'app/pages/accounts/pages/banks/WithdrawCash/columns'

import { cashWithdrawal } from '__fixtures__/authorizer'

describe('columns', () => {
  describe('amount.render', () => {
    it('formats amount with symbol', () => {
      const match = columns.find(el => el.key === 'amount')!
      const formatter = match.render!

      expect(formatter(123.5678, cashWithdrawal)).toEqual(
        cashWithdrawal.asset.symbol + ' 123.57'
      )
    })
  })
})
