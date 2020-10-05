import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/dsWithdrawals/columns'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from '../../../../../types/authorizer'
import { DSWithdrawalPreview } from '../../../../components/DSWithdrawalPreview/DSWithdrawalPreview'

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
  <AuthorizerView
    title='About This Withdrawal'
    data={w}
    feature={DataroomFeature.dsWithdrawals}
  >
    <DSWithdrawalPreview data={w} />
  </AuthorizerView>
)
