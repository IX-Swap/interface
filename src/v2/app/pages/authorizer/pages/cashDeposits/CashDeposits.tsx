import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/cashDeposits/columns'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { CashDeposit } from 'v2/types/cashDeposit'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const CashDeposits: React.FC = () => (
  <AuthorizerList
    title='Authorize Cash Deposit(s) '
    uri='/accounts/cash/deposits'
    name='authorizerCashDeposits'
    columns={columns}
    renderView={renderDeposit}
  />
)

export const renderDeposit = (d: CashDeposit): JSX.Element => (
  <AuthorizerView
    title='About This Deposit'
    data={d}
    feature={DataroomFeature['cash-deposits']}
  >
    <DepositView data={d} />
  </AuthorizerView>
)
