import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/cashWithdrawals/columns'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const CashWithdrawals: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Withdraw'
    uri='/accounts/cash/withdrawals'
    name='authorizerCashWithdrawals'
    columns={columns}
    renderView={renderWithdrawal}
  />
)

export const renderWithdrawal = (w: CashWithdrawal) => (
  <AuthorizerView
    title='About This Withdrawal'
    data={w}
    feature={DataroomFeature['cash-withdrawals']}
  >
    <WithdrawalPreview data={w} />
  </AuthorizerView>
)
