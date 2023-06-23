import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { TokenDeploymentView } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentView'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AppFeature } from 'types/app'

export const TokenDeploymentAuthorization = () => {
  const { userId, dsoId } = useParams<{
    userId: string
    dsoId: string
  }>()

  const { data, isLoading } = useDSOById(dsoId, userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.tokenName}
      data={data}
      feature={AppFeature.TokenDeployment}
    >
      <TokenDeploymentView data={data} />
    </AuthorizerView>
  )
}