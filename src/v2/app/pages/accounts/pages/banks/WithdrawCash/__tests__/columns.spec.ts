import columns from 'v2/app/pages/accounts/pages/banks/WithdrawCash/columns'

import { cashWithdrawal } from '__fixtures__/authorizer'

describe('columns', () => {
  describe('createdAt.render', () => {
    it("formats string date as 'MM/DD/YY'", () => {
      const match = columns.find(el => el.key === 'createdAt')!
      const formatter = match.render!

      expect(formatter('2020-09-10T04:37:56.826Z', cashWithdrawal)).toEqual('09/10/20')
    })
  })

  describe('amount.render', () => {
    it('formats amount with symbol', () => {
      const match = columns.find(el => el.key === 'amount')!
      const formatter = match.render!

      expect(formatter(123.5678, cashWithdrawal)).toEqual('ø 123.57')
    })
  })
})
