import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/cashDeposits/columns'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { CashDeposit } from 'v2/types/cashDeposit'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from '../../../../../types/authorizer'

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
  <AuthorizerView
    title='About This Deposit'
    data={d}
    feature={DataroomFeature.deposits}
  >
    <DepositView data={d} />
  </AuthorizerView>
)
