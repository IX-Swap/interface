import React from 'react'
import { useCommitmentById } from 'app/pages/invest/hooks/useCommitmentById'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { useParams } from 'react-router-dom'

export const InvestCommitmentView = () => {
  const { commitmentId } = useParams<{ commitmentId: string }>()
  console.log(commitmentId)
  const { data, isLoading } = useCommitmentById(commitmentId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <>
      <RejectionMessage data={data} />
      <CommitmentPreview data={data} isUserView />
    </>
  )
}
