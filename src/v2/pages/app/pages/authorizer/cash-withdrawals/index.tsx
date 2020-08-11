import React from 'react'
import BaseView from '../base'
import columns from './data'
import WithdrawalView from '../../../components/withdrawal-preview'

const CashWithdrawals = () => {
  return (
    <BaseView
      title='Authorize Cash Withdraw'
      uri='/accounts/cash/withdrawals'
      name='authorizerCashWithdrawals'
      columns={columns}
      onView={row => <WithdrawalView withdrawal={row} />}
    />
  )
}

export default CashWithdrawals
