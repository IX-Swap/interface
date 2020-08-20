import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/banks/columns'
import BankView from 'v2/app/components/bank-preview'
import { Bank } from 'v2/types/bank'

export const Banks: React.FC = () => (
  <BaseView
    title='Authorize Bank Account(s)'
    uri='/accounts/banks/list'
    name='authorizerBanksList'
    columns={columns}
    renderView={renderBank}
  />
)

export const renderBank = (b: Bank): JSX.Element => <BankView bank={b} />
