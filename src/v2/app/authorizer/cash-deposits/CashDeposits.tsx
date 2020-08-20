import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/cash-deposits/columns'
import DepositView from 'v2/app/components/deposit-preview'
import { CashDeposit } from 'v2/types/cashdeposit'

export const CashDeposits: React.FC = () => (
  <BaseView
    title='Authorize Cash Deposit(s) '
    uri='/accounts/cash/deposits'
    name='authorizerCashDeposits'
    columns={columns}
    renderView={renderDeposit}
  />
)

export const renderDeposit = (d: CashDeposit): JSX.Element => (
  <DepositView deposit={d} />
)
