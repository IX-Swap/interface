import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/dsWithdrawals/columns'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const DSWithdrawals: React.FC = () => (
  <AuthorizerList
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
    feature={DataroomFeature['digital-security-withdrawals']}
  >
    <DSWithdrawalPreview data={w} />
  </AuthorizerView>
)
