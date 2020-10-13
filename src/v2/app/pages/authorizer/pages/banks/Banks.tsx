import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/banks/columns'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { Bank } from 'v2/types/bank'
import { DataroomFeature } from 'v2/types/authorizer'

export const Banks: React.FC = () => (
  <BaseView
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
      feature={DataroomFeature.banks}
    >
      <BankPreview data={b} />
    </AuthorizerView>
  )
}
