import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { useParams } from 'react-router-dom'
import { AppFeature } from 'types/app'
import { useWithdrawalAddressById } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'
import { WithdrawalAddressPreview } from 'app/components/WithdrawalAddressPreview/WithdrawalAddressPreview'

export const WithdrawalAddressAuthorization = () => {
  const { addressId, userId } = useParams<{
    addressId: string
    userId: string
  }>()
  const { data, isLoading } = useWithdrawalAddressById(addressId, userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.label}
      data={data}
      feature={AppFeature.WithdrawalAddresses}
    >
      <WithdrawalAddressPreview data={data} />
    </AuthorizerView>
  )
}
