import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBankById } from 'app/pages/accounts/pages/banks/hooks/useBankById'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AppFeature } from 'types/app'

export const BankAuthorization = () => {
  const { bankId, userId } = useParams<{ bankId: string; userId: string }>()
  const { data, isLoading } = useBankById({ bankId, ownerId: userId })

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.bankName}
      data={data}
      feature={AppFeature.BankAccounts}
    >
      <BankPreview data={data} />
    </AuthorizerView>
  )
}
