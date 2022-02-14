import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { useParams } from 'react-router-dom'
import { useCommitmentById } from 'app/pages/invest/hooks/useCommitmentById'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'

export const CommitmentAuthorization = () => {
  const { userId, commitmentId } = useParams<{
    userId: string
    commitmentId: string
  }>()
  const { data, isLoading } = useCommitmentById(commitmentId, userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.dso.tokenName}
      data={data}
      feature={AppFeature.Commitments}
    >
      <CommitmentPreview data={data} />
    </AuthorizerView>
  )
}
