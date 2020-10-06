/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CashWithdrawals,
  renderWithdrawal
} from 'v2/app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview'
import { cashWithdrawal } from '__fixtures__/authorizer'
import { DataroomFeature } from '../../../../../../types/authorizer'
import { AuthorizerView } from '../../../components/AuthorizerView'

jest.mock('v2/app/components/WithdrawalPreview', () => ({
  WithdrawalPreview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

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
        <AuthorizerView
          title='About This Withdrawal'
          data={cashWithdrawal}
          feature={DataroomFeature.withdrawals}
        >
          <WithdrawalPreview data={cashWithdrawal} />
        </AuthorizerView>
      )
    })
  })
})
