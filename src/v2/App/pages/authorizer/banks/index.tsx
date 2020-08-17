import React from 'react'
import BaseView from '../base'
import columns from './data'
import BankView from '../../../components/bank-preview'

const Authorizer = () => {
  return (
    <>
      <BaseView
        title='Authorize Bank Account(s)'
        uri='/accounts/banks/list'
        columns={columns}
        name='authorizerBanksList'
        onView={(row) => <BankView bank={row} asset={row.asset} />}
      />
    </>
  )
}

export default Authorizer
