import React from 'react'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'
import { columns } from 'v2/app/pages/authorizer/pages/banks/columns'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { Bank } from 'v2/types/bank'
import { DataroomFeature } from 'v2/types/authorizer'

export const Banks: React.FC = () => (
  <AuthorizerList
    title='Authorize Bank Account(s)'
    uri='/accounts/banks/list'
    name='authorizerBanksList'
    columns={columns}
    renderView={renderBank}
  />
)

export const renderBank = (b: Bank): JSX.Element => {
  return (
    <AuthorizerView
      title='About This Bank'
      data={b}
      feature={DataroomFeature['bank-accounts']}
    >
      <BankPreview data={b} />
    </AuthorizerView>
  )
}
