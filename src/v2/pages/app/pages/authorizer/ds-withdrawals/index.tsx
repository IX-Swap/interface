import React from 'react'
import BaseView from '../base'
import columns from './data'
import DSWithdrawalView from '../../../components/ds-withdrawal-preview'

const DSWithdrawals = () => {
  return (
    <BaseView
      title='Authorize Digital Security Withdrawal'
      uri='/accounts/security/withdrawals'
      name='authorizerSecurityWithdrawals'
      columns={columns}
      onView={row => <DSWithdrawalView withdrawal={row} />}
    />
  )
}

export default DSWithdrawals
