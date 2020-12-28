import React from 'react'
import { useCommitmentById } from 'app/pages/invest/hooks/useCommitmentById'
import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'

export const InvestCommitmentView = () => {
  const {
    params: { commitmentId }
  } = useDSORouter()

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
