import React from 'react'
import BaseView from '../base'
import columns from './data'
import DepositView from '../../../components/deposit-preview'

const CashDeposits = () => {
  return (
    <BaseView
      title='Authorize Cash Deposit(s) '
      uri='/accounts/cash/deposits'
      name='authorizerCashDeposits'
      columns={columns}
      onView={(row) => <DepositView deposit={row} />}
    />
  )
}

export default CashDeposits
