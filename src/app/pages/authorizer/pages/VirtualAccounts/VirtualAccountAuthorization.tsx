import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { useParams } from 'react-router-dom'
import { AppFeature } from 'types/app'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { VirtualAccountPreview } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccountPreview'
import { useVirtualAccountById } from 'app/pages/authorizer/hooks/useVirtualAccountById'

export const VirtualAccountAuthorization = () => {
  const { id } = useParams<{
    id: string
  }>()
  const { data: virtualAccount, isLoading } = useVirtualAccountById(id ?? '')

  const {
    hasIdentity,
    individualIdentity,
    corporateIdentities,
    isLoadingIdentities
  } = useGetIdentities(undefined, virtualAccount?.user?._id)

  if (isLoading || isLoadingIdentities || virtualAccount === undefined) {
    return null
  }

  const mergedData = {
    ...virtualAccount,
    identity: hasIdentity
      ? {
          individual: individualIdentity as IndividualIdentity,
          corporates: corporateIdentities?.list
        }
      : undefined
  }

  return (
    <AuthorizerView
      title={mergedData.accountNumber}
      data={mergedData}
      feature={AppFeature.VirtualAccounts}
    >
      <VirtualAccountPreview data={mergedData} />
    </AuthorizerView>
  )
}
