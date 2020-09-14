import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/banks/columns'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
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

export const renderBank = (b: Bank): JSX.Element => <BankPreview bank={b} />
