import React from 'react'
import { useCommitmentById } from 'v2/app/pages/invest/hooks/useCommitmentById'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { RejectionMessage } from 'v2/app/pages/authorizer/components/RejectionMessage'

export const InvestCommitmentView = () => {
  const {
    params: { commitmentId }
  } = useOfferingsRouter()

  const { data, isLoading } = useCommitmentById(commitmentId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <>
      <RejectionMessage data={data} />
      <CommitmentPreview data={data} />
    </>
  )
}
