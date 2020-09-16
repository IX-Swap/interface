import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/cashWithdrawals/columns'
import WithdrawalView from 'v2/app/components/WithdrawalPreview'
import { CashWithdrawal } from 'v2/types/cash-withdrawal'

export const CashWithdrawals: React.FC = () => (
  <BaseView
    title='Authorize Cash Withdraw'
    uri='/accounts/cash/withdrawals'
    name='authorizerCashWithdrawals'
    columns={columns}
    renderView={renderWithdrawal}
  />
)

export const renderWithdrawal = (w: CashWithdrawal) => (
  <WithdrawalView withdrawal={w} />
)
