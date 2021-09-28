import React from 'react'
import { AppFeature } from 'types/app'
import { useParams } from 'react-router'
import { useClosure } from 'app/pages/authorizer/hooks/useClosure'
import { DealClosureView } from 'app/pages/authorizer/components/DealClosureView'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'

export const DealClosureAuthorization = () => {
  const { userId, closureId } = useParams<{
    userId: string
    closureId: string
  }>()
  const { data, isLoading } = useClosure(closureId, userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.dso.tokenName}
      data={data}
      feature={AppFeature.DealClosure}
    >
      <DealClosureView data={data} />
    </AuthorizerView>
  )
}
