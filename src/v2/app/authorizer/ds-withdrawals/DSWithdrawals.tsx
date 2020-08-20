import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/ds-withdrawals/columns'
import DSWithdrawalView from 'v2/app/components/ds-withdrawal-preview'
import { DSWithdrawal } from 'v2/types/ds-withdrawal'

export const DSWithdrawals: React.FC = () => (
  <BaseView
    title='Authorize Digital Security Withdrawal'
    uri='/accounts/security/withdrawals'
    name='authorizerSecurityWithdrawals'
    columns={columns}
    renderView={renderDSWithdrawal}
  />
)

export const renderDSWithdrawal = (w: DSWithdrawal): JSX.Element => (
  <DSWithdrawalView withdrawal={w} />
)
